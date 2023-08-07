import { BubbleMenu, Editor } from "@tiptap/react";
import { PanelType } from "./panel";

type MediaBubbleMenuProps = { editor: Editor };

export function PanelBubbleMenu({ editor }: MediaBubbleMenuProps) {
	return (
		<BubbleMenu
			pluginKey={"mediaBubbleMenu"}
			editor={editor}
			tippyOptions={{
				duration: 200,
				animation: "shift-toward-subtle",
				moveTransition: "transform 0.2s ease-in-out",
			}}
			updateDelay={0}
			shouldShow={(props) => {
				return props.editor.isActive("panel");
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
								editor.commands.updateAttributes("panel", {
									panelType: PanelType.INFO,
								});
							}}
						>
							<span>Info</span>
						</button>

						<button
							type="button"
							className="flex--item s-btn mr4"
							title=""
							onClick={() => {
								editor.commands.updateAttributes("panel", {
									panelType: PanelType.NOTE,
								});
							}}
						>
							<span>Note</span>
						</button>

						<button
							type="button"
							className="flex--item s-btn mr4"
							title=""
							onClick={() => {
								editor.commands.updateAttributes("panel", {
									panelType: PanelType.SUCCESS,
								});
							}}
						>
							<span>Success</span>
						</button>

						<button
							type="button"
							className="flex--item s-btn mr4"
							title=""
							onClick={() => {
								editor.commands.updateAttributes("panel", {
									panelType: PanelType.WARNING,
								});
							}}
						>
							<span>Warning</span>
						</button>

						<button
							type="button"
							className="flex--item s-btn mr4"
							title=""
							onClick={() => {
								editor.commands.updateAttributes("panel", {
									panelType: PanelType.ERROR,
								});
							}}
						>
							<span>Error</span>
						</button>
					</div>
				</div>
			</span>
		</BubbleMenu>
	);
}
