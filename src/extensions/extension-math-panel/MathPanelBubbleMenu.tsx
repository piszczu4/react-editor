import { BubbleMenu, Editor } from "@tiptap/react";
import { PanelType } from "./math-panel";
type MediaBubbleMenuProps = { editor: Editor };

export function MathPanelBubbleMenu({ editor }: MediaBubbleMenuProps) {
	return (
		<BubbleMenu
			pluginKey={"mathPanelBubbleMenu"}
			editor={editor}
			tippyOptions={{
				duration: 200,
				animation: "shift-toward-subtle",
				moveTransition: "transform 0.2s ease-in-out",
			}}
			updateDelay={0}
			shouldShow={(props) => {
				return props.editor.isActive("mathPanel");
			}}
			className="mw-popover"
		>
			<span>
				<div role="menu">
					<div className="d-flex ai-center">
						<button
							type="button"
							className="flex--item s-btn mr4"
							title=""
							onClick={() => {
								editor.commands.updateAttributes("mathPanel", {
									panelType: PanelType.DEFINITION,
								});
							}}
						>
							<span>Definition</span>
						</button>

						<button
							type="button"
							className="flex--item s-btn mr4"
							title=""
							onClick={() => {
								editor.commands.updateAttributes("mathPanel", {
									panelType: PanelType.THEOREM,
								});
							}}
						>
							<span>Theorem</span>
						</button>

						<button
							type="button"
							className="flex--item s-btn mr4"
							title=""
							onClick={() => {
								editor.commands.updateAttributes("mathPanel", {
									panelType: PanelType.EXAMPLE,
								});
							}}
						>
							<span>Example</span>
						</button>

						<button
							type="button"
							className="flex--item s-btn mr4"
							title=""
							onClick={() => {
								editor.commands.updateAttributes("mathPanel", {
									panelType: PanelType.REMARK,
								});
							}}
						>
							<span>Remark</span>
						</button>

						<button
							type="button"
							className="flex--item s-btn mr4"
							title=""
							onClick={() => {
								editor.commands.updateAttributes("mathPanel", {
									panelType: PanelType.PROOF,
								});
							}}
						>
							<span>PROOF</span>
						</button>
					</div>
				</div>
			</span>
		</BubbleMenu>
	);
}
