import { NodeType } from "@tiptap/pm/model";

import { RawCommands, getNodeType } from "@tiptap/react";

import { NodeSelection } from "@tiptap/pm/state";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		setNode_: {
			/**
			 * Replace a given range with a node.
			 */
			setNode_: (
				typeOrName: string | NodeType,
				attributes?: Record<string, any>
			) => ReturnType;
		};
	}
}

export const setNode_: RawCommands["setNode_"] =
	(typeOrName) =>
	({ state }) => {
		const type = getNodeType(typeOrName, state.schema);

		let { $from } = state.selection,
			index = $from.index();
		if (!$from.parent.canReplaceWith(index, index, type)) {
			return false;
		}

		let tr = state.tr.replaceSelectionWith(type.create({}));
		tr = tr.setSelection(NodeSelection.create(tr.doc, $from.pos));
		return true;

		// // TODO: use a fallback like insertContent?
		// if (!type.isTextblock) {
		// 	console.warn(
		// 		'[tiptap warn]: Currently "setNode()" only supports text block nodes.'
		// 	);

		// 	return false;
		// }

		// return (
		// 	chain()
		// 		// try to convert node to default node if needed
		// 		.command(({ commands }) => {
		// 			const canSetBlock = setBlockType(type, attributes)(state);

		// 			if (canSetBlock) {
		// 				return true;
		// 			}

		// 			return commands.clearNodes();
		// 		})
		// 		.command(({ state: updatedState }) => {
		// 			return setBlockType(type, attributes)(updatedState, dispatch);
		// 		})
		// 		.run()
		// );
	};
