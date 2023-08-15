import { CodeBlock as TiptapCodeBlock } from "@tiptap/extension-code-block";

export const CodeBlock = TiptapCodeBlock.extend({
	addKeyboardShortcuts() {
		return {
			"Mod-Shift-M": () => this.editor.commands.toggleCodeBlock(),
		};
	},
});
