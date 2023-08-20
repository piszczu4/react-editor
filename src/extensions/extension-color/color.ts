import { Color as TiptapColor } from "@tiptap/extension-color";

export const Color = TiptapColor.extend({
	addStorage() {
		return {
			lastColor: "black",
		};
	},

	addKeyboardShortcuts() {
		return {
			"Alt-c": () =>
				this.editor.commands.setColor(this.editor.storage.color.lastColor),
		};
	},
});
