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
	type nullish,
	nullish__none_,
	ref__bind,
	rmemo__wait,
	tup,
	type wide_ctx_T
} from 'ctx-core/rmemo'
import { wanimato__new, type wanimato_T } from 'ctx-core/web_animation'
import { spinner__attach, spinner__remove } from '../../spinner/index.js'
import {
	YT_player_,
	YT_PlayerState_,
	YT_PlayerState__BUFFERING_,
	YT_PlayerState__CUED_,
	YT_PlayerState__PAUSED_,
	YT_PlayerState__PLAYING_,
	YT_PlayerState__UNSTARTED_,
} from '../../youtube/index.js'
export function content__hyop(content:HTMLElement) {
	content__set(browser_ctx__ensure(), content)
	window.addEventListener('keydown', evt=>{
		if (evt.key === 'Escape') {
			video__div__close(browser_ctx__ensure())
				.catch(err=>console.error(err))
		}
	})
}
export function content_feed__a__hyop(content_feed__a:HTMLAnchorElement) {
	const ctx = browser_ctx__ensure()
	content_feed__a__icon_cause__ensure(content_feed__a)
	/** @see {content__hyop} */
	function content_feed__a__icon_cause__ensure(content_feed__a:HTMLAnchorElement) {
		ref__bind(content_feed__a, calling(memo_(()=>{
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
		})))
	}
	/** @see {content_feed__a__icon_cause__ensure} */
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
			video__div__open(ctx).catch(err=>console.error(err))
			video__a__set(ctx, currentTarget)
			content_feed__a__onclick__YT_player__run()
				.catch(err=>console.error(err))
		}
		/** @see {content_feed__a__onclick} */
		function content_feed__a__onclick__YT_player__run() {
			return rmemo__wait(
				()=>YT_player_(ctx),
				YT_player=>YT_player,
				10_000
			).then(YT_player=>{
				if (video__a_(ctx) !== currentTarget) return
				YT_player = YT_player as YT_Player
				YT_iframe__wanimato_(ctx)
				site__header_video__div__background_(ctx)
				YT_player.stopVideo()
				const props = JSON.parse(decodeURIComponent(currentTarget.dataset.op!))
				YT_player.loadVideoById(props)
				YT_player.playVideo()
			})
		}
	}
}
export function content__back_link__a__hyop(back_link__a:HTMLAnchorElement) {
	back_link__a__set(browser_ctx__ensure(), back_link__a)
}
export function content__video__div__hyop(video__div:HTMLElement) {
	video__div__set(browser_ctx__ensure(), <video__div_T>video__div)
}
export function content__video_close__div__hyop(video_close__div:HTMLElement) {
	video_close__div__set(browser_ctx__ensure(), <video_close__div_T>video_close__div)
}
export function content__site__header__hyop(site__header:HTMLElement) {
	site__header__set(browser_ctx__ensure(), site__header)
}
const [
	,
	/** @see {content_feed__a__icon_cause__ensure} */
	/** @see {content_feed__a__onclick} */
	/** @see {content_feed__a__onclick__YT_player__run} */
	video__a_,
	/** @see {content_feed__a__onclick} */
	video__a__set
] = be_sig_triple_<HTMLAnchorElement|nullish>(()=>undefined)
const [
	,
	/** @see {video__div_} */
	content_,
	/** @see {content__hyop} */
	content__set,
] = be_sig_triple_<HTMLElement|undefined>(
	()=>undefined,
	[
		ctx=>memo_(()=>{
			video__div_(ctx)
		})
	])
const [
	,
	back_link__a_,
	back_link__a__set,
] = be_sig_triple_<HTMLAnchorElement>(()=>undefined!)
const [
	,
	back_link__a__svg_
] = be_memo_pair_(ctx=>
	back_link__a_(ctx).querySelector<SVGSVGElement>('svg')!)
