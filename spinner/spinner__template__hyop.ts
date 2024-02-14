import { browser_ctx__ensure } from '@rappstack/domain--browser/ctx'
import { be_memo_pair_, be_sig_triple_ } from 'ctx-core/rmemo'
export function spinner__template__hyop(spinner__template:HTMLTemplateElement) {
	spinner__template__set(browser_ctx__ensure(), spinner__template)
}
const [,
	spinner__template_,
	spinner__template__set
] = be_sig_triple_<HTMLTemplateElement|undefined>(()=>undefined)
const [
	,
	parent_M_spinner_,
] = be_memo_pair_(()=>new WeakMap<Element, Element>)
export function spinner__attach(parent:Element) {
	const browser_ctx = browser_ctx__ensure()
	const spinner__template = spinner__template_(browser_ctx)
	if (spinner__template) {
		const spinner__fragment = spinner__template.content.cloneNode(true) as Element
		parent_M_spinner_(browser_ctx).get(parent)?.remove?.()
		parent_M_spinner_(browser_ctx).set(parent, spinner__fragment.childNodes[0] as Element)
		return parent.appendChild(spinner__fragment.childNodes[0])
	}
}
export function spinner__remove(parent:Element) {
	const spinner = parent_M_spinner_(browser_ctx__ensure()).get(parent)
	if (spinner) {
		spinner.remove()
		parent_M_spinner_(browser_ctx__ensure()).delete(parent)
	}
}
