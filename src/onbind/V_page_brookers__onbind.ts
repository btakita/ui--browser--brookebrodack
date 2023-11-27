import { browser__ctx__ensure } from '@btakita/domain--browser--brookebrodack'
import { V_page_brookers__onbind_ } from '@btakita/ui--all--brookebrodack'
import { sleep } from 'ctx-core/function'
import { type Ctx, ctx__set } from 'ctx-core/object'
import { spring, timeline } from 'motion'
export async function V_page_brookers__onbind__init() {
	let ctx = browser__ctx__ensure()
	ctx__set(ctx, V_page_brookers__onbind_, async (V_page_brookers:HTMLDivElement, ctx:Ctx)=>{
		let h1 = V_page_brookers.querySelector('h1')!
		let h2 = V_page_brookers.querySelector('h2')!
		let V_page_brookers_hero = V_page_brookers.querySelector<HTMLElement>('.V_page_brookers_hero')!
		let V_page_brookers_img_a = V_page_brookers.querySelector<HTMLElement>('.V_page_brookers_img_a')!
		let V_page_brookers_content = V_page_brookers.querySelector<HTMLElement>('.V_page_brookers_content')!
		let V_page_brookers_sidebar = V_page_brookers.querySelector<HTMLElement>('.V_page_brookers_sidebar')!
		await ready__wait_for()
		let hero_middle_x = hero_middle_x_()
		let hero_animation = hero_animation__new()
		let img_a_animation = img_a_animation__new()
		let content_animation = content_animation__new()
		let content_sidebar_animation = content_sidebar_animation__new()
		let content_hero_animation = content_hero_animation__new()
		V_page_brookers.classList.remove('hidden')
		async function ready__wait_for() {
			let try_count = 0
			while ((innerWidth__is_pending() || V_page_brookers_hero__is_pending()) && try_count < 5) {
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
			function V_page_brookers_hero__is_pending() {
				return !V_page_brookers_hero.getBoundingClientRect().width
			}
		}
		function hero_middle_x_() {
			let V_page_brookers_hero__width = V_page_brookers_hero.getBoundingClientRect().width
			return (
				V_page_brookers_hero__width
					? window.innerWidth / 2 - V_page_brookers_hero__width / 2
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
				V_page_brookers_img_a.classList.remove('hidden'),
				hero_animation.duration * 1000)
			return timeline([
				[
					V_page_brookers_img_a,
					{
						x: ['-100vw', '-100vw']
					},
					{
						duration: hero_animation.duration
					}
				],
				[
					V_page_brookers_img_a,
					{
						x: ['-100vw', '25vw'],
						opacity: [0, 1]
					},
					{
						duration: .2
					}
				],
				[
					V_page_brookers_img_a,
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
					V_page_brookers_content,
					{
						x: [hero_middle_x, hero_middle_x]
					},
					{
						duration: img_a_animation.duration
					}
				],
				[
					V_page_brookers_content,
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
				V_page_brookers_sidebar.classList.remove('hidden'),
				img_a_animation.duration * 1000)
			return timeline([
				[
					V_page_brookers_sidebar,
					{
						x: [hero_middle_x, hero_middle_x]
					},
					{
						duration: img_a_animation.duration
					}
				],
				[
					V_page_brookers_sidebar,
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
					V_page_brookers_hero,
					{},
					{
						duration: img_a_animation.duration
					}
				],
				[
					V_page_brookers_hero,
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
