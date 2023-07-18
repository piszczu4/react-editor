import "@tiptap/extension-text-style";

import { Extension } from "@tiptap/core";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		codeIndent: {
			/**
			 * Code Indent
			 */
			codeIndentV2: () => ReturnType;
			codeOutdentV2: () => ReturnType;
		};
	}
}

export const CodeIndentV2 = Extension.create({
	name: "capitalize",

	addCommands() {
		return {
			codeIndentV2:
				() =>
				({ tr, state, editor, dispatch }) => {
					if (editor.isActive("codeBlock")) {
						return editor.commands.insertContent("    ");
					}
					return false;
				},
			codeOutdentV2:
				() =>
				({ tr, state, editor, dispatch }) => {
					if (editor.isActive("codeBlock")) {
						if (state.selection.empty) {
							let pos = this.editor.state.selection.from;
							let fragment = state.doc.cut(pos - 4, pos).textContent;
							if (fragment === "    ") {
								return this.editor.commands.command(({ tr }) => {
									tr.deleteRange(pos - 4, pos);
									return true;
								});
							}
						}
					}
					return false;
				},
		};
	},
	addKeyboardShortcuts() {
		return {
			Tab: () => this.editor.commands.codeIndentV2(),
			Backspace: () => this.editor.commands.codeOutdentV2(),
			"Shift-Tab": () => this.editor.commands.codeOutdentV2(),
		};
	},
});
