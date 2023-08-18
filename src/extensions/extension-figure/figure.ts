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
			setTableFigure: () => ReturnType;
			setVideoFigure: (options: {
				src: string;
				width: string;
				height: string;
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
			},
			src: {
				default: null,
				renderHTML: (attributes) => ({
					src: attributes.src,
				}),
				parseHTML: (element: HTMLImageElement) => element.src,
			},
			alt: {
				default: null,
				parseHTML: (element: HTMLElement) => element.getAttribute("alt"),
			},
			title: {
				default: null,
				parseHTML: (element: HTMLElement) => element.getAttribute("title"),
			},
			width: {
				default: "75%",
				parseHTML: (element: HTMLElement) => element.getAttribute("width"),
			},
			height: {
				default: "auto",
				parseHTML: (element: HTMLElement) => element.getAttribute("height"),
			},
			dataAlign: {
				default: "center", // 'left' | 'center' | 'right'
				parseHTML: (element: HTMLElement) => element.getAttribute("data-align"),
			},
			dataFloat: {
				default: null, // 'left' | 'right'
				parseHTML: (element: HTMLElement) => element.getAttribute("data-float"),
			},
			caption: {
				default: false,
				parseHTML: (element: HTMLElement) =>
					element.getAttribute("data-caption"),
			},
		};
	},

	addCommands() {
		return {
			setImageFigure:
				(options) =>
				({ chain }) => {
					let attrs = Object.assign({}, options, { type: "image" });
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
					return chain()
						.insertContent({
							type: this.name,
							attrs: options,
							content: [{ type: "iframe", attrs: options }],
						})
						.run();
				},

			setTableFigure:
				() =>
				({ editor, chain }) => {
					let figure = editor.schema.nodes.figure;
					let table = createTable(editor.schema, 3, 3, false);
					let caption = editor.schema.nodes.caption.create();
					let figureNode = figure.create({}, [table, caption]);

					editor.view.dispatch(
						editor.state.tr.replaceSelectionWith(figureNode).scrollIntoView()
					);
					return true;
				},

			toggleCaption:
				() =>
				({ editor, tr }) => {
					let { caption } = editor.getAttributes("figure");
					let nodeWithPos = findNode(editor, "image");

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
											text: "Caption",
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

	parseHTML() {
		return [
			{
				tag: "figure",
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return [
			"figure",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
			0,
		];
	},

	addNodeView() {
		return ReactNodeViewRenderer(FigureNodeView);
	},
});
