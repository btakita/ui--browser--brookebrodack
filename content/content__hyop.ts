import { type YT_Player } from '@btakita/domain--browser--brookebrodack/youtube'
import { lg_px_num } from '@btakita/ui--server--brookebrodack/css'
import { browser_ctx__ensure } from '@rappstack/domain--browser/ctx'
import {
	be_,
	be_memo_pair_,
	be_sig_triple_,
	calling,
	memo_,
	type memo_T,
	nullish__none_,
	rmemo__wait
} from 'ctx-core/rmemo'
import { animate_o_, type animate_o_T } from '../animation/index.js'
import { spinner__attach, spinner__remove } from '../spinner/index.js'
import {
	YT_player_,
	YT_PlayerState_,
	YT_PlayerState__BUFFERING_,
	YT_PlayerState__CUED_,
	YT_PlayerState__PAUSED_,
	YT_PlayerState__PLAYING_,
	YT_PlayerState__UNSTARTED_
} from '../youtube/index.js'
export function content__hyop(content:HTMLDivElement) {
	const ctx = browser_ctx__ensure()
	top_half__div__set(ctx, content.querySelector('#top_half__div')!)
	video__div__set(ctx, content.querySelector<HTMLDivElement&{
		spinner_cause$:memo_T<unknown>
	}>('.video__div')!)
	const content_feed = content.querySelector('#content_feed')!
	const content_feed__a_a1 = Array.from(
		content_feed.querySelectorAll<HTMLAnchorElement&{ _icon_cause$:memo_T<unknown> }>('a'))
	for (const content_feed__a of content_feed__a_a1) {
		content_feed__a__icon_cause__ensure(content_feed__a)
	}
	function content_feed__a__icon_cause__ensure(content_feed__a:HTMLAnchorElement&{ _icon_cause$?:memo_T<unknown> }) {
		content_feed__a._icon_cause$ ??=
			calling(memo_(()=>{
				const video__a = video__a_(ctx)
				const is_current = video__a === content_feed__a
				const video_url = YT_player_(ctx)?.getVideoUrl()
				const video_searchParams = video_url ? new URL(video_url).searchParams : null
				const content_feed__a_searchParams = new URL(content_feed__a.href).searchParams
				const same_video = video_searchParams?.get('v') === content_feed__a_searchParams.get('v')
				content_feed__a.classList.toggle(
					'play',
					is_current
					&& same_video
					&& YT_PlayerState__PLAYING_(ctx))
				content_feed__a.classList.toggle(
					'pause',
					is_current
					&& same_video
					&& YT_PlayerState__PAUSED_(ctx))
				if (is_current && (
					YT_PlayerState_(ctx) == null
					|| YT_PlayerState__UNSTARTED_(ctx)
					|| YT_PlayerState__BUFFERING_(ctx)
					|| YT_PlayerState__CUED_(ctx)
				)) {
					spinner__attach(content_feed__a)
				} else {
					spinner__remove(content_feed__a)
				}
				content_feed__a.addEventListener('click', content_feed__a__onclick)
			}))
	}
	function content_feed__a__onclick(evt:MouseEvent) {
		evt.stopPropagation()
		evt.preventDefault()
		const currentTarget = evt.currentTarget as HTMLAnchorElement
		const video__a = video__a_(ctx)
		if (video__a === currentTarget) {
			if (YT_PlayerState__PLAYING_(ctx)) {
				YT_player_(ctx)?.pauseVideo()
			} else if (YT_PlayerState__PAUSED_(ctx)) {
				YT_player_(ctx)?.playVideo()
			}
		} else {
			video__div__animate_(ctx)
			site_header__animate_(ctx)
			site_header__img__animate_(ctx)
			video__a__set(ctx, currentTarget)
			rmemo__wait(
				()=>YT_player_(ctx),
				YT_player=>YT_player,
				10_000
			).then(YT_player=>{
				if (video__a_(ctx) !== currentTarget) return
				YT_player = YT_player as YT_Player
				YT_iframe__animate_(ctx)
				top_half__div__background_(ctx)
				YT_player.stopVideo()
				const props = JSON.parse(decodeURIComponent(currentTarget.dataset.op!))
				YT_player.loadVideoById(props)
				YT_player.playVideo()
			}).catch(err=>console.error(err))
		}
	}
}
const [
	,
	video__a_,
	video__a__set
] = be_sig_triple_<HTMLAnchorElement|undefined>(()=>undefined)
const [
	,
	video__div_,
	video__div__set,
] = be_sig_triple_<HTMLDivElement&{ spinner_cause$:memo_T<unknown> }|undefined>(
	()=>undefined
).add((ctx, video__div$)=>
	memo_(()=>{
		const video__div = video__div$()
		if (video__div) {
			video__div.style.height = '0'
			video__div.spinner_cause$ = spinner_cause$_(ctx)
		}
	}))
