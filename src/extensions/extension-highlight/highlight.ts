// import { Highlight as TiptapHighlight } from "@tiptap/extension-highlight";

// export const Highlight = TiptapHighlight.extend({
// 	addStorage() {
// 		return {
// 			lastColor: "black",
// 		};
// 	},

// 	addKeyboardShortcuts() {
// 		return {
// 			"Alt-h": () =>
// 				this.editor.commands.setHighlight({
// 					color: this.editor.storage.highlight.lastColor,
// 				}),
// 		};
// 	},
// });

import { Extension } from "@tiptap/react";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		strike: {
			/**
			 * Set a strike mark
			 */
			setHighlight: (color: string) => ReturnType;
			/**
			 * Unset a strike mark
			 */
			unsetHighlight: () => ReturnType;
		};
	}
}

export const Highlight = Extension.create({
	name: "highlight",
	addOptions() {
		return {
			types: ["textStyle"],
		};
	},

	addStorage() {
		return {
			lastColor: "black",
		};
	},

	addGlobalAttributes() {
		return [
			{
				types: this.options.types,
				attributes: {
					highlight: {
						default: null,
						parseHTML: (element) => {
							var color = element.style.backgroundColor;
							return color;
						},
						renderHTML: (attributes) => {
							if (!attributes.highlight) {
								return {};
							}
							return {
								style: `background-color: ${attributes.highlight}`,
							};
						},
					},
				},
			},
		];
	},
	addCommands() {
		return {
			setHighlight:
				(color) =>
				({ chain }) => {
					return chain().setMark("textStyle", { highlight: color }).run();
				},
			unsetHighlight:
				() =>
				({ chain }) => {
					return chain()
						.setMark("textStyle", { highlight: null })
						.removeEmptyTextStyle()
						.run();
				},
		};
	},

	addKeyboardShortcuts() {
		return {
			"Alt-h": () =>
				this.editor.commands.setHighlight(
					this.editor.storage.highlight.lastColor
				),
		};
	},
});
