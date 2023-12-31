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
		mathPanel: {
			setMathPanel: (panelType: PanelType) => ReturnType;
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

export const MathPanel = Node.create<MathPanelOptions>({
	name: "mathPanel",
	content: "mathPanelName mathPanelBody",
	group: "block",
	draggable: true,
	selectable: true,

	addOptions() {
		return {
			HTMLAttributes: { class: "mw-math-panel" },
		};
	},

	parseHTML() {
		return [
			{
				tag: "div.mw-math-panel",
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
			setMathPanel:
				(panelType) =>
				({ chain }) => {
					return chain()
						.insertContent({
							type: this.name,
							attrs: { panelType: panelType },
							content: [
								{
									type: "mathPanelName",
									content: [
										{
											type: "paragraph",
										},
									],
								},
								{
									type: "mathPanelBody",
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
								(node) => node.type.name === "mathPanel"
							)(tr.selection);

							if (!node) return false;

							let nameNode = findChildren(
								node?.node!,
								(node) => node.type.name === "mathPanelName"
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
				if (this.editor.isActive("mathPanelName")) {
					let node = findParentNode((node) => node.type.name === "mathPanel")(
						this.editor.state.selection
					);

					let bodyNode = findChildren(
						node?.node!,
						(node) => node.type.name === "mathPanelBody"
					)[0];

					let pos = bodyNode.pos + node?.start! + bodyNode.node.content.size;
					this.editor
						.chain()
						.focus()
						.command(({ tr }) => {
							tr.setSelection(Selection.near(tr.doc.resolve(pos)));
							return true;
						})
						.run();
				}

				return true;
			},
			"Mod-Alt-t": () => this.editor.commands.setMathPanel(PanelType.THEOREM),
			"Mod-Alt-d": () =>
				this.editor.commands.setMathPanel(PanelType.DEFINITION),
			"Mod-Alt-e": () => this.editor.commands.setMathPanel(PanelType.EXAMPLE),
			"Mod-Alt-r": () => this.editor.commands.setMathPanel(PanelType.REMARK),
		};
	},
});
