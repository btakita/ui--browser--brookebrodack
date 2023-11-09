import { browser__ctx__ensure } from '@btakita/domain--browser--brookebrodack'
import { V_page_brookers__onbind_ } from '@btakita/ui--all--brookebrodack'
import { type Ctx, ctx__set } from '@ctx-core/object'
import { type TimelineDefinition } from '@motionone/dom'
import { timeline } from 'motion'
export function V_page_brookers__onbind__init() {
	let ctx = browser__ctx__ensure()
	ctx__set(ctx, V_page_brookers__onbind_, (V_page_brookers:HTMLDivElement, ctx:Ctx)=>{
		let h1 = V_page_brookers.querySelector('h1')!
		let h2 = V_page_brookers.querySelector('h2')!
		let cooler_in_space = V_page_brookers.querySelector('.cooler-in-space')!
		let V_page_brookers_content = V_page_brookers.querySelector('.V_page_brookers_content')!
		let V_page_brookers_sidebar = V_page_brookers.querySelector('.V_page_brookers_sidebar')!
		let V_page_brookers_hero = V_page_brookers.querySelector('.V_page_brookers_hero')!
		timeline([
			...h1__tldef_(),
			...h2__tldef_(),
			...cooler_in_space__tldef_(),
			...V_page_brookers_sidebar__tldef_(),
			// ...V_page_brookers_hero__tldef_(),
		])
		V_page_brookers.classList.remove('hidden')
		function h1__tldef_():TimelineDefinition {
			return [
				[
					h1,
					{
						x: ['-50vw', 0],
						y: ['-50vh', 0],
						rotate: [-45, 10, 0],
						opacity: [0, .5, 1]
					},
					// { duration: 0.5, easing: 'ease' }
					{
						duration: 0.65,
						// easing: [0.3, 0.66, 0.25, 1],
						easing: 'ease-in',
						rotate: {
							duration: .8,
							easing: [.3, .66, .25, 1,],
						},
					}
				]
			]
		}
		function h2__tldef_():TimelineDefinition {
			return [
				[
					h2,
					{
						x: ['50vw', 0],
						y: ['-50vh', 0],
						rotate: [45, -10, 0],
						opacity: [0, .5, 1]
					},
					// { duration: 0.5, easing: 'ease' }
					{
						duration: 0.65,
						// easing: [0.3, 0.66, 0.25, 1],
						easing: 'ease-in',
						rotate: {
							duration: .8,
							easing: [.3, .66, .25, 1,],
						}
					}
				]
			]
		}
		function cooler_in_space__tldef_():TimelineDefinition {
			return [
				[
					cooler_in_space,
					{
						x: ['-100vw', '-50vw', '25vw'],
						opacity: [0, .5, 1]
					},
					{
						duration: .4
					}
				],
				[
					cooler_in_space,
					{
						x: [0, '-100vw'],
					},
					{
						delay: 2,
						duration: .4,
						persist: false
					}
				]
			]
		}
		function V_page_brookers_sidebar__tldef_():TimelineDefinition {
			return [
				[
					V_page_brookers_sidebar,
					// V_page_brookers_content,
					{
						x: ['50vw', 0],
						y: 0,
						opacity: [0, .5, 1]
					},
					{
						duration: .4
					}
				]
			]
		}
		function V_page_brookers_hero__tldef_():TimelineDefinition {
		  return [
				[
					V_page_brookers_hero,
					{
						x: ['50vw', 0],
						y: ['50vh', 0],
					},
					{
						duration: .4,
						// at: 0
					}
				]
			]
		}
	})
}
