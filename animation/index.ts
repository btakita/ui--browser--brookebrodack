import { type sig_T } from 'ctx-core/rmemo'
export function animate_o_($:sig_T<animate_o_T|undefined>, animation:Animation) {
	const val = { animation, done: false }
	val.animation.addEventListener('finish', ()=>{
		$._ = { ...$()!, done: true }
	})
	return val
}
export type animate_o_T = {
	animation:Animation
	done:boolean
}