const [
	,
	/** @see {video__div__wanimato_} */
	video__div_,
	video__div__set,
] = be_sig_triple_<video__div_T>(
	()=>undefined!,
	[
		(ctx, video__div$)=>
			memo_(()=>{
				const video__div = video__div$()
				if (video__div) {
					video__div.style.height = '0'
					video__div.spinner_cause$ = spinner_cause$_(ctx)
				}
			})
	])
const [
	,
	,
	video_close__div__set
] = be_sig_triple_<video_close__div_T|undefined>(
	()=>undefined,
	[
		(ctx, video_close__div$)=>memo_<video_close__div_T|undefined>($=>
			nullish__none_([video_close__div$()], video_close__div=>{
				$.val?.removeEventListener('click', video_close__div__onclick)
				video_close__div.addEventListener('click', video_close__div__onclick)
				return video_close__div
			})
		),
		(ctx, video_close__div$)=>memo_(()=>
			nullish__none_([video_close__div$()], video_close__div=>{
				video_close__div.classList.toggle('block', video__div__is_open_(ctx))
				video_close__div.classList.toggle('hidden', !video__div__is_open_(ctx))
			}))
	])
function video_close__div__onclick() {
	const ctx = browser_ctx__ensure()
	video__div__close(ctx).catch(err=>console.error(err))
}
const [
	,
	/** @see {site__header__img_} */
	/** @see {site__header__wanimato_} */
	site__header_,
	site__header__set,
] = be_sig_triple_<HTMLElement>(()=>undefined!)
const [
	,
	/** @see {site_header__img__wanimato_} */
	site__header__img_,
] = be_memo_pair_(ctx=>
	site__header_(ctx).querySelector<HTMLImageElement>('img')!)
const spinner_cause$_ = be_(ctx=>
	calling(memo_(()=>{
		nullish__none_([video__div_(ctx)],
			video__div=>{
				if (video__a_(ctx) && YT_PlayerState__CUED_(ctx)) {
					spinner__attach(video__div)
				} else {
					spinner__remove(video__div)
				}
				return video__a_(ctx)
			})
	})))
