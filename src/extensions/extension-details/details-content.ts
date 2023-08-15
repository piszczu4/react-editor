import { Node, mergeAttributes } from "@tiptap/react";

type DetailsContentOptions = {
	HTMLAttributes: Record<string, any>;
};

export const DetailsContent = Node.create<DetailsContentOptions>({
	name: "detailsContent",
	content: "block+",
	defining: true,
	selectable: false,

	addOptions: () => ({ HTMLAttributes: {} }),

	parseHTML() {
		return [{ tag: `div[data-type="${this.name}"]` }];
	},

	renderHTML({ HTMLAttributes }) {
		return [
			"div",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
				"data-type": this.name,
			}),
			0,
		];
	},

	addNodeView() {
		return ({ HTMLAttributes }) => {
			const dom = document.createElement("div"),
				attrs = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
					"data-type": this.name,
					hidden: "hidden",
				});
			return (
				Object.entries(attrs).forEach(([key, value]) =>
					dom.setAttribute(key, value)
				),
				dom.addEventListener("toggleDetailsContent", () => {
					dom.toggleAttribute("hidden");
				}),
				{
					dom: dom,
					contentDOM: dom,
					// ignoreMutation: (t) =>
					// 	"selection" !== t.type && (!dom.contains(t.target) || dom === t.target),
					update: (node) => node.type === this.type,
				}
			);
		};
	},
});
