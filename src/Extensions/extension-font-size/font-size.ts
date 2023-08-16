import "@tiptap/extension-text-style";

import { Extension } from "@tiptap/core";
import { Editor } from "@tiptap/core";
import { getFontSize } from ".";

export type FontSizeOptions = {
	types: string[];
};

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		fontSize: {
			/**
			 * Set the font family
			 */
			setFontSize: (fontSize: number) => ReturnType;
			/**
			 * Unset the font family
			 */
			unsetFontSize: () => ReturnType;
			toggleFontSize: (fontSize: number) => ReturnType;
			getFontSize: () => ReturnType;
		};
	}
}

export const FontSize = Extension.create<FontSizeOptions>({
	name: "fontSize",

	addOptions() {
		return {
			types: ["textStyle"],
		};
	},

	addGlobalAttributes() {
		return [
			{
				types: this.options.types,
				attributes: {
					fontSize: {
						default: null,
						parseHTML: (element) =>
							element.style.fontSize?.replace(/['"]+/g, ""),
						renderHTML: (attributes) => {
							if (!attributes.fontSize) {
								return {};
							}

							return {
								style: `font-size: ${attributes.fontSize}px`,
							};
						},
					},
				},
			},
		];
	},

	addCommands() {
		return {
			setFontSize:
				(fontSize) =>
				({ commands }) => {
					return commands.setMark("textStyle", { fontSize: fontSize });
				},
			unsetFontSize:
				() =>
				({ commands }) => {
					return commands.setMark("textStyle", { fontSize: null });
					// .removeEmptyTextStyle();
				},
			toggleFontSize:
				(fontSize) =>
				({ commands }) => {
					if (this.editor.isActive("textStyle", { fontSize: fontSize })) {
						return commands.unsetFontSize();
					} else {
						return commands.setFontSize(fontSize);
					}
				},
		};
	},

	addKeyboardShortcuts() {
		return {
			"Mod-Shift-+": () => {
				let fontSize = getFontSize(this.editor);
				return this.editor.commands.setFontSize(fontSize + 1);
			},
			"Mod-Shift--": () => {
				let fontSize = getFontSize(this.editor);
				return this.editor.commands.setFontSize(fontSize - 1);
			},
		};
	},
});