const [
	,
	site__header_,
] = be_memo_pair_(()=>document.querySelector('.site__header')!)
const [
	,
	site__header__img_,
] = be_memo_pair_(ctx=>
	site__header_(ctx).querySelector<HTMLImageElement>('img')!)
const [
	,
	top_half__div_,
	top_half__div__set
] = be_sig_triple_<Element|undefined>(()=>undefined)
const spinner_cause$_ = be_(ctx=>
	calling(memo_<HTMLAnchorElement|undefined>(()=>
		nullish__none_([video__div_(ctx)],
			video__div=>{
				if (YT_PlayerState__CUED_(ctx)) {
					spinner__attach(video__div)
				} else {
					spinner__remove(video__div)
				}
				return video__a_(ctx)
			}))))
const [
	,
	video__div__animate_
] = be_memo_pair_<animate_o_T|undefined>((ctx, $)=>{
	if (reduced_motion_(ctx)) return
	return nullish__none_([video__div_(ctx)],
		video__div=>{
			return animate_o_($, video__div.animate([
				{ height: '0px' },
				{ height: window.innerWidth > lg_px_num ? '600px' : '50dvh' }
			], { duration: 25, fill: 'both' }))
		})
})
const [
	,
	YT_iframe__animate_
] = be_memo_pair_<animate_o_T|undefined>((ctx, $)=>{
	if (reduced_motion_(ctx)) return
	return nullish__none_([YT_player_(ctx)],
		YT_player=>{
			YT_player.getIframe().classList.remove('hidden')
			const val = {
				animation: YT_player.getIframe().animate([
					{ transform: 'scale(0)' },
					{ transform: 'scale(1)' },
				], { duration: 50, fill: 'forwards' }),
				done: false
			}
			val.animation.addEventListener('finish', ()=>{
				$._ = { ...$()!, done: true }
			})
			return $.val
		})
})
const [
	,
	top_half__div__background_
] = be_memo_pair_(ctx=>{
	if (!YT_iframe__animate_(ctx)?.done) return
	return nullish__none_([top_half__div_(ctx)],
		top_half__div=>
			top_half__div.classList.add('sticky', 'bg-cyan-600/90'))
})
const [
	,
	site_header__animate_
] = be_memo_pair_<animate_o_T|undefined>((ctx, $)=>{
	if (reduced_motion_(ctx)) return
	const val = animate_o_($, site__header_(ctx).animate([
		{ height: '144px' },
		{ height: '72px' },
	], { duration: 25, fill: 'forwards' }))
	val.animation.addEventListener('finish', ()=>{
		site__header_(ctx).classList.remove('h-32')
	})
	return val
})
const [
	,
	site_header__img__animate_,
] = be_memo_pair_<animate_o_T|undefined>((ctx, $)=>{
	if (reduced_motion_(ctx)) return
	return animate_o_($, site__header__img_(ctx).animate([
		{ height: '108px', width: '108px' },
		{ height: '54px', width: `54px` },
	], { duration: 25, fill: 'forwards' }))
})
const [
	,
	reduced_motion_
] = be_memo_pair_(()=>
	window.matchMedia('(prefers-reduced-motion: reduce)').matches)
