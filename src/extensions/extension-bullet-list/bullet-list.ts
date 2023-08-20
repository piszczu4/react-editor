import TiptapBulletList from "@tiptap/extension-bullet-list";

export const BulletList = TiptapBulletList.extend({
	addAttributes() {
		return {
			...this.parent?.(),
			type: {
				default: "disc",
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
			"Alt-u": () => this.editor.commands.toggleBulletList(),
		};
	},
});
