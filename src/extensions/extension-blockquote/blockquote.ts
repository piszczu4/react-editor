import { Blockquote as TiptapBlockquote } from "@tiptap/extension-blockquote";

export const Blockquote = TiptapBlockquote.extend({
	addKeyboardShortcuts() {
		return {
			"Mod-q": () => this.editor.commands.toggleBlockquote(),
		};
	},
});
