/// <reference lib="dom" />
import { type brookers__timeline_op_T } from '@btakita/domain--any--brookebrodack'
import { browser_ctx, YT$_, type YT_Player, type YT_PlayerState_val_T } from '@btakita/domain--browser--brookebrodack'
import { sleep, tup } from 'ctx-core/function'
import { type circular_memo_T, memo_, nullish__none_, rmemo__unset, rmemo__wait, run, sig_ } from 'ctx-core/rmemo'
import { spring, timeline } from 'motion'
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
	const brookers_hero__div__middle_x = brookers_hero__div__middle_x_()
	const brookers_hero__div__entry_animation = brookers_hero__div__entry_animation_()
	const brookers_img__div__slide_animation = brookers_img__div__slide_animation_()
	brookers_master__div__slide_animation__new()
	brookers_hero__div__slide_animation__new()
	brookers__div.classList.remove('hidden')
	async function ready__waitfor() {
		let try_count = 0
		while ((innerWidth__is_pending() || brookers_hero__div__is_pending_()) && try_count < 50) {
			await sleep(10)
			try_count++
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
	function brookers_hero__div__middle_x_() {
		const brookers_hero__div__width = brookers_hero__div.getBoundingClientRect().width
		return (
			brookers_hero__div__width
				? window.innerWidth / 2 - brookers_hero__div__width / 2
				: '50vw'
		)
	}
	function brookers_hero__div__entry_animation_() {
		setTimeout(
			()=>{
				brookers_hero__div.style.transform = 'translateX(' + brookers_hero__div__middle_x + ')'
				brookers_hero__div.classList.remove('invisible')
			}, 0)
		return timeline([
			[h1,
				{
					x: ['-25vw', 1, 0],
					y: ['-25vh', 1, 0],
					rotate: [-45, 10, 0],
					opacity: [0, .5, 1]
				},
				{
					duration: .65,
					easing: 'ease-in',
					rotate: {
						duration: .8,
						easing: spring({ stiffness: 300, damping: 10 }),
					}
				}
			],
			[h2,
				{
					x: ['25vw', -1, 0],
					y: ['-25vh', 1, 0],
					rotate: [45, -10, 0],
					opacity: [0, .5, 1]
				},
				{
					duration: .65,
					easing: 'ease-in',
					rotate: {
						duration: .8,
						easing: spring({ stiffness: 300, damping: 10 }),
					}
				}
			],
		])
	}
	function brookers_img__div__slide_animation_() {
		setTimeout(
			()=>brookers_img__div.classList.remove('hidden'),
			brookers_hero__div__entry_animation.duration * 1000)
		return timeline([
			[
				brookers_img__div,
				{
					x: ['-100vw', '-100vw']
				},
				{
					duration: brookers_hero__div__entry_animation.duration
				}
			],
			[
				brookers_img__div,
				{
					x: ['-100vw', '25vw'],
					opacity: [0, 1]
				},
				{
					duration: .2
				}
			],
			[
				brookers_img__div,
				{
					x: [0, '-100vw'],
				},
				{
					delay: 2,
					duration: .4,
					persist: false
				}
			]
		])
	}
	function brookers_master__div__slide_animation__new() {
		setTimeout(()=>{
			brookers_master__div.classList.remove('hidden')
		}, brookers_img__div__slide_animation.duration)
		return timeline([
			[
				brookers_master__div,
				{
					x: [window.innerWidth, 0],
					y: 0,
				},
				{
					delay: brookers_img__div__slide_animation.duration,
					duration: .4
				}
			]
		])
	}
	function brookers_hero__div__slide_animation__new() {
		return timeline([
			[
				brookers_hero__div,
				{
					x: [brookers_hero__div__middle_x, 36],
					y: 0,
				},
				{
					delay: brookers_img__div__slide_animation.duration,
					duration: .4
				}
			]
		])
	}
}
