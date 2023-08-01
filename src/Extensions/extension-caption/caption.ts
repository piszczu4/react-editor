import { mergeAttributes, Node, nodeInputRule } from "@tiptap/core";

export interface CaptionOptions {
	// inline: boolean, // we have floating support, so block is good enough
	// allowBase64: boolean, // we're not going to allow this
	HTMLAttributes: Record<string, any>;
}

export const Caption = Node.create<CaptionOptions>({
	name: "caption",
	content: "paragraph",

	addOptions() {
		return {
			inline: false,
			allowBase64: false,
			HTMLAttributes: {},
		};
	},

	isolating: true,
	selectable: false,

	parseHTML() {
		return [
			{
				tag: "figcaption[data-caption]",
			},
		];
	},

	renderHTML() {
		const attrs: Record<string, string> = {
			"data-caption": "true",
		};

		return ["figcaption", attrs, 0];
	},
});
