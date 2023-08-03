import { mergeAttributes, Node } from "@tiptap/core";
import { acNameToEmoji, acShortcutToEmoji } from "./utils";

/**
 * @name emoji_node
 */
export interface EmojiDefinition {
	type: "emoji";
	attrs: EmojiAttributes;
}

export interface EmojiAttributes {
	id?: string; // Optional to support legacy formats
	shortName: string;
	text?: string;
}

// declare module "@tiptap/core" {
// 	interface Commands<ReturnType> {
// 		emoji: {
// 			/**
// 			 * Set panel
// 			 */
// 			setEmoji: (options: {
// 				panelType: PanelType;
// 				panelIcon?: string;
// 				panelIconId?: string;
// 				panelIconText?: string;
// 				panelColor?: string;
// 			}) => ReturnType;
// 		};
// 	}
// }

type PanelOptions = {
	HTMLAttributes: Record<string, any>;
};
export const Panel = Node.create<PanelOptions, never>({
	name: "emoji",
	inline: true,
	group: "inline",
	selectable: true,

	addAttributes() {
		return {
			shortName: {
				default: "",
			},
			id: {
				default: "",
			},
			text: {
				default: "",
			},
		};
	},

	parseHTML() {
		return [
			{
				tag: "div.ak-editor-panel__icon span",
				ignore: true,
			},
			{
				tag: "span[data-emoji-short-name]",
				getAttrs: (domNode) => {
					const dom = domNode as HTMLElement;
					return {
						shortName: dom.getAttribute("data-emoji-short-name"),
						id: dom.getAttribute("data-emoji-id"),
						text: dom.getAttribute("data-emoji-text"),
					};
				},
			},
			// Handle copy/paste from old <ac:emoticon />
			{
				tag: "img[data-emoticon-name]",
				getAttrs: (dom) =>
					acNameToEmoji(
						(dom as Element).getAttribute("data-emoticon-name") as any
					),
			},
			// Handle copy/paste from old <ac:hipchat-emoticons />
			{
				tag: "img[data-hipchat-emoticon]",
				getAttrs: (dom) =>
					acShortcutToEmoji(
						(dom as Element).getAttribute("data-hipchat-emoticon")!
					),
			},
			// Handle copy/paste from bitbucket's <img class="emoji" />
			{
				tag: "img.emoji[data-emoji-short-name]",
				getAttrs: (domNode) => {
					const dom = domNode as HTMLElement;
					return {
						shortName: dom.getAttribute("data-emoji-short-name"),
						id: dom.getAttribute("data-emoji-id"),
						text: dom.getAttribute("data-emoji-text"),
					};
				},
			},
		];
	},

	renderHTML({ node }) {
		const { shortName, id, text } = node.attrs;
		const attrs = {
			"data-emoji-short-name": shortName,
			"data-emoji-id": id,
			"data-emoji-text": text,
			contenteditable: "false",
		};
		return ["span", attrs, text];
	},
});
