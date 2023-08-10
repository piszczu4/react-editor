import { mergeAttributes, Node } from "@tiptap/core";

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

	addAttributes() {
		return {
			caption: {
				default: true,
				renderHTML: (attributes) => ({
					"data-caption": attributes["caption"],
				}),
				parseHTML: (element: HTMLElement) =>
					element.getAttribute("data-caption"),
			},
		};
	},

	isolating: true,
	selectable: false,

	parseHTML() {
		return [
			{
				tag: "figcaption",
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		let attrs = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes);
		return ["figcaption", attrs, 0];
	},
});
