import { BubbleMenu, Editor } from "@tiptap/react";

type MediaBubbleMenuProps = { editor: Editor };

export function MediaBubbleMenu({ editor }: MediaBubbleMenuProps) {
	return (
		<BubbleMenu
			pluginKey={"mediaBubbleMenu"}
			editor={editor}
			tippyOptions={{ maxWidth: "100%" }}
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
								editor.commands.updateAttributes("media", {
									width: "100%",
								});
								editor.commands.updateAttributes("media", {
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
								editor.commands.updateAttributes("media", {
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
								editor.commands.updateAttributes("media", {
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
								editor.commands.updateAttributes("media", {
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
								editor.commands.updateAttributes("media", {
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
								editor.commands.updateAttributes("media", {
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
								editor.commands.updateAttributes("media", {
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
								editor.commands.updateAttributes("media", {
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
								editor.commands.resetAttributes("media", [
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
