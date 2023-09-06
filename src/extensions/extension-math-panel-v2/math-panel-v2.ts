import { mergeAttributes, Node } from "@tiptap/core";
import { Selection } from "@tiptap/pm/state";
import { ReactNodeViewRenderer } from "@tiptap/react";
import {
	findParentNode,
	findChildren,
	findParentNodeClosestToPos,
} from "@tiptap/react";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		mathPanelV2: {
			setMathPanelV2: (panelType: PanelType) => ReturnType;
		};
	}
}

export interface MathPanelOptions {
	HTMLAttributes: Record<string, any>;
}

export enum PanelType {
	DEFINITION = "definition",
	THEOREM = "theorem",
	EXAMPLE = "example",
	REMARK = "remark",
	PROOF = "proof",
	LEMMA = "lemma",
}

export const MathPanelV2 = Node.create<MathPanelOptions>({
	name: "mathPanelV2",
	content: "mathPanelNameV2 mathPanelBodyV2",
	group: "block",
	draggable: true,
	selectable: true,

	addOptions() {
		return {
			HTMLAttributes: { class: "mw-math-panel-v2" },
		};
	},

	parseHTML() {
		return [
			{
				tag: "div.mw-math-panel-v2",
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return [
			"div",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
			0,
		];
	},

	addAttributes() {
		return {
			panelType: {
				default: "definition",
				renderHTML: (attributes) => ({
					"data-math-panel-type": attributes.panelType,
				}),
				parseHTML: (element: HTMLImageElement) =>
					element.getAttribute("data-math-panel-type"),
			},
		};
	},

	addCommands() {
		return {
			setMathPanelV2:
				(panelType) =>
				({ chain }) => {
					return chain()
						.insertContent({
							type: this.name,
							attrs: { panelType: panelType },
							content: [
								{
									type: "mathPanelNameV2",
									content: [
										{
											type: "heading",
											attrs: { level: 3 },
										},
									],
								},
								{
									type: "mathPanelBodyV2",
									content: [
										{
											type: "paragraph",
										},
									],
								},
							],
						})
						.command(({ tr }) => {
							let node = findParentNode(
								(node) => node.type.name === "mathPanelV2"
							)(tr.selection);

							if (!node) return false;

							let nameNode = findChildren(
								node?.node!,
								(node) => node.type.name === "mathPanelNameV2"
							)[0];
							let pos =
								nameNode.pos + node?.start! + nameNode.node.content.size;
							tr.setSelection(Selection.near(tr.doc.resolve(pos)));
							return true;
						})
						.run();
				},
		};
	},

	addKeyboardShortcuts() {
		return {
			Tab: () => {
				if (this.editor.isActive("mathPanelNameV2")) {
					let node = findParentNode((node) => node.type.name === "mathPanelV2")(
						this.editor.state.selection
					);

					let bodyNode = findChildren(
						node?.node!,
						(node) => node.type.name === "mathPanelBodyV2"
					)[0];

					let pos = bodyNode.pos + node?.start! + bodyNode.node.content.size;
					return this.editor
						.chain()
						.focus()
						.command(({ tr }) => {
							tr.setSelection(Selection.near(tr.doc.resolve(pos)));
							return true;
						})
						.run();
				}

				return false;
			},
			"Mod-Alt-t": () => this.editor.commands.setMathPanel(PanelType.THEOREM),
			"Mod-Alt-d": () =>
				this.editor.commands.setMathPanel(PanelType.DEFINITION),
			"Mod-Alt-e": () => this.editor.commands.setMathPanel(PanelType.EXAMPLE),
			"Mod-Alt-r": () => this.editor.commands.setMathPanel(PanelType.REMARK),
		};
	},
});
