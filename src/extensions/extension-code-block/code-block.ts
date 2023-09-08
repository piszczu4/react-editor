import { CodeBlockLowlight as TiptapCodeBlock } from "@tiptap/extension-code-block-lowlight";
import { mergeAttributes } from "@tiptap/react";

export const CodeBlock = TiptapCodeBlock.extend({
	addKeyboardShortcuts() {
		return {
			...this.parent?.(),
			"Mod-Shift-M": () => this.editor.commands.toggleCodeBlock(),
		};
	},

	// renderHTML({ node, HTMLAttributes }) {
	// 	return [
	// 		"pre",
	// 		mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
	// 		[
	// 			"code",
	// 			{
	// 				class: node.attrs.language
	// 					? this.options.languageClassPrefix + node.attrs.language
	// 					: null,
	// 			},
	// 			this.options.lowlight.highlightAuto(node.textContent),
	// 		],
	// 	];
	// },
});
