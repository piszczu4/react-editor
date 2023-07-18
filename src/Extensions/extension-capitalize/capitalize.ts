import "@tiptap/extension-text-style";

import { Extension } from "@tiptap/core";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		capitalize: {
			/**
			 * Format string
			 */
			capitalize: (type: "lowercase" | "uppercase" | "titlecase") => ReturnType;
		};
	}
}

export const Capitalize = Extension.create({
	name: "capitalize",

	addCommands() {
		return {
			capitalize:
				(type) =>
				({ tr, state, editor, dispatch }) => {
					// grab the current transaction and selection
					const selection = tr.selection;

					// check we will actually need a to dispatch transaction
					let shouldUpdate = false;

					state.doc.nodesBetween(
						selection.from,
						selection.to,
						(node, position) => {
							// we only processing text, must be a selection
							if (!node.isTextblock || selection.from === selection.to) return;

							// calculate the section to replace
							const startPosition = Math.max(position + 1, selection.from);
							const endPosition = Math.min(
								position + node.nodeSize,
								selection.to
							);

							// grab the content
							const substringFrom = Math.max(0, selection.from - position - 1);
							const substringTo = Math.max(0, selection.to - position - 1);
							const updatedText = node.textContent.substring(
								substringFrom,
								substringTo
							);

							let titleCase = (string: string) => {
								var sentence = string.toLowerCase().split(" ");
								for (var i = 0; i < sentence.length; i++) {
									sentence[i] =
										sentence[i][0].toUpperCase() + sentence[i].slice(1);
								}
								return sentence.join(" ");
							};

							// set the casing
							const textNode =
								type === "uppercase"
									? state.schema.text(updatedText.toUpperCase(), node.marks)
									: type === "lowercase"
									? state.schema.text(
											updatedText.toLocaleLowerCase(),
											node.marks
									  )
									: state.schema.text(titleCase(updatedText), node.marks);

							// replace
							tr = tr.replaceWith(startPosition, endPosition, textNode);
							shouldUpdate = true;
						}
					);

					if (dispatch && shouldUpdate) {
						dispatch(tr.scrollIntoView());
					}

					return true;
				},
		};
	},
});
