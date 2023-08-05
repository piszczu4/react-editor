import TiptapHeading from "@tiptap/extension-heading";

export const Heading = TiptapHeading.extend({
	onSelectionUpdate() {
		let button = document.querySelector(
			'[data-key^="heading-dropdown"]'
		) as HTMLElement;

		if (button) {
			let span = button.querySelector(
				'[data-key="innerText"]'
			) as HTMLSpanElement;

			if (span) {
				if (this.editor.isActive("paragraph")) {
					span.innerText = "Paragraph";
				} else {
					let levels: number[] = [1, 2, 3, 4, 5, 6];
					for (let level of levels) {
						if (this.editor.isActive("heading", { level: level })) {
							span.innerText = "Heading " + level;
							return;
						}
					}
					span.innerText = "Paragraph";
				}
			}
		}
	},
});
