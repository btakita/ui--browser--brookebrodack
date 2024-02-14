import { type YT_Player } from '@btakita/domain--browser--brookebrodack/youtube'
import { lg_px_num } from '@btakita/ui--server--brookebrodack/css'
import { browser_ctx__ensure } from '@rappstack/domain--browser/ctx'
import { calling, memo_, type memo_T, nullish__none_, rmemo__wait, sig_ } from 'ctx-core/rmemo'
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
	const reduced_motion = window.matchMedia('(prefers-reduced-motion: reduce)')
	const site__header = document.querySelector('.site__header')!
	const browser_ctx = browser_ctx__ensure()
	const content_feed = content.querySelector('#content_feed')!
	const top_half__div = content.querySelector('#top_half__div')!
	const video__div = content.querySelector<
		HTMLDivElement&{
		spinner_cause$:memo_T<unknown>
	}>('.video__div')!
	const content_feed__a_a1 = Array.from(content_feed.querySelectorAll('a'))
	const video__a$ = sig_<HTMLAnchorElement|undefined>(undefined)
	for (const content_feed__a of content_feed__a_a1) {
		(content_feed__a as HTMLAnchorElement&{ _playing$:memo_T<unknown> })._playing$ =
			calling(memo_(()=>{
				const video__a = video__a$()
				const is_current = video__a === content_feed__a
				const video_url = YT_player_(browser_ctx)?.getVideoUrl()
				content_feed__a.classList.toggle(
					'play',
					is_current
					&& video_url === content_feed__a.href
					&& YT_PlayerState__PLAYING_(browser_ctx))
				content_feed__a.classList.toggle(
					'pause',
					is_current
					&& video_url === content_feed__a.href
					&& YT_PlayerState__PAUSED_(browser_ctx))
				if (is_current && (
					YT_PlayerState_(browser_ctx) == null
					|| YT_PlayerState__UNSTARTED_(browser_ctx)
					|| YT_PlayerState__BUFFERING_(browser_ctx)
					|| YT_PlayerState__CUED_(browser_ctx)
				)) {
					spinner__attach(content_feed__a)
				} else {
					spinner__remove(content_feed__a)
				}
			}))
		content_feed__a.addEventListener('click', content_feed__a__onclick)
	}
	const video__div__animate$ = video__div__animate$_()
	const YT_iframe__animate$ = YT_iframe__animate$_()
	const top_half__div__background$ = top_half__div__background$_()
	const site_header__animate$ = site_header__animate$_()
	const site_header__img__animate$ = site_header__img__animate$_()
	video__div.spinner_cause$ = spinner_cause$_()
	function content_feed__a__onclick(evt:MouseEvent) {
		evt.stopPropagation()
		evt.preventDefault()
		const currentTarget = evt.currentTarget as HTMLAnchorElement
		const video__a = video__a$()
		if (video__a === currentTarget) {
			if (YT_PlayerState__PLAYING_(browser_ctx)) {
				YT_player_(browser_ctx)?.pauseVideo()
			} else if (YT_PlayerState__PAUSED_(browser_ctx)) {
				YT_player_(browser_ctx)?.playVideo()
			}
		} else {
			video__div__animate$()
			video__a$._ = currentTarget
			rmemo__wait(
				()=>YT_player_(browser_ctx),
				YT_player=>YT_player,
				10_000
			).then(YT_player=>{
				if (video__a$() !== currentTarget) return
				YT_player = YT_player as YT_Player
				YT_iframe__animate$()
				top_half__div__background$()
				site_header__animate$()
				site_header__img__animate$()
				YT_player.stopVideo()
				const props = JSON.parse(decodeURIComponent(currentTarget.dataset.op!))
				YT_player.loadVideoById(props)
				YT_player.playVideo()
			}).catch(err=>console.error(err))
		}
	}
	function spinner_cause$_() {
		return calling(memo_<HTMLAnchorElement|undefined>(()=>{
			if (YT_PlayerState__CUED_(browser_ctx)) {
				spinner__attach(video__div)
			} else {
				spinner__remove(video__div)
			}
			return video__a$()
		}))
	}
	function video__div__animate$_() {
		return memo_<animate_o_T|undefined>($=>{
			if (reduced_motion.matches) return
			return animate_o_($, video__div.animate([
				{ height: '0px' },
				{ height: window.innerWidth > lg_px_num ? '600px' : '50dvh' }
			], { duration: 25, fill: 'both' }))
		})
	}
	function YT_iframe__animate$_() {
		return memo_<animate_o_T|undefined>($=>{
			if (reduced_motion.matches) return
			return nullish__none_([YT_player_(browser_ctx)],
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
	}
	function top_half__div__background$_() {
		return memo_(()=>{
			if (!YT_iframe__animate$()?.done) return
			top_half__div.classList.add('sticky', 'bg-cyan-600/90')
		})
	}
	function site_header__animate$_() {
		return memo_<animate_o_T|undefined>($=>{
			// if (!YT_iframe__animate$()?.done) return
			const val = animate_o_($, site__header.animate([
				{ height: '144px' },
				{ height: '72px' },
			], { duration: 50, fill: 'forwards' }))
			val.animation.addEventListener('finish', ()=>{
				site__header.classList.remove('h-32')
			})
			return val
		})
	}
	function site_header__img__animate$_() {
		return memo_<animate_o_T|undefined>($=>{
			// if (!YT_iframe__animate$()?.done) return
			const img = site__header.querySelector('img')!
			return animate_o_($, img.animate([
				{ height: '108px', width: '108px' },
				{ height: '54px', width: `54px` },
			], { duration: 50, fill: 'forwards' }))
		})
	}
}
