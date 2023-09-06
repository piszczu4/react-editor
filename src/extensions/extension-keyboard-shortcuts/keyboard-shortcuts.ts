import { NodeSelection, TextSelection } from "@tiptap/pm/state";
import { Extension } from "@tiptap/react";

export const KeyboardShortcuts = Extension.create({
	addOptions() {
		return {
			blocksToEscapeForward: ["mathPanelBody", "mathPanelBodyV2"],
			blocksToEscapeBackward: ["mathPanelBody", "mathPanelBodyV2"],
			blocksToRemove: ["mathPanelName", "mathPanelNameV2"],
		};
	},
	addKeyboardShortcuts() {
		return {
			Enter: ({ editor }) => {
				let { state } = editor;
				let { $from } = state.selection;

				let currentNode = $from.node();
				let parentNode = $from.node(-1);

				if (parentNode.maybeChild($from.index(-1) + 1)) return false;
				if (
					currentNode.type.name !== "paragraph" ||
					currentNode.content.size !== 0
				)
					return false;

				if (this.options.blocksToEscapeForward.includes(parentNode.type.name)) {
					editor
						.chain()
						.command(({ tr }) => {
							tr.deleteRange($from.pos - 1, $from.pos);
							return true;
						})
						.run();
					return true;
				}

				return false;
			},

			Backspace: ({ editor }) => {
				let { state } = editor;
				let { $from } = state.selection;

				let currentNode = $from.node();
				let parentNode = $from.node(-1);

				if (
					!["paragraph", "heading"].includes(currentNode.type.name) ||
					currentNode.content.size !== 0
				)
					return false;

				// If there is a node at current depth, do anything
				if (parentNode.maybeChild($from.index(-1) - 1)) return false;

				// First, try to move to previous node
				if (
					this.options.blocksToEscapeBackward.includes(parentNode.type.name)
				) {
					editor
						.chain()
						.command(({ tr }) => {
							tr.setSelection(TextSelection.create(tr.doc, $from.pos - 4));
							return true;
						})
						.run();
					return true;
				}

				// Then try to remove node
				if (this.options.blocksToRemove.includes(parentNode.type.name)) {
					editor
						.chain()
						.command(({ tr }) => {
							tr.setSelection(NodeSelection.create(tr.doc, $from.pos - 3));
							tr.deleteSelection();
							return true;
						})
						.run();
					return true;
				}

				return false;
			},
		};
	},
});
