import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { createTable } from "@tiptap/extension-table";
import { findClosestNode, findNode } from "../../utils";
import { createNodeFromContent, JSONContent } from "@tiptap/react";
import { FigureNodeView } from "./FigureNodeView";
import { Node as PMNode } from "@tiptap/pm/model";
import { _t } from "../../helpers/strings";
import { NodeSelection, TextSelection } from "@tiptap/pm/state";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		figure: {
			setImageFigure: (options: {
				src?: string;
				alt?: string;
				width?: string;
				height?: string;
				dataAlign?: string;
				dataFloat?: string;
				caption?: boolean;
			}) => ReturnType;
			setTableFigure: (options: { rows: number; cols: number }) => ReturnType;
			setVideoFigure: (options: {
				src: string;
				width: string;
				height?: string;
			}) => ReturnType;

			toggleCaption: () => ReturnType;
		};
	}
}

export interface FigureOptions {
	HTMLAttributes: Record<string, any>;
}

export const Figure = Node.create<FigureOptions>({
	name: "figure",

	addOptions() {
		return {
			inline: false,
			allowBase64: false,
			HTMLAttributes: {},
		};
	},

	inline: false,

	group: "block",

	draggable: true,

	content: "(image|table|iframe) caption?",

	selectable: true,

	addAttributes() {
		return {
			type: {
				default: null,
				parseHTML: (element) => element.getAttribute("data-type"),
				renderHTML: (attributes) => {
					return { "data-type": attributes.type };
				},
			},
			// src: {
			// 	default: null,
			// 	renderHTML: (attributes) => ({
			// 		src: attributes.src,
			// 	}),
			// 	parseHTML: (element: HTMLImageElement) => element.src,
			// },
			alt: {
				default: null,
				parseHTML: (element: HTMLElement) => element.getAttribute("alt"),
			},
			// title: {
			// 	default: null,
			// 	parseHTML: (element: HTMLElement) => element.getAttribute("title"),
			// },
			width: {
				default: null,
				parseHTML: (element: HTMLElement) => element.getAttribute("width"),
			},
			height: {
				default: "auto",
				parseHTML: (element: HTMLElement) => element.getAttribute("height"),
			},
			dataAlign: {
				default: "center", // 'left' | 'center' | 'right'
				parseHTML: (element: HTMLElement) => element.getAttribute("data-align"),
				renderHTML: (attributes) => {
					return { "data-align": attributes.dataAlign };
				},
			},
			dataFloat: {
				default: null, // 'left' | 'right'
				parseHTML: (element: HTMLElement) => element.getAttribute("data-float"),
				renderHTML: (attributes) => {
					return { "data-float": attributes.dataFloat };
				},
			},
			caption: {
				default: false,
				parseHTML: (element: HTMLElement) =>
					element.getAttribute("data-caption"),
				renderHTML: (attributes) => {
					return { "data-caption": attributes.caption };
				},
			},
		};
	},

	parseHTML() {
		return [
			{
				tag: "figure",
			},
		];
	},

	renderHTML({ node, HTMLAttributes }) {
		let dom = document.createElement("figure");
		let contentDOM = document.createElement("div");

		let { type, width, caption, dataAlign, dataFloat } = node.attrs;
		let mediaWidth;
		let isMediaWidthInPx;
		let isWidthInPercentages = typeof width === "string" && width.endsWith("%");

		if (type === "image" || type === "iframe") {
			mediaWidth = this.editor?.getAttributes(type)["width"];
			isMediaWidthInPx = mediaWidth && typeof mediaWidth !== "string";
		}

		dom.className = `figure-node-view ${
			dataFloat
				? "f-" + node.attrs.dataFloat
				: dataAlign
				? "justify-" + node.attrs.dataAlign
				: ""
		}`;
		dom.dataset.type = type;
		dom.dataset.caption = caption;
		if (type === "table") dom.style.overflowX = "auto";

		if (isMediaWidthInPx) {
			dom.style.width = mediaWidth + "px";
		} else if (isWidthInPercentages) {
			dom.style.width = width;
		}

		dom.style.height = "auto";

		if (
			(isWidthInPercentages && dataAlign === "left") ||
			dataAlign === "center"
		)
			dom.style.marginRight = "auto";
		if (
			(isWidthInPercentages && dataAlign === "right") ||
			dataAlign === "center"
		)
			dom.style.marginLeft = "auto";

		if (isWidthInPercentages && !isMediaWidthInPx && type !== "image")
			contentDOM.style.width = "100%";

		dom.appendChild(contentDOM);
		return {
			dom,
			contentDOM,
		};

		return [
			"figure",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
			0,
		];
	},

	addCommands() {
		return {
			setImageFigure:
				(options) =>
				({ chain }) => {
					let attrs = Object.assign({}, options, { type: "image" });
					attrs["width"] = "75%";
					return chain()
						.insertContent({
							type: this.name,
							attrs: attrs,
							content: [{ type: "image", attrs: options }],
						})
						.run();
				},

			setVideoFigure:
				(options) =>
				({ chain }) => {
					let attrs = Object.assign({}, options, { type: "iframe" });
					return chain()
						.insertContent({
							type: this.name,
							attrs: attrs,
							content: [{ type: "iframe", attrs: attrs }],
						})
						.run();
				},

			setTableFigure:
				(options) =>
				({ editor, chain }) => {
					let attrs = Object.assign({}, options, { type: "table" });
					let figure = editor.schema.nodes.figure;
					let table = createTable(
						editor.schema,
						options.rows,
						options.cols,
						false
					);

					let node = figure.create(attrs, [table]);
					return editor.commands.insertContent(node.toJSON());

					// let caption = editor.schema.nodes.caption.create();
					// let figureNode = figure.create({}, [table, caption]);

					// editor.view.dispatch(
					// 	editor.state.tr.replaceSelectionWith(figureNode).scrollIntoView()
					// );
				},

			toggleCaption:
				() =>
				({ editor, tr }) => {
					let { caption } = editor.getAttributes("figure");
					let nodeWithPos = findNode(editor, "image");
					if (!nodeWithPos) {
						nodeWithPos = findNode(editor, "iframe");
					}
					if (!nodeWithPos) {
						nodeWithPos = findNode(editor, "table");
					}

					let pos = nodeWithPos?.pos! + nodeWithPos?.node.nodeSize!;

					if (caption) {
						nodeWithPos;
						return editor
							.chain()
							.focus()
							.updateAttributes("figure", { caption: false })
							.setNodeSelection(pos + 1)
							.deleteNode("caption")
							.run();
					} else {
						let caption = {
							type: "caption",
							content: [
								{
									type: "paragraph",
									content: [
										{
											type: "text",
											text: _t("placeholders.caption"),
										},
									],
								},
							],
						};

						return editor
							.chain()
							.focus()
							.updateAttributes("figure", { caption: true })
							.insertContentAt(pos, caption)
							.command(({ tr }) => {
								tr.setSelection(
									TextSelection.create(
										tr.doc,
										tr.selection.to - tr.selection.$to.parent.content.size,
										tr.selection.to
									)
								);
								return true;
							})
							.run();
					}
				},
		};
	},

	addNodeView() {
		return ReactNodeViewRenderer(FigureNodeView);
	},
});
