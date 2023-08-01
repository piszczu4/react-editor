import { mergeAttributes, Node, nodeInputRule } from "@tiptap/core";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		resizableMediaWithCapton: {
			/**
			 * Set media
			 */
			setMediaWithCaption: (options: {
				"media-type": "img" | "video";
				src: string;
				alt?: string;
				title?: string;
				width?: string;
				height?: string;
			}) => ReturnType;
		};
	}
}

export interface MediaWithCaptionOptions {
	// inline: boolean, // we have floating support, so block is good enough
	// allowBase64: boolean, // we're not going to allow this
	HTMLAttributes: Record<string, any>;
}

export const ResizableMediaWithCaption = Node.create<MediaWithCaptionOptions>({
	name: "resizableMediaWithCaption",

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

	content: "resizableMedia caption",

	selectable: true,

	addCommands() {
		return {
			setMediaWithCaption:
				(options) =>
				({ commands, editor }) => {
					return editor.commands.insertContent({
						type: "resizableMediaWithCaption",
						content: [
							{
								type: "resizableMedia",
								attrs: options,
							},
							{
								type: "caption",
								content: [
									{
										type: "paragraph",
									},
								],
							},
						],
					});
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
});
