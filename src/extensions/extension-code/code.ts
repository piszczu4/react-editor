import { Code as TiptapCode } from "@tiptap/extension-code";

export const Code = TiptapCode.extend({
	addKeyboardShortcuts() {
		return {
			"Mod-Shift-K": () => this.editor.commands.toggleCode(),
		};
	},
});
