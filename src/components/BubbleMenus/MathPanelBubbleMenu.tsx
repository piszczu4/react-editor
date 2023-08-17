import { BubbleMenu, Editor } from "@tiptap/react";
import { PanelType } from "../../extensions/extension-math-panel/math-panel";
import { findNode, findNodePos } from "../../utils";
import { MenuButton } from "../MenuBar/MenuButton";

type MathPanelBubbleMenuProps = { editor: Editor };

export function MathPanelBubbleMenu({ editor }: MathPanelBubbleMenuProps) {
	return (
		<BubbleMenu
			pluginKey={"mathPanelBubbleMenu"}
			editor={editor}
			tippyOptions={{
				placement: "bottom",
				duration: 200,
				animation: "shift-toward-subtle",
				moveTransition: "transform 0.2s ease-in-out",
				getReferenceClientRect: () => {
					let nodeWithPos = findNode(editor, "mathPanel");
					let node = editor.view.nodeDOM(nodeWithPos?.pos!) as HTMLElement;
					return node.getBoundingClientRect();
				},
			}}
			updateDelay={0}
			shouldShow={(props) => {
				return props.editor.isActive("mathPanel");
			}}
		>
			<div className="d-flex ai-center">
				<button
					type="button"
					className="flex--item mw-btn mw-color-palette--color-btn mw-color--definition"
					title=""
					onClick={() => {
						editor.commands.updateAttributes("mathPanel", {
							panelType: PanelType.DEFINITION,
						});
					}}
				></button>

				<button
					type="button"
					className="flex--item s-btn mw-color-palette--color-btn mw-color--theorem"
					title=""
					onClick={() => {
						editor.commands.updateAttributes("mathPanel", {
							panelType: PanelType.THEOREM,
						});
					}}
				></button>

				<button
					type="button"
					className="flex--item s-btn mw-color-palette--color-btn mw-color--example"
					title=""
					onClick={() => {
						editor.commands.updateAttributes("mathPanel", {
							panelType: PanelType.EXAMPLE,
						});
					}}
				></button>

				<button
					type="button"
					className="flex--item s-btn mw-color-palette--color-btn mw-color--remark"
					title=""
					onClick={() => {
						editor.commands.updateAttributes("mathPanel", {
							panelType: PanelType.REMARK,
						});
					}}
				></button>

				<button
					type="button"
					className="flex--item s-btn mw-color-palette--color-btn mw-color--proof"
					title=""
					onClick={() => {
						editor.commands.updateAttributes("mathPanel", {
							panelType: PanelType.PROOF,
						});
					}}
				></button>
			</div>
		</BubbleMenu>
	);
}
