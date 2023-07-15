import { MarkType } from "@tiptap/pm/model";
import { getMarkType } from "@tiptap/react";
import { RawCommands } from "@tiptap/react";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		isMarkAllowed: {
			/**
			 * Checks whether mark is allowed.
			 */
			isMarkAllowed: (typeOrName: string | MarkType) => ReturnType;
		};
	}
}

export const isMarkAllowed: RawCommands["isMarkAllowed"] =
	(typeOrName: string | MarkType) =>
	({ editor, view }) => {
		let state = view.state;
		let { doc, tr } = state;
		let { ranges } = tr.selection;
		let type = getMarkType(typeOrName, state.schema);
		for (let i = 0; i < ranges.length; i++) {
			let { $from, $to } = ranges[i];
			let can =
				$from.depth == 0
					? doc.inlineContent && doc.type.allowsMarkType(type)
					: false;
			doc.nodesBetween($from.pos, $to.pos, (node) => {
				if (can) return false;
				can = node.inlineContent && node.type.allowsMarkType(type);
			});
			if (can) return true;
		}
		return false;
	};
