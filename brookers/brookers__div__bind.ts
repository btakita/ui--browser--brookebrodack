/// <reference lib="dom" />
import { type brookers__timeline_op_T } from '@btakita/domain--any--brookebrodack'
import { browser_ctx, YT$_, type YT_Player, type YT_PlayerState_val_T } from '@btakita/domain--browser--brookebrodack'
import {
	calling,
	type circular_memo_T,
	memo_,
	nullish__none_,
	rmemo__unset,
	rmemo__wait,
	run,
	sig_,
	sleep,
	tup
} from 'ctx-core/rmemo'
export async function brookers__div__bind(brookers__div:HTMLDivElement) {
	await brookers__div__animate(brookers__div)
	await brookers_timeline__li__init(brookers__div)
}
async function brookers_timeline__li__init(brookers__div:HTMLDivElement) {
	const spinner_template = brookers__div.querySelector<HTMLTemplateElement>('#spinner_template')!
	const brookers_detail__div =
		brookers__div.querySelector<HTMLDivElement&{ op__go$:circular_memo_T }>(
			'.brookers_detail__div')!
	const brookers_timeline__li_a =
		Array.from(brookers__div.querySelectorAll<HTMLOListElement>(
			'.brookers_timeline__li'))
	const html_op__div = brookers_detail__div.querySelector('#html_op__div')!
	const brookers__timeline_op$ = sig_<brookers__timeline_op_T|undefined>(undefined)
	const YT_player_state$ = sig_<YT_PlayerState_val_T|undefined>(undefined)
	const YT_player$ = YT_player$_()
	const op_title__div = brookers_detail__div.querySelector<HTMLDivElement>('#op_title__div')!
	const html_op_close__div = brookers_detail__div.querySelector('#html_op_close__div')!
	html_op_close__div.addEventListener('click', ()=>{
		brookers__timeline_op$._ = undefined
	})
	op__init()
	function YT_player$_() {
		return memo_<YT_Player|undefined>(
			YT_player$=>{
				init()
				return YT_player$.val
				function init() {
					rmemo__wait(YT$_(browser_ctx), YT=>YT, 10_000).then(YT=>{
						const YT_iframe__div =
							brookers_detail__div.querySelector('#YT_iframe__div')!
						const _YT_player = new YT!.Player(YT_iframe__div, {
							height: YT_player__height_(),
							playerVars: {
								origin: window.location.hostname,
								autoplay: 0,
								rel: 0,
							},
							events: {
								onReady(evt) {
									YT_player$._ = evt.target
								},
								onError() {
									rmemo__unset(YT_player$)
								},
								onStateChange(evt) {
									YT_player_state$._ = evt.data
								},
							}
						})
						YT_iframe__div.addEventListener('resize', ()=>{
							_YT_player.setSize('100%', YT_player__height_())
						})
						function YT_player__height_() {
							return YT_iframe__div.clientWidth * 16 / 9
						}
					}).catch(err=>{
						console.error(err)
						rmemo__unset(YT_player$)
					})
				}
			})
	}
	function op__init() {
		brookers_detail__div.op__go$ = run(
			memo_<circular_memo_T, {
				brookers__timeline_op:brookers__timeline_op_T|undefined
			}>(op__go$=>{
				nullish__none_(tup(YT_player$()), (
					YT_player,
				)=>{
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
									spinner__attach()
									iframe.addEventListener('load', ()=>spinner__remove())
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
							if (YT_player_state$() === window.YT.PlayerState.CUED) {
								spinner__attach()
							}
							else {
								spinner__remove()
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
				) as brookers__timeline_op_T
			})
			for (const a of Array.from(brookers_timeline__li.querySelectorAll<HTMLAnchorElement>('a'))) {
				a.addEventListener('click', evt=>evt.stopPropagation())
			}
		}
	}
	function spinner__attach() {
		if (!brookers_detail__div.querySelector('.spinner')) {
			brookers_detail__div.appendChild(
				spinner_template.content.cloneNode(true))
		}
	}
	function spinner__remove() {
		const spinner = brookers_detail__div.querySelector('.spinner')
		spinner?.remove?.()
	}
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
		while ((innerWidth__is_pending() || brookers_hero__div__is_pending_())) {
			await sleep(10)
		}
		/**
		 * Chrome seems to have a short period where the outerWidth is 0.
		 * TODO: 2023-11-8: check if this is necessary in the future
		 */
		function innerWidth__is_pending() {
			return !window.outerWidth
		}
		function brookers_hero__div__is_pending_() {
			return !brookers_hero__div.getBoundingClientRect().width
		}
	}
	function animation__run() {
		brookers_hero__div.style.left = '50%'
		brookers_hero__div.style.transform = 'translateX(-50%)'
		brookers_hero__div.classList.remove('opacity-0')
		console.debug('animation__run|debug|1')
		const h1__flyin_animation_o$ = h1__flyin_animation_o$_()
		const h1__bounce_animation_o$ = h1__bounce_animation_o$_()
		const h2__flyin_animation_o$ = h2__flyin_animation_o$_()
		const h2__bounce_animation_o$ = h2__bounce_animation_o$_()
		const brookers_img__div__slidein_animation_o$ = brookers_img__div__slidein_animation_o$_()
		const brookers_img__div__slideout_animation_o$ = brookers_img__div__slideout_animation_o$_()
		const brookers_master__div__slide_animation_o$ = brookers_master__div__slide_animation_o$_()
		const brookers_hero__div__slide_animation_o$ = brookers_hero__div__slide_animation_o$_()
		return rmemo__wait(memo_(()=>
			h1__flyin_animation_o$()?.finish
				&& h1__bounce_animation_o$()?.finish
				&& h2__flyin_animation_o$()?.finish
				&& h2__bounce_animation_o$()?.finish
				&& brookers_img__div__slidein_animation_o$()?.finish
				&& brookers_img__div__slideout_animation_o$()?.finish
				&& brookers_master__div__slide_animation_o$()?.finish
				&& brookers_hero__div__slide_animation_o$()?.finish),
		finish=>finish,
		20_000)
		function h1__flyin_animation_o$_() {
			return calling(memo_<animation_o_T>(
				$=>{
					h1.classList.remove('opacity-0')
					const animation = h1.animate([
						{ transform: `translate(-25vw, -25vh) rotate(-45deg)`, opacity: 0 },
						{ transform: `translate(4px, 1px) rotate(10deg)`, opacity: 1 },
						{ transform: `translate(40px, 10px) rotate(10deg)`, opacity: 1 },
					], { duration: 400, fill: 'backwards', easing: 'ease-in' })
					animation.addEventListener('finish', ()=>{
						$._ = { ...$(), finish: true }
					})
					return { animation, play: true, finish: false }
				}))
		}
		function h1__bounce_animation_o$_() {
			return calling(memo_<animation_o_T|undefined>(
				$=>{
					if (!h1__flyin_animation_o$().finish) return
					const keyframe_a1 = s180_d12_spring__keyframe_a1_(40, 10, 10)
					const val = {
						animation: h1.animate(keyframe_a1, {
							duration: 800,
							easing: 'ease-in'
						}),
						play: true,
						finish: false
					}
					val.animation.addEventListener('finish', ()=>{
						$._ = {
							...$()!,
							finish: true
						}
					})
					return val
				}))
		}
		function h2__flyin_animation_o$_() {
			return calling(memo_<animation_o_T|undefined>(
				$=>{
					if (!h1__flyin_animation_o$().finish) return
					h2.classList.remove('opacity-0')
					let val = {
						animation: h2.animate([
							{ transform: `translate(25vw, -25vh) rotate(45deg)`, opacity: 0 },
							{ transform: `translate(-4px, 1px) rotate(-10deg)`, opacity: 1 },
							{ transform: `translate(-40px, 10px) rotate(-10deg)`, opacity: 1 },
						], { duration: 400, fill: 'backwards', easing: 'ease-in' }),
						play: true,
						finish: false
					}
					val.animation.addEventListener('finish', ()=>{
						$._ = {
							...$()!,
							finish: true
						}
					})
					val = {
						...val,
						play: h1__flyin_animation_o$().finish
					}
					if (val.play) {
						val.animation.play()
					}
					return val
				}))
		}
		function h2__bounce_animation_o$_() {
			return calling(memo_<animation_o_T|undefined>(
				$=>{
					if (!h2__flyin_animation_o$()?.finish) return
					const keyframe_a1 = s180_d12_spring__keyframe_a1_(-40, 10, -10)
					const val = {
						animation: h2.animate(keyframe_a1, {
							duration: 800,
							easing: 'ease-in'
						}),
						play: true,
						finish: false
					}
					val.animation.addEventListener('finish', ()=>{
						$._ = {
							...$()!,
							finish: true
						}
					})
					return val
				}))
		}
		function brookers_img__div__slidein_animation_o$_() {
			return calling(memo_<animation_o_T|undefined>($=>{
				if (!h2__bounce_animation_o$()?.finish) return
				brookers_img__div.classList.remove('opacity-0')
				const val = {
					animation: brookers_img__div.animate([
						{
							transform: 'translateX(-100vw)',
							opacity: 0
						},
						{
							transform: 'translateX(25vw)',
							opacity: 1
						}
					], { duration: 200, fill: 'forwards' }),
					play: true,
					finish: false
				}
				val.animation.addEventListener('finish', ()=>{
					$._ = {
						...$()!,
						finish: true
					}
				})
				return val
			}))
		}
		function brookers_img__div__slideout_animation_o$_() {
			return calling(memo_<animation_o_T|undefined>($=>{
				if (!brookers_img__div__slidein_animation_o$()?.finish) return
				const val = {
					animation: brookers_img__div.animate([
						{
							transform: 'translateX(25vw)'
						},
						{
							transform: 'translateX(-100vw)'
						}
					], {
						delay: 2000,
						duration: 400,
						fill: 'forwards'
					}),
					play: true,
					finish: false
				}
				val.animation.addEventListener('finish', ()=>{
					brookers_img__div.remove()
					$._ = {
						...$()!,
						finish: true
					}
				})
				return val
			}))
		}
		function brookers_master__div__slide_animation_o$_() {
			return calling(memo_<animation_o_T|undefined>($=>{
				if (!brookers_img__div__slideout_animation_o$()?.finish) return
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
						fill: 'backwards'
					}),
					play: true,
					finish: false
				}
				val.animation.addEventListener('finish', ()=>{
					$._ = {
						...$()!,
						finish: true
					}
				})
				return val
			}))
		}
		function brookers_hero__div__slide_animation_o$_() {
			return calling(memo_<animation_o_T|undefined>($=>{
				if (!brookers_img__div__slideout_animation_o$()?.finish) return
				const val = {
					animation: brookers_hero__div.animate([
						{
							left: '50%',
							transform: 'translateX(-50%)'
						},
						{
							left: '32px',
							transform: 'translateX(0)'
						}
					], { duration: 200, fill: 'forwards' }),
					play: true,
					finish: false
				}
				val.animation.addEventListener('finish', ()=>{
					$._ = {
						...$()!,
						finish: true
					}
				})
				return val
			}))
		}
	}
}
// f(0) = 0; f'(0) = 0; f''(t) = -180(f(t) - 1) - 12f'(t)
// https://www.wolframalpha.com/input?i=f%280%29+%3D+0%3B+f%27%280%29+%3D+0%3B+f%27%27%28t%29+%3D+-180%28f%28t%29+-+1%29+-+12f%27%28t%29
// f(t) = -1/2 e^(-6 t) (-2 e^(6 t) + sin(12 t) + 2 cos(12 t))
function s180_d12_spring__keyframe_a1_(X:number, Y:number, O:number) {
	const keyframe_a1:Keyframe[] = []
	keyframe_a1.push({
		transform: `translate(${X}px, ${Y}px) rotate(${O}deg)`
	})
	for (let T = 1; T < 100; T++) {
		const t = T / 100
		const c = -.5 * Math.exp(-6 * t) * (-2 * Math.exp(6 * t) + Math.sin(12 * t) + 2 * Math.cos(12 * t))
		keyframe_a1.push({
			transform: `translate(${X - c * X}px, ${Y - c * Y}px) rotate(${O - c * O}deg)`
		})
	}
	keyframe_a1.push({
		transform: `translate(0, 0) rotate(0deg)`
	})
	return keyframe_a1
}
type animation_o_T = {
	animation:Animation
	play:boolean
	finish:boolean
}
