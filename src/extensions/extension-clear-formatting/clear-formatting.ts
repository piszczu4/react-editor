import { Extension } from "@tiptap/react";

export const ClearFormatting = Extension.create({
	addKeyboardShortcuts() {
		return {
			"Mod-Shift-C": () => this.editor.commands.unsetAllMarks(),
		};
	},
});
