import { TableCell as TiptapTableCell } from "@tiptap/extension-table-cell";

export const TableCell = TiptapTableCell.extend({
	addStorage() {
		return {
			lastBgColor: "#f4f5f7",
			lastBorderColor: "#ced4da",
			lastBorderWidth: 1,
			lastBorderType: "solid",
		};
	},

	addAttributes() {
		return {
			...this.parent?.(),
			backgroundColor: {
				default: null,
				renderHTML: (attributes) => {
					if (!attributes.backgroundColor) return {};
					return {
						style: `background-color: ${attributes.backgroundColor}`,
						"data-background-color": attributes.backgroundColor,
					};
				},
				parseHTML: (element) => element.getAttribute("data-background-color"),
			},
			borderBottom: {
				default: null,
				renderHTML: (attributes) => {
					if (!attributes.borderBottom) return {};
					return {
						style: `border-bottom: ${attributes.borderBottom}`,
						"data-border-bottom": attributes.borderBottom,
					};
				},
				parseHTML: (element) => element.getAttribute("data-border-bottom"),
			},
			borderTop: {
				default: null,
				renderHTML: (attributes) => {
					if (!attributes.borderTop) return {};
					return {
						style: `border-top: ${attributes.borderTop}`,
						"data-border-top": attributes.borderTop,
					};
				},
				parseHTML: (element) => element.getAttribute("data-border-top"),
			},
			borderLeft: {
				default: null,
				renderHTML: (attributes) => {
					if (!attributes.borderLeft) return {};
					return {
						style: `border-left: ${attributes.borderLeft}`,
						"data-border-left": attributes.borderLeft,
					};
				},
				parseHTML: (element) => element.getAttribute("data-border-left"),
			},
			borderRight: {
				default: null,
				renderHTML: (attributes) => {
					if (!attributes.borderRight) return {};
					return {
						style: `border-right: ${attributes.borderRight}`,
						"data-border-right": attributes.borderRight,
					};
				},
				parseHTML: (element) => element.getAttribute("data-border-right"),
			},
		};
	},
});
