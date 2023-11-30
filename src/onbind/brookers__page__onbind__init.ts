import { browser__ctx__ensure } from '@btakita/domain--browser--brookebrodack'
import { brookers__page__onbind_ } from '@btakita/ui--all--brookebrodack'
import { sleep } from 'ctx-core/function'
import { type Ctx, ctx__set } from 'ctx-core/object'
import { spring, timeline } from 'motion'
export async function brookers__page__onbind__init() {
	let ctx = browser__ctx__ensure()
	ctx__set(ctx, brookers__page__onbind_, async (brookers__page_c_:HTMLDivElement, ctx:Ctx)=>{
		let h1 = brookers__page_c_.querySelector('h1')!
		let h2 = brookers__page_c_.querySelector('h2')!
		let brookers__page__hero_c_ = brookers__page_c_.querySelector<HTMLElement>('.brookers__page__hero_c_')!
		let brookers__page__img_a_c_ = brookers__page_c_.querySelector<HTMLElement>('.brookers__page__img_a_c_')!
		let brookers__page__content_c_ = brookers__page_c_.querySelector<HTMLElement>('.brookers__page__content_c_')!
		let brookers__page__sidebar_c_ = brookers__page_c_.querySelector<HTMLElement>('.brookers__page__sidebar_c_')!
		await ready__wait_for()
		let hero_middle_x = hero_middle_x_()
		let hero_animation = hero_animation__new()
		let img_a_animation = img_a_animation__new()
		let content_animation = content_animation__new()
		let content_sidebar_animation = content_sidebar_animation__new()
		let content_hero_animation = content_hero_animation__new()
		brookers__page_c_.classList.remove('hidden')
		async function ready__wait_for() {
			let try_count = 0
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
				return !brookers__page__hero_c_.getBoundingClientRect().width
			}
		}
		function hero_middle_x_() {
			let brookers__page__hero__width = brookers__page__hero_c_.getBoundingClientRect().width
			return (
				brookers__page__hero__width
					? window.innerWidth / 2 - brookers__page__hero__width / 2
					: '50vw'
			)
		}
		function hero_animation__new() {
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
		function img_a_animation__new() {
			setTimeout(()=>
				brookers__page__img_a_c_.classList.remove('hidden'),
				hero_animation.duration * 1000)
			return timeline([
				[
					brookers__page__img_a_c_,
					{
						x: ['-100vw', '-100vw']
					},
					{
						duration: hero_animation.duration
					}
				],
				[
					brookers__page__img_a_c_,
					{
						x: ['-100vw', '25vw'],
						opacity: [0, 1]
					},
					{
						duration: .2
					}
				],
				[
					brookers__page__img_a_c_,
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
		function content_animation__new() {
			return timeline([
				[
					brookers__page__content_c_,
					{
						x: [hero_middle_x, hero_middle_x]
					},
					{
						duration: img_a_animation.duration
					}
				],
				[
					brookers__page__content_c_,
					{
						x: [hero_middle_x, 0],
						y: 0,
					},
					{
						duration: .4
					}
				]
			])
		}
		function content_sidebar_animation__new() {
			setTimeout(()=>
				brookers__page__sidebar_c_.classList.remove('hidden'),
				img_a_animation.duration * 1000)
			return timeline([
				[
					brookers__page__sidebar_c_,
					{
						x: [hero_middle_x, hero_middle_x]
					},
					{
						duration: img_a_animation.duration
					}
				],
				[
					brookers__page__sidebar_c_,
					{
						x: ['100vw', 0],
						y: 0,
					},
					{
						duration: .4
					}
				]
			])
		}
		function content_hero_animation__new() {
			return timeline([
				[
					brookers__page__hero_c_,
					{},
					{
						duration: img_a_animation.duration
					}
				],
				[
					brookers__page__hero_c_,
					{
						x: [null, 12],
						y: 0,
					},
					{
						duration: .4
					}
				]
			])
		}
	})
}
