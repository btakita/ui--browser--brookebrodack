import { YT$_, type YT_Player, type YT_PlayerState_val_T } from '@btakita/domain--browser--brookebrodack/youtube'
import { be_memo_pair_, be_sig_triple_, nullish__none_, rmemo__unset, rmemo__wait } from 'ctx-core/rmemo'
export const [
	YT_iframe__div$_,
	YT_iframe__div_,
	YT_iframe__div__set,
] = be_sig_triple_<HTMLDivElement|undefined>(()=>undefined)
export const [
	YT_player_state$_,
	YT_player_state_,
	YT_player_state__set,
] = be_sig_triple_<YT_PlayerState_val_T|undefined>(()=>undefined)
export const [
	YT_player$_,
	YT_player_
] = be_memo_pair_<YT_Player|undefined>((ctx, YT_player$)=>
	nullish__none_([YT_iframe__div_(ctx)],
		YT_iframe__div=>{
			init()
			return YT_player$.val
			function init() {
				rmemo__wait(YT$_(ctx), YT=>YT, 10_000)
					.then(YT=>{
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
									YT_player_state__set(ctx, evt.data)
								},
							}
						})
						YT_iframe__div.addEventListener('resize', ()=>{
							_YT_player.setSize('100%', YT_player__height_())
						})
						function YT_player__height_() {
							return YT_iframe__div.clientWidth * 16 / 9
						}
					})
					.catch(err=>{
						console.error(err)
						rmemo__unset(YT_player$)
					})
			}
		}))
