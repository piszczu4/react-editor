import { mergeAttributes, Node } from "@tiptap/core";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		mathPanelBody: {};
	}
}

export interface MathPanelBodyOptions {
	HTMLAttributes: Record<string, any>;
}

export const MathPanelBodyV2 = Node.create<MathPanelBodyOptions>({
	name: "mathPanelBodyV2",

	inline: false,

	group: "block",

	draggable: false,

	content: "block+",

	code: true,

	selectable: true,

	addOptions() {
		return {
			HTMLAttributes: { class: "mw-math-panel-v2--body" },
		};
	},

	parseHTML() {
		return [
			{
				tag: "div.mw-math-panel-v2--body",
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
