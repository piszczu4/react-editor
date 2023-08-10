import { BubbleMenu, Editor } from "@tiptap/react";
import { findNodePos } from "../../utils";

type MediaBubbleMenuProps = { editor: Editor };

export function FigureBubbleMenu({ editor }: MediaBubbleMenuProps) {
	return (
		<BubbleMenu
			pluginKey={"figureBubbleMenu"}
			editor={editor}
			tippyOptions={{
				maxWidth: "100%",
				placement: "bottom",
				duration: 200,
				animation: "shift-toward-subtle",
				moveTransition: "transform 0.2s ease-in-out",
				getReferenceClientRect: () => {
					let pos = findNodePos(editor, "image");
					let closestNode = editor.view.nodeDOM(pos!) as HTMLElement;
					let img = closestNode.getElementsByTagName("img")[0] as HTMLElement;
					return img.getBoundingClientRect();
				},
			}}
			updateDelay={0}
			shouldShow={(props) => {
				return props.editor.isActive("image");
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

						<button
							type="button"
							className="flex--item s-btn mr4"
							title=""
							onClick={() => editor.commands.rotate(-90, "")}
						>
							<span>Rotate Left</span>
						</button>

						<button
							type="button"
							className="flex--item s-btn mr4"
							title=""
							onClick={() => editor.commands.rotate(90, "")}
						>
							<span>Rotate Right</span>
						</button>

						<button
							type="button"
							className="flex--item s-btn mr4"
							title=""
							onClick={() => editor.commands.rotate(180, "-x")}
						>
							<span>Rotate X </span>
						</button>

						<button
							type="button"
							className="flex--item s-btn mr4"
							title=""
							onClick={() => editor.commands.rotate(180, "-y")}
						>
							<span>Rotate Y </span>
						</button>

						<button
							type="button"
							className="flex--item s-btn mr4"
							title=""
							onClick={() => {
								editor.commands.resetAttributes("figure", ["width", "height"]);
								editor.commands.resetAttributes("image", [
									"width",
									"height",
									"data-rotate",
									"data-rotate-x",
									"data-rotate-y",
								]);
							}}
						>
							<span>Reset </span>
						</button>
					</div>
				</div>
			</span>
		</BubbleMenu>
	);
}
