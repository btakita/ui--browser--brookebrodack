/// <reference lib="dom" />
import { type brookers__timeline_op_T } from '@btakita/domain--any--brookebrodack'
import { browser_ctx, YT$_, type YT_Player, type YT_PlayerState_val_T } from '@btakita/domain--browser--brookebrodack'
import { sleep, tup } from 'ctx-core/function'
import { type circular_memo_T, memo_, nullish__none_, rmemo__unset, rmemo__wait, run, sig_ } from 'ctx-core/rmemo'
import { spring, timeline } from 'motion'
export async function brookers__page__bind(brookers__page_c:HTMLDivElement) {
	await brookers__page__animate(brookers__page_c)
	await brookers__timeline__item_c__init(brookers__page_c)
}
async function brookers__timeline__item_c__init(brookers__page_c:HTMLDivElement) {
	const spinner_template = brookers__page_c.querySelector<HTMLTemplateElement>('#spinner_template')!
	const brookers__page__detail_c =
		brookers__page_c.querySelector<HTMLDivElement&{ op__go$:circular_memo_T }>(
			'.brookers__page__detail_c')!
	const brookers__timeline__item_c_a =
		Array.from(brookers__page_c.querySelectorAll<HTMLOListElement>(
			'.brookers__timeline__item_c'))
	const html_op__container =
		brookers__page__detail_c.querySelector('#html_op__container')!
	const brookers__timeline_op$ =
		sig_<brookers__timeline_op_T|undefined>(undefined)
	const YT_player_state$ =
		sig_<YT_PlayerState_val_T|undefined>(undefined)
	const YT_player$ = YT_player$_()
	const html_op__title = brookers__page__detail_c.querySelector<HTMLDivElement>(
		'#html_op__title')!
	const html_op__close = brookers__page__detail_c.querySelector('#html_op__close')!
	html_op__close.addEventListener('click', ()=>{
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
						const YT_iframe_placeholder =
							brookers__page__detail_c.querySelector('#YT_iframe_placeholder')!
						const _YT_player = new YT!.Player(YT_iframe_placeholder, {
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
						YT_iframe_placeholder.addEventListener('resize', ()=>{
							_YT_player.setSize('100%', YT_player__height_())
						})
						function YT_player__height_() {
							return YT_iframe_placeholder.clientWidth * 16 / 9
						}
					}).catch(err=>{
						console.error(err)
						rmemo__unset(YT_player$)
					})
				}
			})
	}
	function op__init() {
		brookers__page__detail_c.op__go$ = run(
			memo_<circular_memo_T, {
				brookers__timeline_op:brookers__timeline_op_T|undefined
			}>(op__go$=>{
				nullish__none_(tup(YT_player$()), (
					YT_player,
				)=>{
					const brookers__timeline_op = brookers__timeline_op$()
					switch (brookers__timeline_op?.type) {
						case 'html':
							html_op__title.innerText = brookers__timeline_op.title
							brookers__page__detail_c.classList.remove('hidden')
							if (brookers__timeline_op !== op__go$.brookers__timeline_op) {
								YT_player.stopVideo()
								YT_player.getIframe().classList.add('hidden')
								html_op__container.innerHTML = brookers__timeline_op.html
								html_op__container.classList.remove('hidden')
								const iframe =
									html_op__container.querySelector<HTMLIFrameElement>('iframe')
								if (iframe) {
									spinner__attach()
									iframe.addEventListener('load', ()=>spinner__remove())
								}
							}
							break
						case 'youtube':
							html_op__title.innerText = brookers__timeline_op.title
							brookers__page__detail_c.classList.remove('hidden')
							html_op__container.classList.add('hidden')
							if (brookers__timeline_op !== op__go$.brookers__timeline_op) {
								html_op__container.innerHTML = ''
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
							html_op__container.classList.remove('hidden')
							YT_player.getIframe().classList.remove('hidden')
							brookers__page__detail_c.classList.add('hidden')
					}
					op__go$.brookers__timeline_op = brookers__timeline_op
				})
				return op__go$
			}))
		for (const brookers__timeline__item_c of brookers__timeline__item_c_a) {
			brookers__timeline__item_c.addEventListener('click', async ()=>{
				brookers__timeline_op$._ = JSON.parse(
					brookers__timeline__item_c.dataset.op ?? '{}'
				) as brookers__timeline_op_T
			})
		}
	}
	function spinner__attach() {
		if (!brookers__page__detail_c.querySelector('.spinner')) {
			brookers__page__detail_c.appendChild(
				spinner_template.content.cloneNode(true))
		}
	}
	function spinner__remove() {
		const spinner = brookers__page__detail_c.querySelector('.spinner')
		spinner?.remove?.()
	}
}
async function brookers__page__animate(brookers__page_c:HTMLDivElement) {
	const h1 = brookers__page_c.querySelector('h1')!
	const h2 = brookers__page_c.querySelector('h2')!
	const brookers__page__hero_c =
		brookers__page_c.querySelector('.brookers__page__hero_c') as HTMLElement
	const brookers__page__master_c =
		brookers__page_c.querySelector('.brookers__page__master_c') as HTMLElement
	const brookers__page__img_a_c =
		brookers__page_c.querySelector('.brookers__page__img_a_c') as HTMLElement
	await ready__wait_for()
	const hero_middle_x = hero_middle_x_()
	const hero__entry_animation = hero__entry_animation__new()
	const img_a__slide_animation = img_a__slide_animation__new()
	brookers__page__master__slide_animation__new()
	brookers__page__hero__slide_animation__new()
	brookers__page_c.classList.remove('hidden')
	async function ready__wait_for() {
		const try_count = 0
		while ((innerWidth__is_pending() || brookers__page__hero__is_pending()) && try_count < 5) {
			await sleep(100)
		}
		/**
		 * Chrome seems to have a short period where the innerWidth is incorrect.
		 * During this period, outerWidth is 0.
		 * TODO: 2023-11-8: check if this is necessary in the future
		 */
		function innerWidth__is_pending() {
			return !window.outerWidth
		}
		function brookers__page__hero__is_pending() {
			return !brookers__page__hero_c.getBoundingClientRect().width
		}
	}
	function hero_middle_x_() {
		const brookers__page__hero__width = brookers__page__hero_c.getBoundingClientRect().width
		return (
			brookers__page__hero__width
				? window.innerWidth / 2 - brookers__page__hero__width / 2
				: '50vw'
		)
	}
	function hero__entry_animation__new() {
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
	function img_a__slide_animation__new() {
		setTimeout(
			()=>brookers__page__img_a_c.classList.remove('hidden'),
			hero__entry_animation.duration * 1000)
		return timeline([
			[
				brookers__page__img_a_c,
				{
					x: ['-100vw', '-100vw']
				},
				{
					duration: hero__entry_animation.duration
				}
			],
			[
				brookers__page__img_a_c,
				{
					x: ['-100vw', '25vw'],
					opacity: [0, 1]
				},
				{
					duration: .2
				}
			],
			[
				brookers__page__img_a_c,
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
	function brookers__page__master__slide_animation__new() {
		return timeline([
			[
				brookers__page__master_c,
				{
					x: [window.innerWidth, 0],
					y: 0,
				},
				{
					delay: img_a__slide_animation.duration,
					duration: .4
				}
			]
		])
	}
	function brookers__page__hero__slide_animation__new() {
		return timeline([
			[
				brookers__page__hero_c,
				{
					x: [hero_middle_x, 36],
					y: 0,
				},
				{
					delay: img_a__slide_animation.duration,
					duration: .4
				}
			]
		])
	}
}
