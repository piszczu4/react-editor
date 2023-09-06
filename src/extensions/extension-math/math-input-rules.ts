import { InputRule } from "@tiptap/pm/inputrules";
import { NodeType } from "@tiptap/pm/model";
import { NodeSelection } from "@tiptap/pm/state";

export function makeInlineMathInputRule(
	pattern: RegExp,
	nodeType: NodeType,
	getAttrs?: any
) {
	return new InputRule(pattern, (state, match, start, end) => {
		let $start = state.doc.resolve(start);
		let index = $start.index();
		let $end = state.doc.resolve(end);
		// get attrs
		let attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs;
		// check if replacement valid
		if (!$start.parent.canReplaceWith(index, $end.index(), nodeType)) {
			return null;
		}
		// perform replacement
		return state.tr.replaceRangeWith(
			start,
			end,
			nodeType.create(attrs, nodeType.schema.text(match[1]))
		);
	});
}

export function makeBlockMathInputRule(
	pattern: RegExp,
	nodeType: NodeType,
	getAttrs?: any
) {
	return new InputRule(pattern, (state, match, start, end) => {
		let $start = state.doc.resolve(start);
		let attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs;
		if (
			!$start
				.node(-1)
				.canReplaceWith($start.index(-1), $start.indexAfter(-1), nodeType)
		)
			return null;
		let tr = state.tr
			.delete(start, end)
			.setBlockType(start, start, nodeType, attrs);
		return tr.setSelection(
			NodeSelection.create(tr.doc, tr.mapping.map($start.pos - 1))
		);
	});
}
