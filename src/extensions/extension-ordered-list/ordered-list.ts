import TiptapOrderedList from "@tiptap/extension-ordered-list";

export const OrderedList = TiptapOrderedList.extend({
	addAttributes() {
		return {
			...this.parent?.(),
			type: {
				default: "decimal",
				// Take the attribute values
				renderHTML: (attributes) => {
					// … and return an object with HTML attributes.
					return {
						"data-style-type": attributes.type,
						style: `list-style-type: ${attributes.type}`,
					};
				},
				parseHTML: (element) => element.getAttribute("data-style-type"),
			},
		};
	},

	addKeyboardShortcuts() {
		return {
			"Alt-o": () => this.editor.commands.toggleOrderedList(),
		};
	},
});
