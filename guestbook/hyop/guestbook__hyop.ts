/// <reference lib="dom" />
import {
	type guestbook_entry_T,
	guestbook_entry_a1__url,
	guestbook_entry__validate
} from '@btakita/domain--any--brookebrodack/guestbook'
import { createContext } from '@lazily-hub/lazily-js/reactive'
/** What the entry list is currently showing. */
type entry_view_T =
	| { kind:'loading' }
	| { kind:'error' }
	| { kind:'ready', entry_a1:guestbook_entry_T[] }
/** The line under the form. One element, three meanings. */
type notice_T =
	| { kind:'none' }
	| { kind:'error', text:string }
	| { kind:'info', text:string }
/**
 * Hydrates the guestbook section: loads entries from the guestbook API and
 * wires the sign form.
 *
 * State lives in Lazily cells and the DOM is derived from them by effects, so
 * there is exactly one source of truth per piece of UI. Event handlers only
 * move state; nothing but an effect touches the DOM. That removes the class of
 * bug where two code paths disagree about what is on screen — the reason the
 * old `status__set` / `form_error__set` / `form_notice__set` trio existed and
 * had to be kept in sync by hand.
 *
 * The page is statically exported, so every entry rendered here arrives at
 * runtime — the server-rendered markup only ships the form and a status line.
 */
export async function guestbook__hyop(guestbook__section:HTMLElement) {
	const entries__div = guestbook__section.querySelector<HTMLDivElement>(
		'#guestbook__entries')!
	const form = guestbook__section.querySelector<HTMLFormElement>(
		'#guestbook__form')!
	const form_error__p = guestbook__section.querySelector<HTMLParagraphElement>(
		'#guestbook__form_error')!
	const button = form.querySelector<HTMLButtonElement>('button[type=submit]')!
	const ctx = createContext()
	const entry_view = ctx.cell<entry_view_T>({ kind: 'loading' })
	const notice = ctx.cell<notice_T>({ kind: 'none' })
	const submitting = ctx.cell(false)
	// --- derived DOM -------------------------------------------------------
	// Each effect owns one region and re-runs only when the cell it reads
	// changes. Lazily skips a set that does not change the value, so a repeated
	// state assignment costs no DOM work.
	//
	// The explicit `return undefined` is lazily-js's `EffectRun` contract:
	// `() => (() => void) | null | undefined`. A block-bodied arrow infers
	// `void`, which TypeScript will not assign to `undefined`, so an effect
	// with no cleanup has to say so.
	ctx.effect(()=>{
		const view = ctx.getCell(entry_view)
		entries__div.replaceChildren(...
		view.kind === 'loading'
			? [status__p_('Loading the guestbook…')]
			: view.kind === 'error'
				? [status__p_(
					'The guestbook could not be loaded. Please try again later.')]
				: view.entry_a1.length
					? view.entry_a1.map(entry__article_)
					: [status__p_('Be the first to sign the guestbook.')])
		return undefined
	})
	ctx.effect(()=>{
		const current = ctx.getCell(notice)
		form_error__p.textContent = current.kind === 'none' ? '' : current.text
		form_error__p.classList.toggle('hidden', current.kind === 'none')
		form_error__p.classList.toggle('text-red-700', current.kind === 'error')
		form_error__p.classList.toggle('text-gray-700', current.kind === 'info')
		return undefined
	})
	ctx.effect(()=>{
		button.disabled = ctx.getCell(submitting)
		return undefined
	})
	// --- events ------------------------------------------------------------
	form.addEventListener('submit', evt=>{
		evt.preventDefault()
		form__submit().catch(err=>console.error(err))
	})
	await entry_a1__load()
	async function entry_a1__load() {
		try {
			const res = await fetch(guestbook_entry_a1__url)
			if (!res.ok) throw new Error(`guestbook load failed: ${res.status}`)
			ctx.setCell(entry_view, {
				kind: 'ready',
				entry_a1: await res.json() as guestbook_entry_T[],
			})
		} catch (err) {
			console.error(err)
			ctx.setCell(entry_view, { kind: 'error' })
		}
	}
	async function form__submit() {
		const data = new FormData(form)
		const entry = {
			name: String(data.get('name') ?? ''),
			message: String(data.get('message') ?? ''),
		}
		const invalid = guestbook_entry__validate(entry)
		if (invalid) return ctx.setCell(notice, { kind: 'error', text: invalid })
		// One batch so the form cannot paint an intermediate state where the old
		// error is still showing while the button has already gone disabled.
		ctx.batch(()=>{
			ctx.setCell(notice, { kind: 'none' })
			ctx.setCell(submitting, true)
		})
		try {
			const res = await fetch(guestbook_entry_a1__url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(entry),
			})
			if (!res.ok) {
				ctx.setCell(notice, {
					kind: 'error',
					text: await res.text()
						|| 'Your message could not be posted. Please try again.',
				})
				return
			}
			form.reset()
			// The API judges the entry inline, so it reports whether the message
			// went live or is waiting for review. Without this a held message just
			// disappears — the form clears and the list looks unchanged.
			const body = await res.json().catch(()=>null) as { message?:string }|null
			ctx.setCell(notice, {
				kind: 'info',
				text: body?.message
					?? 'Thank you! Your message will appear once it has been reviewed.',
			})
			await entry_a1__load()
		} catch (err) {
			console.error(err)
			ctx.setCell(notice, { kind: 'error', text: 'Network error. Please try again.' })
		} finally {
			ctx.setCell(submitting, false)
		}
	}
	function status__p_(text:string) {
		const p = document.createElement('p')
		p.className = 'py-12 text-center text-gray-800'
		p.textContent = text
		return p
	}
	/**
	 * Built with DOM APIs and `textContent` rather than an HTML string so
	 * guestbook text can never be interpreted as markup.
	 */
	function entry__article_(entry:guestbook_entry_T) {
		const article = document.createElement('article')
		article.className =
			'w-full max-w-3xl mb-3 py-4 px-4 rounded-md bg-[rgba(243,244,246,0.6)]'
		const header = document.createElement('div')
		header.className = 'flex justify-between items-baseline gap-3'
		const name = document.createElement('h2')
		name.className = 'font-bold text-gray-900'
		name.textContent = entry.name
		const time = document.createElement('time')
		time.className = 'text-sm text-gray-600 whitespace-nowrap'
		const created_at = new Date(entry.created_at)
		const created_at__is_valid = !isNaN(created_at.valueOf())
		if (created_at__is_valid) {
			time.dateTime = created_at.toISOString()
			time.textContent = created_at.toLocaleDateString(undefined, {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
			})
		}
		header.append(name, time)
		const message = document.createElement('p')
		message.className = 'mt-2 whitespace-pre-wrap break-words text-gray-800'
		message.textContent = entry.message
		article.append(header, message)
		return article
	}
}
