import { browser_ctx__ensure } from '@rappstack/domain--browser/ctx'
import { calling, memo_, nullish__none_, rmemo__wait } from 'ctx-core/rmemo'
import { type animation_o_T } from '../animation/index.js'
import { spinner__attach, spinner__remove } from '../spinner/index.js'
import { YT_player$_, YT_player_ } from '../youtube/index.js'
export function content__hyop(content:HTMLDivElement) {
	const browser_ctx = browser_ctx__ensure()
	const content_feed = content.querySelector('#content_feed')!
	const YT_player__div = content.querySelector('.YT_player__div')!
	const content_feed__a_a1 = Array.from(content_feed.querySelectorAll('a'))
	for (const content_feed__a of content_feed__a_a1) {
		content_feed__a.addEventListener('click', content_feed__a__onclick)
	}
	function content_feed__a__onclick(evt:MouseEvent) {
		evt.stopPropagation()
		evt.preventDefault()
		spinner__attach(YT_player__div)
		YT_iframe__animation$_()
		rmemo__wait(
			YT_player$_(browser_ctx),
			YT_player=>{
				console.debug('content_feed__a__onclick|rmemo__wait|debug|1', {
					YT_player
				})
				return YT_player
			},
			5000
		).then(YT_player=>{
			console.debug('content_feed__a__onclick|debug|0', { YT_player })
			if (!YT_player) return
			YT_player.stopVideo()
			const target = evt.target as HTMLAnchorElement
			const props = JSON.parse(target.dataset.op!)
			console.debug('content_feed__a__onclick|debug|1', {
				props
			})
			YT_player.loadVideoById(props)
			YT_player.playVideo()
			spinner__remove(YT_player__div)
		}).catch(err=>console.error(err))
	}
	function YT_iframe__animation$_() {
		console.debug('YT_iframe__animation$_|debug|0')
		return calling(memo_<animation_o_T|undefined>($=>
			nullish__none_([YT_player_(browser_ctx)],
				YT_player=>{
					console.debug('YT_iframe__animation$|debug|1')
					YT_player.getIframe().classList.remove('hidden')
					const val = {
						animation: YT_player.getIframe().animate([
							{ transform: 'scale(0)' },
							{ transform: 'scale(1)' },
						], { duration: 100, fill: 'forwards' }),
						done: false
					}
					val.animation.addEventListener('finish', ()=>{
						$._ = {
							...$()!,
							done: true
						}
					})
					return $.val
				})))
	}
}
