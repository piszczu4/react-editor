import { Extension } from "@tiptap/react";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		strike: {
			/**
			 * Set a strike mark
			 */
			setStrike: () => ReturnType;
			/**
			 * Toggle a strike mark
			 */
			toggleStrike: () => ReturnType;
			/**
			 * Unset a strike mark
			 */
			unsetStrike: () => ReturnType;
		};
	}
}

export const Strike = Extension.create({
	name: "strike",
	addOptions() {
		return {
			types: ["textStyle"],
		};
	},
	addGlobalAttributes() {
		return [
			{
				types: this.options.types,
				attributes: {
					strike: {
						default: null,
						parseHTML: (element) => {
							var strike = element.style.textDecoration;
							return strike === "line-through";
						},
						renderHTML: (attributes) => {
							if (!attributes.strike) {
								return {};
							}
							return {
								style: `text-decoration: line-through`,
							};
						},
					},
				},
			},
		];
	},
	addCommands() {
		return {
			setStrike:
				() =>
				({ chain }) => {
					return chain().setMark("textStyle", { strike: true }).run();
				},
			unsetStrike:
				() =>
				({ chain }) => {
					return chain()
						.setMark("textStyle", { strike: null })
						.removeEmptyTextStyle()
						.run();
				},
			toggleStrike:
				() =>
				({ editor, commands }) => {
					if (editor.isActive("textStyle", { strike: true }))
						return commands.unsetStrike();
					else return commands.setStrike();
				},
		};
	},

	addKeyboardShortcuts() {
		return {
			"Mod-Shift-X": () => this.editor.commands.toggleStrike(),
		};
	},
});
