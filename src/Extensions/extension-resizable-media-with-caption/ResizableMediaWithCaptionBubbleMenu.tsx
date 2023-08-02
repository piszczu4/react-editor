import { BubbleMenu, Editor, getNodeAttributes } from "@tiptap/react";

type ResizableMediaWithCaptionBubbleMenuProps = { editor: Editor };

export function ResizableMediaWithCaptionBubbleMenu({
	editor,
}: ResizableMediaWithCaptionBubbleMenuProps) {
	return (
		<BubbleMenu
			pluginKey={"resizableMediaWithCaptionBubbleMenu"}
			editor={editor}
			tippyOptions={{ maxWidth: "100%" }}
			updateDelay={0}
			shouldShow={(props) => {
				return props.editor.isActive("resizableMediaWithCaption");
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
								editor.commands.updateAttributes("resizableMedia", {
									width: "100%",
								});
								editor.commands.updateAttributes("resizableMediaWithCaption", {
									width: "50%",
								});
							}}
						>
							<span>50%</span>
						</button>

						<button
							type="button"
							className="flex--item s-btn mr4"
							title=""
							onClick={() =>
								editor.commands.updateAttributes("resizableMediaWithCaption", {
									width: "75%",
								})
							}
						>
							<span>75%</span>
						</button>

						<button
							type="button"
							className="flex--item s-btn mr4"
							title=""
							onClick={() =>
								editor.commands.updateAttributes("resizableMediaWithCaption", {
									width: "100%",
								})
							}
						>
							<span>100%</span>
						</button>

						<button
							type="button"
							className="flex--item s-btn mr4"
							title=""
							onClick={() =>
								editor.commands.updateAttributes("resizableMediaWithCaption", {
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
								editor.commands.updateAttributes("resizableMediaWithCaption", {
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
								editor.commands.updateAttributes("resizableMediaWithCaption", {
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
								editor.commands.updateAttributes("resizableMediaWithCaption", {
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
								editor.commands.updateAttributes("resizableMediaWithCaption", {
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
							onClick={() =>
								editor.commands.resetAttributes("resizableMedia", [
									"data-rotate",
									"data-rotate-x",
									"data-rotate-y",
									"width",
									"height",
								])
							}
						>
							<span>Reset </span>
						</button>
					</div>
				</div>
			</span>
		</BubbleMenu>
	);
}
