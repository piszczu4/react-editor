import { Node, mergeAttributes } from "@tiptap/react";

type DetailsSummaryOptions = {
	HTMLAttributes: Record<string, any>;
};

export const DetailsSummary = Node.create<DetailsSummaryOptions>({
	name: "detailsSummary",
	content: "paragraph*",
	defining: true,
	selectable: false,
	isolating: true,

	parseHTML() {
		return [
			{
				tag: "summary",
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return [
			"summary",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
			0,
		];
	},
});
