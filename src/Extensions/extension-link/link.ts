import { Link as TiptapLink } from "@tiptap/extension-link";

import { TextSelection } from "@tiptap/pm/state";
import { getMarkRange } from "@tiptap/react";

export const Link = TiptapLink.extend({
	addCommands() {
		return {
			...this.parent?.(),
			unsetLink:
				() =>
				({ editor, chain }) => {
					let pos = editor.state.selection.$anchor.pos;
					const range = getMarkRange(
						editor.state.doc.resolve(pos),
						editor.schema.marks.link
					);

					if (!range) return false;

					const $start = editor.state.doc.resolve(range.from);
					const $end = editor.state.doc.resolve(range.to);

					return chain()
						.unsetMark(this.name, { extendEmptyMarkRange: true })
						.setMeta("preventAutolink", true)
						.setTextSelection(new TextSelection($start, $end))
						.run();
				},
		};
	},
});
