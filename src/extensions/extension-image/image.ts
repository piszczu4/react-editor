import { mergeAttributes, Node, nodeInputRule } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { ImageNodeView } from "./ImageNodeView";

export interface ImageOptions {
	inline: boolean;
	allowBase64: boolean;
	HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		image: {
			/**
			 * Add an image
			 */
			setImage: (options: {
				src: string;
				alt?: string;
				width?: string;
				height?: number;
				"data-rotate"?: number;
				"data-rotate-x"?: number;
				"data-rotate-y"?: number;
			}) => ReturnType;
			rotate: (deg: number, mode: "" | "-x" | "-y") => ReturnType;
		};
	}
}

export const inputRegex =
	/(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;

export const Image = Node.create<ImageOptions>({
	name: "image",

	addOptions() {
		return {
			inline: false,
			allowBase64: false,
			HTMLAttributes: {},
		};
	},

	inline() {
		return this.options.inline;
	},

	group() {
		return this.options.inline ? "inline" : "block";
	},

	selectable: true,
	draggable: true,

	addAttributes() {
		return {
			src: {
				default: null,
				parseHTML: (element: HTMLImageElement) => element.src,
			},
			alt: {
				default: null,
				parseHTML: (element: HTMLElement) => element.getAttribute("alt"),
			},
			width: {
				default: null,
				parseHTML: (element: HTMLElement) => element.getAttribute("width"),
				renderHTML: ({ width }) => ({
					width: width,
				}),
			},
			height: {
				default: "auto",
				parseHTML: (element: HTMLElement) => element.getAttribute("height"),
				renderHTML: ({ height }) => ({
					height: height,
				}),
			},
			"data-rotate": {
				default: null,
				renderHTML: ({ "data-rotate": rotate }) => ({
					"data-rotate": rotate,
					style: rotate ? `transform: rotate(${rotate}deg)` : null,
				}),
				parseHTML: (element: HTMLElement) =>
					element.getAttribute("data-rotate"),
			},
			"data-rotate-x": {
				default: null,
				renderHTML: ({ "data-rotate-x": rotateX }) => ({
					"data-rotate-x": rotateX,
					style: rotateX ? `transform: rotateX(${rotateX}deg)` : null,
				}),
				parseHTML: (element: HTMLElement) =>
					element.getAttribute("data-rotate-x"),
			},
			"data-rotate-y": {
				default: null,
				renderHTML: ({ "data-rotate-y": rotateY }) => ({
					"data-rotate-x": rotateY,
					style: rotateY ? `transform: rotateY(${rotateY}deg)` : null,
				}),
				parseHTML: (element: HTMLElement) =>
					element.getAttribute("data-rotate-y"),
			},
		};
	},

	parseHTML() {
		return [
			{
				tag: this.options.allowBase64
					? "img[src]"
					: 'img[src]:not([src^="data:"])',
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return [
			"img",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
		];
	},

	addCommands() {
		return {
			setImage:
				(options) =>
				({ commands }) => {
					return commands.insertContent({
						type: this.name,
						attrs: options,
					});
				},
			rotate:
				(deg, mode) =>
				({ commands, editor }) => {
					let attr: string = `data-rotate${mode}`;
					let currDeg = editor.getAttributes(this.name)[attr];
					currDeg = currDeg ?? 0;
					let attrs: Record<string, any> = {};
					attrs[attr] = currDeg + deg;
					return commands.updateAttributes(this.name, attrs);
				},
		};
	},

	addInputRules() {
		return [
			nodeInputRule({
				find: inputRegex,
				type: this.type,
				getAttributes: (match) => {
					const [, , alt, src, title] = match;

					return { src, alt, title };
				},
			}),
		];
	},

	addNodeView() {
		return ReactNodeViewRenderer(ImageNodeView);
	},
});
