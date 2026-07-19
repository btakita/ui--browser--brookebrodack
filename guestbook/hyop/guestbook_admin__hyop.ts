/// <reference lib="dom" />
type status_T = 'pending'|'approved'|'rejected'
type admin_entry_T = {
	id:number
	name:string
	message:string
	created_at:string
	status:status_T
	moderated_at:string|null
	moderation_reason:string|null
}
type queue_T = {
	status:status_T
	counts:Record<status_T, number>
	entries:admin_entry_T[]
}
const api = '/guestbook/api/admin'
const status_a1:status_T[] = ['pending', 'approved', 'rejected']
const status__label:Record<status_T, string> = {
	pending: 'Pending',
	approved: 'Approved',
	rejected: 'Rejected',
}
/**
 * Hydrates the guestbook moderation dashboard.
 *
 * Authorization lives entirely in the admin API — hiding the queue here is a
 * UI affordance, not a security boundary, so every action re-checks against a
 * 401 and drops back to the sign-in form.
 */
export async function guestbook_admin__hyop(admin__section:HTMLElement) {
	const signin__form = admin__section.querySelector<HTMLFormElement>(
		'#guestbook_admin__signin')!
	const signin_error__p = admin__section.querySelector<HTMLParagraphElement>(
		'#guestbook_admin__signin_error')!
	const queue__div = admin__section.querySelector<HTMLDivElement>(
		'#guestbook_admin__queue')!
	const tabs__div = admin__section.querySelector<HTMLDivElement>(
		'#guestbook_admin__tabs')!
	const entries__div = admin__section.querySelector<HTMLDivElement>(
		'#guestbook_admin__entries')!
	const signout__button = admin__section.querySelector<HTMLButtonElement>(
		'#guestbook_admin__signout')!
	let status:status_T = 'pending'
	signin__form.addEventListener('submit', evt=>{
		evt.preventDefault()
		signin().catch(err=>console.error(err))
	})
	signout__button.addEventListener('click', ()=>{
		signout().catch(err=>console.error(err))
	})
	await session__check()
	async function session__check() {
		try {
			const res = await fetch(`${api}/session`)
			const body = await res.json() as { signed_in?:boolean, error?:string }
			if (res.ok && body.signed_in) return queue__show()
			if (!res.ok && res.status !== 401) return signin__show(body.error ?? null)
		} catch (err) {
			console.error(err)
		}
		signin__show(null)
	}
	function signin__show(error:string|null) {
		queue__div.classList.add('hidden')
		signin__form.classList.remove('hidden')
		if (error) error__set(error)
		else error__clear()
	}
	async function queue__show() {
		signin__form.classList.add('hidden')
		queue__div.classList.remove('hidden')
		await queue__load()
	}
	async function signin() {
		const password = signin__form.querySelector<HTMLInputElement>('#guestbook_admin__password')!
		const button = signin__form.querySelector<HTMLButtonElement>('button[type=submit]')!
		error__clear()
		button.disabled = true
		try {
			const res = await fetch(`${api}/session`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password: password.value }),
			})
			const body = await res.json() as { error?:string }
			if (!res.ok) return error__set(body.error ?? 'Could not sign in.')
			password.value = ''
			await queue__show()
		} catch (err) {
			console.error(err)
			error__set('Network error. Please try again.')
		} finally {
			button.disabled = false
		}
	}
	async function signout() {
		try {
			await fetch(`${api}/session`, { method: 'DELETE' })
		} catch (err) {
			console.error(err)
		}
		entries__div.replaceChildren()
		tabs__div.replaceChildren()
		signin__show(null)
	}
	async function queue__load() {
		status__set('Loading…')
		try {
			const res = await fetch(`${api}/entries?status=${encodeURIComponent(status)}`)
			if (res.status === 401) return signin__show('Your session expired. Please sign in again.')
			if (!res.ok) throw new Error(`queue load failed: ${res.status}`)
			queue__render(await res.json() as queue_T)
		} catch (err) {
			console.error(err)
			status__set('The moderation queue could not be loaded.')
		}
	}
	async function entry__moderate(entry:admin_entry_T, next:status_T) {
		try {
			const res = await fetch(`${api}/entries/${entry.id}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ status: next }),
			})
			if (res.status === 401) return signin__show('Your session expired. Please sign in again.')
			if (!res.ok) {
				const body = await res.json() as { error?:string }
				alert(body.error ?? 'Could not update that message.')
				return
			}
			await queue__load()
		} catch (err) {
			console.error(err)
			alert('Network error. Please try again.')
		}
	}
	function queue__render(queue:queue_T) {
		tabs__div.replaceChildren(...status_a1.map(s=>tab__button_(s, queue.counts[s] ?? 0)))
		if (!queue.entries.length) {
			status__set(
				status === 'pending'
					? 'Nothing waiting for review.'
					: `No ${status__label[status].toLowerCase()} messages.`)
			return
		}
		entries__div.replaceChildren(...queue.entries.map(entry__article_))
	}
	function tab__button_(s:status_T, count:number) {
		const button = document.createElement('button')
		button.type = 'button'
		button.textContent = `${status__label[s]} (${count})`
		button.className = [
			'min-h-8 py-1 px-4 rounded-md font-bold transition-all hover:scale-105',
			s === status ? 'bg-gray-900 text-white' : 'bg-white/70 text-gray-900',
		].join(' ')
		button.addEventListener('click', ()=>{
			if (s === status) return
			status = s
			queue__load().catch(err=>console.error(err))
		})
		return button
	}
	/**
	 * Built with DOM APIs and `textContent` — guestbook text is unmoderated by
	 * definition on this screen, so it must never be interpreted as markup.
	 */
	function entry__article_(entry:admin_entry_T) {
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
		if (!isNaN(created_at.valueOf())) {
			time.dateTime = created_at.toISOString()
			time.textContent = created_at.toLocaleString()
		}
		header.append(name, time)
		const message = document.createElement('p')
		message.className = 'mt-2 whitespace-pre-wrap break-words text-gray-800'
		message.textContent = entry.message
		article.append(header, message)
		if (entry.moderation_reason) {
			const reason = document.createElement('p')
			reason.className = 'mt-2 text-sm text-gray-600 italic'
			reason.textContent = entry.moderation_reason
			article.append(reason)
		}
		const actions = document.createElement('div')
		actions.className = 'mt-3 flex flex-wrap gap-2'
		for (const next of status_a1) {
			if (next === entry.status) continue
			actions.append(action__button_(entry, next))
		}
		article.append(actions)
		return article
	}
	function action__button_(entry:admin_entry_T, next:status_T) {
		const button = document.createElement('button')
		button.type = 'button'
		button.textContent =
			next === 'approved'
				? 'Approve'
				: next === 'rejected'
					? 'Reject'
					: 'Back to pending'
		button.className = [
			'min-h-8 py-1 px-4 rounded-md font-bold transition-all hover:scale-105',
			next === 'approved'
				? 'bg-gray-900 text-white'
				: 'bg-white/70 text-gray-900',
		].join(' ')
		button.addEventListener('click', ()=>{
			button.disabled = true
			entry__moderate(entry, next).catch(err=>console.error(err))
		})
		return button
	}
	function status__set(text:string) {
		const p = document.createElement('p')
		p.className = 'py-12 text-center text-gray-800'
		p.textContent = text
		entries__div.replaceChildren(p)
	}
	function error__set(text:string) {
		signin_error__p.textContent = text
		signin_error__p.classList.remove('hidden')
	}
	function error__clear() {
		signin_error__p.textContent = ''
		signin_error__p.classList.add('hidden')
	}
}