function video__div__animation_height_() {
	return (
		window.innerWidth > lg_px_num
			? '600px'
			: screen.orientation.type === 'landscape-primary'
				? '100dvh'
				: '50dvh'
	)
}
const [
	,
	video__div__is_open_,
	video__div__is_open__set
] = be_sig_triple_(()=>false)
async function video__div__open(ctx:wide_ctx_T) {
	video__div__is_open__set(ctx, true)
	const video__div__wanimato = video__div__wanimato_(ctx)
	await video__div__wanimato?.animation.ready
	if (video__div__wanimato && !video__div__wanimato?.finish_currentTime) {
		video__div__wanimato_(ctx)?.animation.play()
		YT_iframe__wanimato_(ctx)?.animation.play()
		site__header__wanimato_(ctx)?.animation.play()
		site_header__img__wanimato_(ctx)?.animation.play()
	}
}
async function video__div__close(ctx:wide_ctx_T) {
	video__a__set(ctx, null)
	YT_player_(ctx)?.stopVideo()
	video__div__is_open__set(ctx, false)
	await video__div__wanimato_(ctx)?.animation.ready
	if (video__div__wanimato_(ctx)?.finish_currentTime) {
		video__div__wanimato_(ctx)?.animation.reverse()
		YT_iframe__wanimato_(ctx)?.animation.reverse()
		site__header__wanimato_(ctx)?.animation.reverse()
		site_header__img__wanimato_(ctx)?.animation.reverse()
	}
	(<HTMLElement>document.activeElement)?.blur()
}
const [
	,
	/** @see {video__div__open} */
	/** @see {video__div__close} */
	video__div__wanimato_
] = be_memo_pair_<wanimato_T|nullish>((ctx, $)=>{
	if (reduced_motion_(ctx)) return
	return nullish__none_([video__div_(ctx)], video__div=>
		wanimato__new($, video__div, ()=>video__div.animate([
			{ height: '0px' },
			{ height: video__div__animation_height_() }
		], { duration: 25, fill: 'both' })))
}, [
	(ctx, video__div__wanimato$)=>
		memo_(()=>{
			content_(ctx)?.classList.toggle('z-20',
				!!(video__div__wanimato$()?.is_finish && video__div__wanimato$()?.finish_currentTime))
			content_(ctx)?.classList.toggle('z-10',
				!(video__div__wanimato$()?.is_finish && video__div__wanimato$()?.finish_currentTime))
		})
])
const [
	,
	/** @see {content_feed__a__onclick__YT_player__run} */
	YT_iframe__wanimato_
] = be_memo_pair_<wanimato_T|nullish>((ctx, $)=>{
	if (reduced_motion_(ctx)) return
	return nullish__none_([YT_player_(ctx)], YT_player=>
		wanimato__new($, YT_player.getIframe(), iframe=>
			iframe.animate([
				{ transform: 'scale(0)' },
				{ transform: 'scale(1)' },
			], { duration: 50, fill: 'forwards' })))
}, [
	(ctx, YT_iframe__wanimato$)=>memo_(()=>
		nullish__none_([YT_iframe__wanimato$()], YT_iframe__wanimato=>
			YT_iframe__wanimato.animation.ready.then(()=>{
				YT_iframe__wanimato.el.classList.toggle('hidden',
					!YT_iframe__wanimato.finish_currentTime)
			})))
])
const [
	,
	/** @see {content_feed__a__onclick__YT_player__run} */
	site__header_video__div__background_
] = be_memo_pair_(ctx=>
	nullish__none_(tup(
		content_(ctx),
		site__header_(ctx),
		video__div_(ctx),
		YT_iframe__wanimato_(ctx)
	), (content, site__header, video__div, YT_iframe__wanimato)=>{
		const is_end_state = YT_iframe__wanimato.is_finish && !!YT_iframe__wanimato.finish_currentTime
		site__header.classList.toggle('bg-cyan-600/90', is_end_state)
		site__header.classList.toggle('text-white', is_end_state)
		back_link__a__svg_(ctx).classList.toggle('!stroke-white', is_end_state)
		video__div.classList.toggle('sticky', is_end_state)
		video__div.classList.toggle('bg-cyan-600/90', is_end_state)
		video__div.classList.toggle('border-b-1px', is_end_state)
		video__div.classList.toggle('border-white/.3', is_end_state)
		video__div.classList.toggle('shadow-md', is_end_state)
	}))
const [
	,
	/** @see {content_feed__a__onclick} */
	site__header__wanimato_
] = be_memo_pair_<wanimato_T|nullish>((ctx, $)=>{
	if (reduced_motion_(ctx)) return
	return wanimato__new(
		$,
		site__header_(ctx),
		site__header=>site__header.animate([
			{ height: '144px' },
			{ height: '72px' },
		], { duration: 25, fill: 'both' }))
}, [
	(ctx, site__header__wanimato$)=>memo_(()=>{
		site__header_(ctx).classList.toggle(
			'h-32',
			!site__header__wanimato$()?.is_finish
			|| !site__header__wanimato$()?.finish_currentTime)
	})
])
const [
	,
	/** @see {content_feed__a__onclick} */
	site_header__img__wanimato_,
] = be_memo_pair_<wanimato_T|nullish>((ctx, $)=>{
	if (reduced_motion_(ctx)) return
	return wanimato__new(
		$,
		site__header__img_(ctx),
		site__header__img=>site__header__img.animate([
			{ height: '108px', width: '108px' },
			{ height: '54px', width: `54px` },
		], { duration: 25, fill: 'both' }))
})
const [
	,
	/** @see {video__div__wanimato_} */
	/** @see {YT_iframe__wanimato_} */
	/** @see {site__header__wanimato_} */
	/** @see {site_header__img__wanimato_} */
	reduced_motion_
] = be_memo_pair_(()=>
	window.matchMedia('(prefers-reduced-motion: reduce)').matches)
type video__div_T = HTMLDivElement&{ spinner_cause$:memo_T<void> }
type video_close__div_T = HTMLDivElement&{ visible$:memo_T<unknown> }
