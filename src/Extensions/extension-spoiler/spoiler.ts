import { mergeAttributes, Node, wrappingInputRule } from "@tiptap/core";
import { EditorState, Plugin, PluginKey, Transaction } from "@tiptap/pm/state";
import { _t } from "../../helpers/strings";

/**
 * Compares two states and returns true if the doc has changed between them.
 * The doc is considered changed if:
 *      * its content changed
 *      * the stored marks have changed
 * @param prevState The "old" / previous editor state
 * @param newState The "new" / current editor state
 */
export function docNodeChanged(
	prevState: EditorState,
	newState: EditorState
): boolean {
	// if either are null, just return "changed"
	if (!prevState || !newState) {
		return true;
	}

	return (
		!prevState.doc.eq(newState.doc) ||
		prevState.storedMarks !== newState.storedMarks
	);
}

/**
 * Compares two states and returns true if the doc has changed between them.
 * The doc is considered changed if:
 *      * the document node changed (@see docNodeChanged)
 *      * the selection has changed
 * @param prevState The "old" / previous editor state
 * @param newState The "new" / current editor state
 */
export function docChanged(
	prevState: EditorState,
	newState: EditorState
): boolean {
	return (
		docNodeChanged(prevState, newState) ||
		!prevState.selection.eq(newState.selection)
	);
}

/**
 * Updates all spoiler nodes within the state's selection
 * @param tr The transaction to modify
 * @param state The state whose selection to check for spoiler nodes (does not have to be the current state!)
 * @param shouldReveal Whether to force the spoiler to be revealed or not
 * @param transactions The array of transactions to map node positions through (if the state is not current)
 */
function updateSpoilers(
	tr: Transaction,
	state: EditorState,
	shouldReveal: boolean,
	transactions?: ReadonlyArray<Transaction>
) {
	const { from, to } = state.selection;
	state.doc.nodesBetween(from, to, (node, pos) => {
		// if spoiler node, set revealed attribute
		if (node.type.name === "spoiler") {
			// inherit whatever attributes are already on the node,
			// but do NOT update the node directly (or else the view will not register as changed)
			const attrs = { ...node.attrs };
			attrs.revealed = shouldReveal;

			let wasDeleted = false;

			if (transactions?.length) {
				// map the position through each transaction to make sure the node we're altering still exists
				transactions.forEach((t) => {
					const result = t.mapping.mapResult(pos);

					// if the node was outright deleted, skip it!
					if (result.deleted) {
						wasDeleted = true;
						return false;
					}

					// set pos to the current position of the node
					pos = result.pos;
				});
			}

			// if the node was deleted, then there's nothing to do
			if (wasDeleted) {
				return false;
			}

			tr = tr.setNodeMarkup(pos, null, attrs);

			// don't recurse into this node's children
			return false;
		}
	});

	return tr;
}

export interface SpoilerOptions {
	HTMLAttributes: Record<string, any>;
}

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
