import { type nullish, run, type sig_T } from 'ctx-core/rmemo'
export function animate_o_<E extends Element>(
	$:sig_T<animate_o_T|nullish>,
	el:E,
	animation_:(el:E)=>Animation
) {
	let val = $.val
	if (val?.el !== el) {
		val = {
			el,
			animation: new Proxy(animation_(el), {
				get(animation, prop:keyof Animation) {
					switch (prop) {
						case 'play':
							return ()=>{
								if (animation.playbackRate < 0) {
									return reverse()
								} else {
									return play()
								}
							}
						case 'reverse':
							return reverse
						case 'finish':
							return finish
						case 'cancel':
							return cancel
						case 'updatePlaybackRate':
							return updatePlaybackRate
						case 'addEventListener':
							return addEventListener
						case 'removeEventListener':
							return removeEventListener
						default:
							return animation[prop]
					}
					function play() {
						animation.play()
						play_state__ensure()
						if (animation.playbackRate < 0) {
							setTimeout(
								()=>begin_state__ensure(animation),
								<number>animation.currentTime / -animation.playbackRate)
						}
					}
					function reverse() {
						animation.reverse()
						play_state__ensure()
						setTimeout(
							()=>begin_state__ensure(animation),
							<number>animation.currentTime / animation.playbackRate)
					}
					function finish() {
						animation.finish()
						if ($.val?.is_play !== false || $.val?.is_finish !== !!<number>animation.currentTime) {
							$._ = { ...$()!, is_play: false, is_finish: !!<number>animation.currentTime }
						}
					}
					function cancel() {
						animation.cancel()
						if ($.val?.is_play !== false || $.val?.is_finish !== false) {
							$._ = { ...$()!, is_play: false, is_finish: false }
						}
					}
					function updatePlaybackRate(playbackRate:number) {
						animation.updatePlaybackRate(playbackRate)
						animation.ready
							.then(()=>{
								if (animation.playbackRate < 0) {
									setTimeout(
										()=>begin_state__ensure(animation),
										<number>animation.currentTime / -animation.playbackRate)
								}
							})
						return
					}
					function addEventListener(...arg_a:Parameters<Animation['addEventListener']>) {
						return animation.addEventListener(...arg_a)
					}
					function removeEventListener(...arg_a:Parameters<Animation['removeEventListener']>) {
						return animation.removeEventListener(...arg_a)
					}
					function play_state__ensure() {
						if ($.val?.is_play !== true || $.val?.is_finish !== false) {
							$._ = { ...$()!, is_play: true, is_finish: false }
						}
					}
				},
				set(
					animation,
					prop:keyof Omit<Animation, 'finished'|'pending'|'playState'|'ready'|'replaceState'>,
					val
				) {
					switch (prop) {
						case 'playbackRate':
							return run(()=>{
								if (animation[prop] === val) return false
								animation[prop] = val
								if (val < 0) {
									setTimeout(
										()=>begin_state__ensure(animation),
										<number>animation.currentTime / -val)
								}
								return true
							})
						default:
							if (animation[prop] === val) return false
							animation[prop] = val as never
							return true
					}
				}
			}),
			is_play: true,
			is_finish: false,
			finish_currentTime: null,
			is_remove: false
		}
		val.animation.addEventListener('finish', ()=>{
			$._ = {
				...$()!,
				is_finish: true,
				finish_currentTime: <number>$()!.animation.currentTime
			}
		})
		val.animation.addEventListener('remove', ()=>{
			$._ = { ...$()!, is_remove: true }
		})
	}
	return val
	function begin_state__ensure(animation:Animation) {
		if ($.val?.is_play !== !!animation.currentTime || $.val?.is_finish !== false) {
			$._ = { ...$()!, is_play: !!animation.currentTime, is_finish: false }
		}
	}
}
export type animate_o_T = {
	animation:Animation
	el:Element
	is_play:boolean
	is_finish:boolean
	finish_currentTime:number|null
	is_remove:boolean
}
