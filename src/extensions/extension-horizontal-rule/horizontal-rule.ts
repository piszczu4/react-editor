import { HorizontalRule as TiptapHorizontalRule } from "@tiptap/extension-horizontal-rule";

export const HorizontalRule = TiptapHorizontalRule.extend({
	addKeyboardShortcuts() {
		return {
			"Mod-r": () => this.editor.commands.setHorizontalRule(),
		};
	},

	draggable: true,
});
