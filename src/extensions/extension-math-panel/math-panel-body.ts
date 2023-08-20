import { mergeAttributes, Node } from "@tiptap/core";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		mathPanelBody: {};
	}
}

export interface MathPanelBodyOptions {
	HTMLAttributes: Record<string, any>;
}

export const MathPanelBody = Node.create<MathPanelBodyOptions>({
	name: "mathPanelBody",

	inline: false,

	group: "block",

	draggable: false,

	content: "block+",

	code: true,

	selectable: true,

	addOptions() {
		return {
			HTMLAttributes: { class: "mw-math-panel--body" },
		};
	},

	parseHTML() {
		return [
			{
				tag: "div.mw-math-panel--body",
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return [
			"div",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
			0,
		];
	},
});
