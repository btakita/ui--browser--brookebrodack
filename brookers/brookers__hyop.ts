/// <reference lib="dom" />
import { type brookers_timeline_op_T } from '@btakita/domain--any--brookebrodack/brookers'
import { md_px_num } from '@btakita/ui--server--brookebrodack/css'
import { browser_ctx__ensure } from '@rappstack/domain--browser/ctx'
import { calling, type circular_memo_T, memo_, nullish__none_, rmemo__wait, run, sig_, sleep } from 'ctx-core/rmemo'
import { type animate_o_T } from '../animation/index.js'
import { spinner__attach, spinner__remove } from '../spinner/index.js'
import { YT_player_, YT_PlayerState_, YT_PlayerState__CUED_ } from '../youtube/index.js'
export async function brookers__hyop(brookers__div:HTMLDivElement) {
	await brookers__div__animate(brookers__div)
	await brookers_timeline__li__init(brookers__div)
}
async function brookers__div__animate(brookers__div:HTMLDivElement) {
	const h1 = brookers__div.querySelector('h1')!
	const h2 = brookers__div.querySelector('h2')!
	const brookers_hero__div =
		brookers__div.querySelector('.brookers_hero__div') as HTMLElement
	const brookers_master__div =
		brookers__div.querySelector('.brookers_master__div') as HTMLElement
	const brookers_img__div =
		brookers__div.querySelector('.brookers_img__div') as HTMLElement
	await ready__waitfor()
	animation__run()
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
	function animation__run() {
		brookers_hero__div.style.transform = 'translateX(calc(50vw - 50%))'
		const brookers_hero__div__width = brookers_hero__div.getBoundingClientRect().width
		const h1__center__factor = brookers_hero__div__width / 2 + 'px - 35%'
		brookers_hero__div.classList.remove('opacity-0')
		const h1__flyin_animation_o$ = h1__flyin_animation_o$_()
		const h1__bounce_animation_o$ = h1__bounce_animation_o$_()
		const h2__flyin_animation_o$ = h2__flyin_animation_o$_()
		const h2__bounce_animation_o$ = h2__bounce_animation_o$_()
		const brookers_img__div__slidein_animation_o$ = brookers_img__div__slidein_animation_o$_()
		const brookers_img__div__slideout_animation_o$ = brookers_img__div__slideout_animation_o$_()
		const brookers_master__div__slide_animation_o$ = brookers_master__div__slide_animation_o$_()
		const brookers_hero__div__slide_animation_o$ = brookers_hero__div__slide_animation_o$_()
		const h1__center_to_left_animation_o$ = h1__center_to_left_animation_o$_()
		return rmemo__wait(memo_(()=>
			h1__flyin_animation_o$()?.done
				&& h1__bounce_animation_o$()?.done
				&& h1__center_to_left_animation_o$()?.done
				&& h2__flyin_animation_o$()?.done
				&& h2__bounce_animation_o$()?.done
				&& brookers_img__div__slidein_animation_o$()?.done
				&& brookers_img__div__slideout_animation_o$()?.done
				&& brookers_master__div__slide_animation_o$()?.done
				&& brookers_hero__div__slide_animation_o$()?.done),
		finish=>finish,
		20_000)
		function h1__flyin_animation_o$_() {
			return calling(memo_<animate_o_T>(
				$=>{
					h1.classList.remove('opacity-0')
					const animation = h1.animate([
						{ transform: `translate(calc(-25vw + ${h1__center__factor}), -25vh) rotate(-45deg)`, opacity: 0 },
						{ transform: `translate(calc(4px + ${h1__center__factor}), 1px) rotate(10deg)`, opacity: 1 },
						{ transform: `translate(calc(40px + ${h1__center__factor}), 10px) rotate(10deg)`, opacity: 1 },
					], { duration: 400, fill: 'both', easing: 'ease-in' })
					animation.addEventListener('finish', ()=>{
						$._ = { ...$(), done: true }
					})
					return { animation, done: false }
				}))
		}
		function h1__bounce_animation_o$_() {
			return calling(memo_<animate_o_T|undefined>(
				$=>{
					if (!h1__flyin_animation_o$().done) return
					const keyframe_a1 = s180_d12_spring__keyframe_a1_({
						X: 40, Y: 10, O: 10, X_factor: h1__center__factor
					})
					const val = {
						animation: h1.animate(keyframe_a1, {
							duration: 800,
							easing: 'ease-in',
							fill: 'both'
						}),
						done: false
					}
					val.animation.addEventListener('finish', ()=>{
						$._ = {
							...$()!,
							done: true
						}
					})
					return val
				}))
		}
		function h1__center_to_left_animation_o$_() {
			return calling(memo_<animate_o_T|undefined>($=>{
				if (!brookers_img__div__slideout_animation_o$()?.done) return
				const val = {
					animation: h1.animate([
						{
							transform: 'translateX(50vw - 90%)'
						},
						{
							transform: 'translateX(0)'
						}
					], { duration: 200, fill: 'forwards' }),
					done: false
				}
				val.animation.addEventListener('finish', ()=>{
					$._ = {
						...$()!,
						done: true
					}
				})
				return val
			}))
		}
		function h2__flyin_animation_o$_() {
			return calling(memo_<animate_o_T|undefined>(
				$=>{
					if (!h1__flyin_animation_o$().done) return
					h2.classList.remove('opacity-0')
					const val = {
						animation: h2.animate([
							{ transform: `translate(25vw, -25vh) rotate(45deg)`, opacity: 0 },
							{ transform: `translate(-4px, 1px) rotate(-10deg)`, opacity: 1 },
							{ transform: `translate(-40px, 10px) rotate(-10deg)`, opacity: 1 },
						], { duration: 400, easing: 'ease-in', fill: 'both' }),
						done: false
					}
					val.animation.addEventListener('finish', ()=>{
						$._ = {
							...$()!,
							done: true
						}
					})
					return val
				}))
		}
		function h2__bounce_animation_o$_() {
			return calling(memo_<animate_o_T|undefined>(
				$=>{
					if (!h2__flyin_animation_o$()?.done) return
					const keyframe_a1 = s180_d12_spring__keyframe_a1_({
						X: -40, Y: 10, O: -10
					})
					const val = {
						animation: h2.animate(keyframe_a1, {
							duration: 800,
							easing: 'ease-in',
							fill: 'both'
						}),
						done: false
					}
					val.animation.addEventListener('finish', ()=>{
						$._ = {
							...$()!,
							done: true
						}
					})
					return val
				}))
		}
		function brookers_img__div__slidein_animation_o$_() {
			return calling(memo_<animate_o_T&{ forwards__transform:string }|undefined>($=>{
				if (!h2__bounce_animation_o$()?.done) return
				brookers_img__div.classList.remove('opacity-0')
				const forwards__transform = `translateX(${innerWidth > md_px_num ? '25vw' : '0'})`
				const val = {
					animation: brookers_img__div.animate([
						{
							transform: 'translateX(-100vw)',
							opacity: 0
						},
						{
							transform: forwards__transform,
							opacity: 1
						}
					], { duration: 200, fill: 'forwards' }),
					done: false,
					forwards__transform
				}
				val.animation.addEventListener('finish', ()=>{
					$._ = {
						...$()!,
						done: true
					}
				})
				return val
			}))
		}
		function brookers_img__div__slideout_animation_o$_() {
			return calling(memo_<animate_o_T|undefined>($=>{
				if (!brookers_img__div__slidein_animation_o$()?.done) return
				const val = {
					animation: brookers_img__div.animate([
						{
							transform: brookers_img__div__slidein_animation_o$()!.forwards__transform
						},
						{
							transform: 'translateX(-100vw)'
						}
					], {
						delay: 2000,
						duration: 400,
						fill: 'forwards'
					}),
					done: false
				}
				val.animation.addEventListener('finish', ()=>{
					brookers_img__div.remove()
					$._ = {
						...$()!,
						done: true
					}
				})
				return val
			}))
		}
		function brookers_master__div__slide_animation_o$_() {
			return calling(memo_<animate_o_T|undefined>($=>{
				if (!brookers_img__div__slideout_animation_o$()?.done) return
				brookers_master__div.classList.remove('opacity-0')
				const val = {
					animation: brookers_master__div.animate([
						{
							transform: `translateX(100vw)`
						},
						{
							transform: 'translateX(0)'
						}
					], {
						duration: 200,
						fill: 'both'
					}),
					done: false
				}
				val.animation.addEventListener('finish', ()=>{
					$._ = {
						...$()!,
						done: true
					}
				})
				return val
			}))
		}
		function brookers_hero__div__slide_animation_o$_() {
			return calling(memo_<animate_o_T|undefined>($=>{
				if (!brookers_img__div__slideout_animation_o$()?.done) return
				const val = {
					animation: brookers_hero__div.animate([
						{
							transform: 'translateX(calc(50vw - 50%))',
						},
						{
							transform: 'translateX(32px)',
						}
					], { duration: 200, fill: 'forwards' }),
					done: false
				}
				val.animation.addEventListener('finish', ()=>{
					$._ = {
						...$()!,
						done: true
					}
				})
				return val
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
		Array.from(brookers__div.querySelectorAll<HTMLOListElement>(
			'.brookers_timeline__li'))
	const html_op__div = brookers_detail__div.querySelector('#html_op__div')!
	const brookers__timeline_op$ = sig_<brookers_timeline_op_T|undefined>(undefined)
	const op_title__div = brookers_detail__div.querySelector<HTMLDivElement>('#op_title__div')!
	const op_close__div = brookers_detail__div.querySelector('#op_close__div')!
	op_close__div.addEventListener('click', ()=>{
		brookers__timeline_op$._ = undefined
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
							html_op__div.classList.remove('hidden')
							YT_player.getIframe().classList.remove('hidden')
							brookers_detail__div.classList.add('hidden')
					}
					op__go$.brookers__timeline_op = brookers__timeline_op
				})
				return op__go$
			}))
		for (const brookers_timeline__li of brookers_timeline__li_a) {
			brookers_timeline__li.addEventListener('click', async ()=>{
				brookers__timeline_op$._ = JSON.parse(
					decodeURIComponent(brookers_timeline__li.dataset.op ?? '{}')
				) as brookers_timeline_op_T
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
