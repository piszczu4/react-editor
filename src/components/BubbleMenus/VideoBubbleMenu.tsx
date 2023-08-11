import { BubbleMenu, Editor } from "@tiptap/react";
import { findNodePos } from "../../utils";

type VideoBubbleMenuProps = { editor: Editor };

export function VideoBubbleMenu({ editor }: VideoBubbleMenuProps) {
	return (
		<BubbleMenu
			pluginKey={"videoBubbleMenu"}
			editor={editor}
			tippyOptions={{
				maxWidth: "100%",
				placement: "bottom",
				duration: 200,
				animation: "shift-toward-subtle",
				moveTransition: "transform 0.2s ease-in-out",
				getReferenceClientRect: () => {
					let pos = findNodePos(editor, "iframe");
					let closestNode = editor.view.nodeDOM(pos!) as HTMLElement;
					// let iframe = closestNode.getElementsByTagName(
					// 	"iframe"
					// )[0] as HTMLElement;
					return closestNode.getBoundingClientRect();
				},
			}}
			updateDelay={0}
			shouldShow={(props) => {
				return props.editor.isActive("iframe");
			}}
			className="mw-5 bs-ring bc-blue-300"
		>
			<span>
				<div className="mw-popover" role="menu">
					<div className="d-flex ai-center">
						<button
							type="button"
							className="flex--item s-btn mr4"
							title=""
							onClick={() => {
								editor.commands.updateAttributes("figure", {
									width: "50%",
								});
								editor.commands.updateAttributes("image", {
									width: "100%",
								});
							}}
						>
							<span>50%</span>
						</button>

						<button
							type="button"
							className="flex--item s-btn mr4"
							title=""
							onClick={() => {
								editor.commands.updateAttributes("figure", {
									width: "75%",
								});
								editor.commands.updateAttributes("image", {
									width: "100%",
								});
							}}
						>
							<span>75%</span>
						</button>

						<button
							type="button"
							className="flex--item s-btn mr4"
							title=""
							onClick={() => {
								editor.commands.updateAttributes("figure", {
									width: "100%",
								});
								editor.commands.updateAttributes("image", {
									width: "100%",
								});
							}}
						>
							<span>100%</span>
						</button>

						<button
							type="button"
							className="flex--item s-btn mr4"
							title=""
							onClick={() =>
								editor.commands.updateAttributes("figure", {
									dataAlign: "left",
									dataFloat: null,
								})
							}
						>
							<span>Left</span>
						</button>

						<button
							type="button"
							className="flex--item s-btn mr4"
							title=""
							onClick={() =>
								editor.commands.updateAttributes("figure", {
									dataAlign: "center",
									dataFloat: null,
								})
							}
						>
							<span>Center</span>
						</button>

						<button
							type="button"
							className="flex--item s-btn mr4"
							title=""
							onClick={() =>
								editor.commands.updateAttributes("figure", {
									dataAlign: "right",
									dataFloat: null,
								})
							}
						>
							<span>Right</span>
						</button>

						<button
							type="button"
							className="flex--item s-btn mr4"
							title=""
							onClick={() =>
								editor.commands.updateAttributes("figure", {
									dataAlign: null,
									dataFloat: "left",
								})
							}
						>
							<span>Float Left</span>
						</button>

						<button
							type="button"
							className="flex--item s-btn mr4"
							title=""
							onClick={() =>
								editor.commands.updateAttributes("figure", {
									dataAlign: null,
									dataFloat: "right",
								})
							}
						>
							<span>Float Right</span>
						</button>

						<button
							type="button"
							className="flex--item s-btn mr4"
							title=""
							onClick={() => editor.commands.toggleCaption()}
						>
							<span>Toggle Caption</span>
						</button>
					</div>
				</div>
			</span>
		</BubbleMenu>
	);
}
