import { YT_, type YT_Player, type YT_PlayerState_val_T } from '@btakita/domain--browser--brookebrodack/youtube'
import { be_memo_pair_, be_sig_triple_, nullish__none_, rmemo__unset, rmemo__wait } from 'ctx-core/rmemo'
export const [
	,
	YT_iframe__div_,
	YT_iframe__div__set,
] = be_sig_triple_<HTMLDivElement|undefined>(()=>undefined)
export const [
	,
	YT_PlayerState_,
	YT_PlayerState__set,
] = be_sig_triple_<YT_PlayerState_val_T|undefined>(()=>undefined)
export const [
	,
	YT_PlayerState__PLAYING_
] = be_memo_pair_(ctx=>
	nullish__none_([YT_PlayerState_(ctx)],
		YT_PlayerState=>
			YT_PlayerState === window.YT.PlayerState.PLAYING))
export const [
	,
	YT_PlayerState__PAUSED_
] = be_memo_pair_(ctx=>
	nullish__none_([YT_PlayerState_(ctx)],
		YT_PlayerState=>
			YT_PlayerState === window.YT.PlayerState.PAUSED))
export const [
	,
	YT_PlayerState__CUED_
] = be_memo_pair_(ctx=>
	nullish__none_([YT_PlayerState_(ctx)],
		YT_PlayerState=>
			YT_PlayerState === window.YT.PlayerState.CUED))
export const [
	,
	YT_PlayerState__UNSTARTED_
] = be_memo_pair_(ctx=>
	nullish__none_([YT_PlayerState_(ctx)],
		YT_PlayerState=>
			YT_PlayerState === window.YT.PlayerState.UNSTARTED))
export const [
	,
	YT_PlayerState__BUFFERING_
] = be_memo_pair_(ctx=>
	nullish__none_([YT_PlayerState_(ctx)],
		YT_PlayerState=>
			YT_PlayerState === window.YT.PlayerState.BUFFERING))
export const [
	,
	YT_videoUrl_,
	YT_videoUrl__set
] = be_sig_triple_<string|undefined>(()=>undefined)
export const [
	,
	YT_player_
] = be_memo_pair_<YT_Player|undefined>((ctx, YT_player$)=>
	nullish__none_([YT_iframe__div_(ctx)],
		YT_iframe__div=>{
			init()
			return YT_player$.val
			function init() {
				rmemo__wait(()=>YT_(ctx), YT=>YT, 10_000)
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
									YT_PlayerState__set(ctx, evt.data)
									if (YT_videoUrl_(ctx) !== _YT_player.getVideoUrl()) {
										YT_videoUrl__set(ctx, _YT_player.getVideoUrl())
									}
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
