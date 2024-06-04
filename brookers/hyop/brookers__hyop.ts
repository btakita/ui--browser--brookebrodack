/// <reference lib="dom" />
import { type brookers_timeline_op_T } from '@btakita/domain--any--brookebrodack/brookers'
import { md_px_num } from '@btakita/ui--server--brookebrodack/css'
import { browser_ctx__ensure } from '@rappstack/domain--browser/ctx'
import {
	calling,
	type circular_memo_T,
	memo_,
	type memo_T,
	nullish__none_,
	rmemo__wait,
	run,
	sig_,
	sleep
} from 'ctx-core/rmemo'
import { wanimato__new, type wanimato_T } from 'ctx-core/web_animation'
import { spinner__attach, spinner__remove } from '../../spinner/index.js'
import { YT_player_, YT_PlayerState__CUED_ } from '../../youtube/index.js'
export async function brookers__hyop(brookers__div:HTMLDivElement) {
	await brookers__div__animate(brookers__div)
	await brookers_timeline__li__init(brookers__div)
}
async function brookers__div__animate(brookers__div:HTMLDivElement) {
	const h1 = brookers__div.querySelector('h1')!
	const h2 = brookers__div.querySelector('h2')!
	const brookers_hero__div = brookers__div.querySelector<HTMLElement>(
		'.brookers_hero__div')!
	const brookers_master__div = brookers__div.querySelector<HTMLElement>(
		'.brookers_master__div')!
	const brookers_img__div = brookers__div.querySelector<HTMLElement>(
		'.brookers_img__div')!
	await ready__waitfor()
	animation__run().catch(err=>console.error(err))
	brookers__div.classList.remove('hidden')
	async function ready__waitfor() {
		while ((innerWidth__is_pending_() || brookers_hero__div__is_pending_())) {
			await sleep(10)
		}
		/**
		 * Chrome seems to have a short period where the outerWidth is 0.
		 * TODO: 2023-11-8: check if this is necessary in the future
		 */
		function innerWidth__is_pending_() {
			return !window.outerWidth
		}
		function brookers_hero__div__is_pending_() {
			return !brookers_hero__div.getBoundingClientRect().width
		}
	}
	async function animation__run() {
		brookers_hero__div.style.transform = 'translateX(calc(50vw - 50%))'
		const brookers_hero__div__width = brookers_hero__div.getBoundingClientRect().width
		const h1__center__factor = brookers_hero__div__width / 2 + 'px - 35%'
		brookers_hero__div.classList.remove('opacity-0')
		const h1__flyin_wanimato$ = h1__flyin_wanimato$_()
		const h1__bounce_wanimato$ = h1__bounce_wanimato$_()
		const h2__flyin_wanimato$ = h2__flyin_wanimato$_()
		const h2__bounce_wanimato$ = h2__bounce_wanimato$_()
		const brookers_img__div__slidein_wanimato$ = brookers_img__div__slidein_wanimato$_()
		const brookers_img__div__slideout_wanimato$ = brookers_img__div__slideout_wanimato$_()
		const brookers_master__div__slide_wanimato$ = brookers_master__div__slide_wanimato$_()
		const brookers_hero__div__slide_wanimato$ = brookers_hero__div__slide_wanimato$_()
		const h1__center_to_left_wanimato$ = h1__center_to_left_wanimato$_()
		if (document.scrollingElement) document.scrollingElement.scrollTop = 0
		document.body.style.overflowY = 'hidden'
		await rmemo__wait(memo_(()=>
			h1__flyin_wanimato$()?.is_finish
				&& h1__bounce_wanimato$()?.is_finish
				&& h1__center_to_left_wanimato$()?.is_finish
				&& h2__flyin_wanimato$()?.is_finish
				&& h2__bounce_wanimato$()?.is_finish
				&& brookers_img__div__slidein_wanimato$()?.is_finish
				&& brookers_img__div__slideout_wanimato$()?.is_finish
				&& brookers_master__div__slide_wanimato$()?.is_finish
				&& brookers_hero__div__slide_wanimato$()?.is_finish),
		finish=>finish,
		20_000)
		document.body.style.overflowY = 'auto'
		function h1__flyin_wanimato$_() {
			return calling(memo_<wanimato_T>(
				$=>{
					h1.classList.remove('opacity-0')
					return wanimato__new($, h1, ()=>h1.animate([
						{ transform: `translate(calc(-25vw + ${h1__center__factor}), -25vh) rotate(-45deg)`, opacity: 0 },
						{ transform: `translate(calc(4px + ${h1__center__factor}), 1px) rotate(10deg)`, opacity: 1 },
						{ transform: `translate(calc(40px + ${h1__center__factor}), 10px) rotate(10deg)`, opacity: 1 },
					], { duration: 400, fill: 'both', easing: 'ease-in' }))
				}))
		}
		function h1__bounce_wanimato$_() {
			return calling(memo_<wanimato_T|undefined>(
				$=>{
					if (!h1__flyin_wanimato$().is_finish) return
					const keyframe_a1 = s180_d12_spring__keyframe_a1_({
						X: 40, Y: 10, O: 10, X_factor: h1__center__factor
					})
					return wanimato__new($, h1, ()=>h1.animate(keyframe_a1, {
						duration: 800,
						easing: 'ease-in',
						fill: 'both'
					}))
				}))
		}
		function h1__center_to_left_wanimato$_() {
			return calling(memo_<wanimato_T|undefined>($=>{
				if (!brookers_img__div__slideout_wanimato$()?.is_finish) return
				return wanimato__new($, h1, ()=>h1.animate([
					{ transform: 'translateX(calc(50vw - 90%))' },
					{ transform: 'translateX(0)' }
				], { duration: 200, fill: 'forwards' }))
			}))
		}
		function h2__flyin_wanimato$_() {
			return calling(memo_<wanimato_T|undefined>(
				$=>{
					if (!h1__flyin_wanimato$().is_finish) return
					h2.classList.remove('opacity-0')
					return wanimato__new($, h2, ()=>h2.animate([
						{ transform: `translate(25vw, -25vh) rotate(45deg)`, opacity: 0 },
						{ transform: `translate(-4px, 1px) rotate(-10deg)`, opacity: 1 },
						{ transform: `translate(-40px, 10px) rotate(-10deg)`, opacity: 1 },
					], { duration: 400, easing: 'ease-in', fill: 'both' }))
				}))
		}
		function h2__bounce_wanimato$_() {
			return calling(memo_<wanimato_T|undefined>(
				$=>{
					if (!h2__flyin_wanimato$()?.is_finish) return
					const keyframe_a1 = s180_d12_spring__keyframe_a1_({
						X: -40, Y: 10, O: -10
					})
					return wanimato__new($, h2, ()=>h2.animate(keyframe_a1, {
						duration: 800,
						easing: 'ease-in',
						fill: 'both'
					}))
				}))
		}
		function brookers_img__div__slidein_wanimato$_() {
			return calling(memo_<wanimato_T&{ forwards__transform:string }|undefined>($=>{
				if (!h2__bounce_wanimato$()?.is_finish) return
				brookers_img__div.classList.remove('opacity-0')
				const forwards__transform = `translateX(${innerWidth > md_px_num ? '25vw' : '0'})`
				return {
					...wanimato__new($, brookers_img__div, ()=>brookers_img__div.animate([
						{
							transform: 'translateX(-100vw)',
							opacity: 0
						},
						{
							transform: forwards__transform,
							opacity: 1
						}
					], { duration: 200, fill: 'forwards' })),
					forwards__transform
				}
			}))
		}
		function brookers_img__div__slideout_wanimato$_() {
			return calling(memo_<wanimato_T|undefined>($=>{
				if (!brookers_img__div__slidein_wanimato$()?.is_finish) return
				const val = wanimato__new($, brookers_img__div, ()=>brookers_img__div.animate([
					{ transform: brookers_img__div__slidein_wanimato$()!.forwards__transform },
					{ transform: 'translateX(-100vw)' }
				], {
					delay: 2000,
					duration: 400,
					fill: 'forwards'
				}))
				val.animation.addEventListener('finish', ()=>{
					brookers_img__div.remove()
				})
				return val
			}))
		}
		function brookers_master__div__slide_wanimato$_() {
			return calling(memo_<wanimato_T|undefined>($=>{
				if (!brookers_img__div__slideout_wanimato$()?.is_finish) return
				brookers_master__div.classList.remove('opacity-0')
				return wanimato__new($, brookers_master__div, ()=>brookers_master__div.animate([
					{
						transform: `translateX(100vw)`
					},
					{
						transform: 'translateX(0)'
					}
				], {
					duration: 200,
					fill: 'both'
				}))
			}))
		}
		function brookers_hero__div__slide_wanimato$_() {
			return calling(memo_<wanimato_T|undefined>($=>{
				if (!brookers_img__div__slideout_wanimato$()?.is_finish) return
				return wanimato__new($, brookers_hero__div, ()=>brookers_hero__div.animate([
					{ transform: 'translateX(calc(50vw - 50%))' },
					{ transform: 'translateX(32px)' }
				], { duration: 200, fill: 'forwards' }))
			}))
		}
	}
}
async function brookers_timeline__li__init(brookers__div:HTMLDivElement) {
	const browser_ctx = browser_ctx__ensure()
	const brookers_detail__div =
		brookers__div.querySelector<HTMLDivElement&{ op__go$:circular_memo_T }>(
			'.brookers_detail__div')!
	const brookers_timeline__li_a =
		Array.from(brookers__div.querySelectorAll<brookers_timeline__li_T>(
			'.brookers_timeline__li'))
	const html_op__div = brookers_detail__div.querySelector('#html_op__div')!
	const brookers__timeline_op$ = sig_<brookers_timeline_op_T|undefined>(undefined)
	const op_title__div = brookers_detail__div.querySelector<HTMLDivElement>('#op_title__div')!
	const op_close__div = brookers_detail__div.querySelector('#op_close__div')!
	op_close__div.addEventListener('click', ()=>{
		brookers__timeline_op$.set(undefined)
	})
	op__init()
	function op__init() {
		brookers_detail__div.op__go$ = run(
			memo_<circular_memo_T, {
				brookers__timeline_op:brookers_timeline_op_T|undefined
			}>(op__go$=>{
				nullish__none_([YT_player_(browser_ctx)], YT_player=>{
					const brookers__timeline_op = brookers__timeline_op$()
					switch (brookers__timeline_op?.type) {
						case 'html':
							op_title__div.innerText = brookers__timeline_op.title
							brookers_detail__div.classList.remove('hidden')
							if (brookers__timeline_op !== op__go$.brookers__timeline_op) {
								YT_player.stopVideo()
								YT_player.getIframe().classList.add('hidden')
								html_op__div.innerHTML = brookers__timeline_op.html
								html_op__div.classList.remove('hidden')
								const iframe =
									html_op__div.querySelector<HTMLIFrameElement>('iframe')
								if (iframe) {
									spinner__attach(brookers_detail__div)
									iframe.addEventListener('load', ()=>spinner__remove(brookers_detail__div))
								}
							}
							break
						case 'youtube':
							op_title__div.innerText = brookers__timeline_op.title
							brookers_detail__div.classList.remove('hidden')
							html_op__div.classList.add('hidden')
							if (brookers__timeline_op !== op__go$.brookers__timeline_op) {
								html_op__div.innerHTML = ''
								YT_player.stopVideo()
								YT_player.getIframe().classList.remove('hidden')
								YT_player.loadVideoById({
									videoId: brookers__timeline_op.videoId
								})
								YT_player.playVideo()
							}
							if (YT_PlayerState__CUED_(browser_ctx)) {
								spinner__attach(brookers_detail__div)
							} else {
								spinner__remove(brookers_detail__div)
							}
							break
						default:
							html_op__div.innerHTML = ''
							YT_player.stopVideo()
							html_op__div.classList.remove('hidden')
							YT_player.getIframe().classList.remove('hidden')
							brookers_detail__div.classList.add('hidden')
					}
					op__go$.brookers__timeline_op = brookers__timeline_op
				})
				return op__go$
			}))
		for (const brookers_timeline__li of brookers_timeline__li_a) {
			brookers_timeline__li.op = JSON.parse(
				decodeURIComponent(brookers_timeline__li.dataset.op ?? '{}')
			) as brookers_timeline_op_T
			brookers_timeline__li.selected__watch$ = calling(memo_(()=>{
				brookers_timeline__li.classList.toggle(
					'selected',
					brookers__timeline_op$() === brookers_timeline__li.op)
			}))
			brookers_timeline__li.addEventListener('click', async ()=>{
				brookers__timeline_op$.set(brookers_timeline__li.op)
			})
			for (const a of Array.from(brookers_timeline__li.querySelectorAll<HTMLAnchorElement>('a'))) {
				a.addEventListener('click', evt=>evt.stopPropagation())
			}
		}
	}
}
// f(0) = 0; f'(0) = 0; f''(t) = -180(f(t) - 1) - 12f'(t)
// https://www.wolframalpha.com/input?i=f%280%29+%3D+0%3B+f%27%280%29+%3D+0%3B+f%27%27%28t%29+%3D+-180%28f%28t%29+-+1%29+-+12f%27%28t%29
// f(t) = -1/2 e^(-6 t) (-2 e^(6 t) + sin(12 t) + 2 cos(12 t))
function s180_d12_spring__keyframe_a1_(config:{
	X:number, Y:number, O:number, X_factor?:string
}) {
	const { X, Y, O, X_factor } = config
	const keyframe_a1:Keyframe[] = []
	keyframe_a1.push({
		transform: `translate(calc(${X}px${X_factor ? ` + ${X_factor}` : ''}), ${Y}px) rotate(${O}deg)`
	})
	for (let T = 1; T < 100; T++) {
		const t = T / 100
		const c = -.5 * Math.exp(-6 * t) * (-2 * Math.exp(6 * t) + Math.sin(12 * t) + 2 * Math.cos(12 * t))
		keyframe_a1.push({
			transform: `translate(calc(${X - c * X}px${X_factor ? ` + ${X_factor}` : ''}), ${Y - c * Y}px) rotate(${O - c * O}deg)`
		})
	}
	keyframe_a1.push({
		transform: `translate(calc(${X_factor ?? '0px'}), 0) rotate(0deg)`
	})
	return keyframe_a1
}
type brookers_timeline__li_T = HTMLOListElement&{
	op:brookers_timeline_op_T
	selected__watch$:memo_T<void>
}
