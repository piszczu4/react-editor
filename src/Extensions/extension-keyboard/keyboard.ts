import { Mark, mergeAttributes } from "@tiptap/core";

export interface KeyboardExtensionOptions {
	HTMLAttributes: Object;
}

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		keyboard: {
			/**
			 * Toggle a keyboard mark
			 */
			toggleKeyboard: () => ReturnType;
		};
	}
}

export const Keyboard = Mark.create<KeyboardExtensionOptions>({
	name: "keyboard",
	exitable: true,
	inclusive: true,

	addOptions() {
		return {
			HTMLAttributes: {},
		};
	},

	parseHTML() {
		return [
			{
				tag: "kbd",
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return [
			"kbd",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
			0,
		];
	},

	addCommands() {
		return {
			toggleKeyboard:
				() =>
				({ commands }) => {
					return commands.toggleMark(this.name);
				},
		};
	},

	addKeyboardShortcuts() {
		return {
			"Mod-'": () => this.editor.commands.toggleKeyboard(),
		};
	},
});
