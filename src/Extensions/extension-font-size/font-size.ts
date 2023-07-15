import "@tiptap/extension-text-style";

import { Extension } from "@tiptap/core";

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
				({ chain }) => {
					return chain().setMark("textStyle", { fontSize: fontSize }).run();
				},
			unsetFontSize:
				() =>
				({ chain }) => {
					return chain()
						.setMark("textStyle", { fontSize: null })
						.removeEmptyTextStyle()
						.run();
				},
			toggleFontSize:
				(fontSize) =>
				({ chain }) => {
					if (this.editor.isActive("textStyle", { fontSize: fontSize })) {
						return chain().focus().unsetFontSize().run();
					} else {
						return chain().focus().setFontSize(fontSize).run();
					}
				},
		};
	},
});
