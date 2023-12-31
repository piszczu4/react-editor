import { mergeAttributes, Node, wrappingInputRule } from "@tiptap/core";
import { EditorState, Plugin, PluginKey } from "@tiptap/pm/state";
import { _t } from "../../helpers/strings";
import { docChanged } from "../../utils";
import { updateSpoilers } from "./utils";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		spoiler: {
			/**
			 * Set a blockquote node
			 */
			setSpoiler: () => ReturnType;
			/**
			 * Toggle a blockquote node
			 */
			toggleSpoiler: () => ReturnType;
			/**
			 * Unset a blockquote node
			 */
			unsetSpoiler: () => ReturnType;
		};
	}
}

export const inputRegex = /^\s*>!\s$/;

export interface SpoilerOptions {
	HTMLAttributes: Record<string, any>;
}

export const Spoiler = Node.create<SpoilerOptions>({
	name: "spoiler",

	addOptions() {
		return {
			HTMLAttributes: {},
		};
	},

	content: "block+",

	group: "block",

	defining: true,

	addAttributes() {
		return {
			revealed: {
				default: false,
				parseHTML: (element) => element.classList.contains("is-visible"),
				renderHTML: (attributes) => {
					return {
						class: "spoiler" + (attributes.revealed ? " is-visible" : ""),
						"data-spoiler": _t("nodes.spoiler_reveal_text"),
					};
				},
			},
		};
	},

	parseHTML() {
		return [{ tag: "spoiler" }];
	},

	renderHTML({ HTMLAttributes }) {
		return [
			"spoiler",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
			0,
		];
	},

	addCommands() {
		return {
			setSpoiler:
				() =>
				({ commands }) => {
					return commands.wrapIn(this.name);
				},
			toggleSpoiler:
				() =>
				({ commands }) => {
					return commands.toggleWrap(this.name);
				},
			unsetSpoiler:
				() =>
				({ commands }) => {
					return commands.lift(this.name);
				},
		};
	},

	addKeyboardShortcuts() {
		return {
			"Mod-/": () => this.editor.commands.toggleSpoiler(),
		};
	},

	addInputRules() {
		return [
			wrappingInputRule({
				find: inputRegex,
				type: this.type,
			}),
		];
	},

	addProseMirrorPlugins() {
		return [
			new Plugin({
				key: new PluginKey("spoiler-toggle"),
				appendTransaction: (
					transactions: any,
					oldState: EditorState,
					newState: EditorState
				) => {
					// if the doc / selection has not changed, nothing to do
					if (!docChanged(oldState, newState)) {
						return null;
					}

					let tr = newState.tr;

					// un-reveal all spoilers from the old state/selection
					tr = updateSpoilers(tr, oldState, false, transactions);

					// reveal all spoilers in the new selection
					tr = updateSpoilers(tr, newState, true);

					// no nodes changed, just return
					if (!tr.steps.length) {
						return null;
					}

					// make sure this doesn't get added to the history
					tr = tr.setMeta("addToHistory", false);

					return tr;
				},
			}),
		];
	},
});
