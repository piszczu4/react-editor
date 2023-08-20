import { Highlight as TiptapHighlight } from "@tiptap/extension-highlight";

export const Highlight = TiptapHighlight.extend({
	addStorage() {
		return {
			lastColor: "black",
		};
	},

	addKeyboardShortcuts() {
		return {
			"Alt-h": () =>
				this.editor.commands.setHighlight({
					color: this.editor.storage.highlight.lastColor,
				}),
		};
	},
});
