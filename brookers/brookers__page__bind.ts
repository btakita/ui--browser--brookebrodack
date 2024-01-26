/// <reference lib="dom" />
import { type brookers__timeline_op_T } from '@btakita/domain--any--brookebrodack'
import { sleep } from 'ctx-core/function'
import { spring, timeline } from 'motion'
export async function brookers__page__bind(brookers__page_c:HTMLDivElement) {
	await brookers__page__animate(brookers__page_c)
	await brookers__timeline__item_c__init(brookers__page_c)
}
async function brookers__timeline__item_c__init(brookers__page_c:HTMLDivElement) {
	const brookers__page__main_c = brookers__page_c.querySelector('.brookers__page__main_c')!
	const brookers__timeline__item_c_a = Array.from(
		brookers__page_c.querySelectorAll('.brookers__timeline__item_c')
	) as HTMLOListElement[]
	for (const brookers__timeline__item_c of brookers__timeline__item_c_a) {
		brookers__timeline__item_c.addEventListener('click', ()=>{
			const op_a = JSON.parse(
				brookers__timeline__item_c.dataset.op_a ?? '[]'
			) as brookers__timeline_op_T[]
			for (const op of op_a) {
				switch (op.type) {
					case 'html':
						break
					case 'youtube':
						brookers__page__main_c.innerHTML =
							'<iframe' +
							' class="youtube w-full aspect-video"' +
							' src="https://www.youtube.com/embed/FoFMRXlNJ6Y?si=lFkPNi-y6ixfWcW7"' +
							' title="YouTube video player"' +
							' frameborder="0"' +
							' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"' +
							' allowfullscreen' +
							'></iframe>'
				}
			}
		})
	}
	async function youtube__op(op:brookers__timeline_op_T) {
		let child:HTMLElement
		// @ts-expect-error TS2740
		// eslint-disable-next-line no-cond-assign
		while (child = brookers__page__main_c.lastChild!) {
			child.remove()
		}
	}
}
async function brookers__page__animate(brookers__page_c:HTMLDivElement) {
	const h1 = brookers__page_c.querySelector('h1')!
	const h2 = brookers__page_c.querySelector('h2')!
	const brookers__page__content_c =
		brookers__page_c.querySelector('.brookers__page__content_c') as HTMLElement
	const brookers__page__hero_c =
		brookers__page_c.querySelector('.brookers__page__hero_c') as HTMLElement
	const brookers__page__sidebar_c =
		brookers__page_c.querySelector('.brookers__page__sidebar_c') as HTMLElement
	const brookers__page__content__inner_c =
		brookers__page_c.querySelector('.brookers__page__content__inner_c') as HTMLElement
	const brookers__page__img_a_c =
		brookers__page_c.querySelector('.brookers__page__img_a_c') as HTMLElement
	await ready__wait_for()
	const hero_middle_x = hero_middle_x_()
	const hero_animation = hero_animation__new()
	const img_a_animation = img_a_animation__new()
	content_animation__new()
	content_sidebar_animation__new()
	content_hero_animation__new()
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
			brookers__page__img_a_c.classList.remove('hidden'),
		hero_animation.duration * 1000)
		return timeline([
			[
				brookers__page__img_a_c,
				{
					x: ['-100vw', '-100vw']
				},
				{
					duration: hero_animation.duration
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
	function content_animation__new() {
		return timeline([
			[
				brookers__page__content_c,
				{
					x: [hero_middle_x, hero_middle_x]
				},
				{
					duration: img_a_animation.duration
				}
			],
			[
				brookers__page__content_c,
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
			brookers__page__content__inner_c.classList.remove('hidden'),
		img_a_animation.duration * 1000)
		return timeline([
			[
				brookers__page__sidebar_c,
				{
					x: [hero_middle_x, hero_middle_x]
				},
				{
					duration: img_a_animation.duration
				}
			],
			[
				brookers__page__sidebar_c,
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
				brookers__page__hero_c,
				{},
				{
					duration: img_a_animation.duration
				}
			],
			[
				brookers__page__hero_c,
				{
					x: [null, 36],
					y: 0,
				},
				{
					duration: .4
				}
			]
		])
	}
}
