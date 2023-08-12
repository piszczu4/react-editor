import { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react";
type ImageBubbleMenuProps = { editor: Editor };

export function ImageBubbleMenu({ editor }: ImageBubbleMenuProps) {
	// const linkAttrs = getNodeAttributes(editor.state, "resizableMedia");

	return (
		<BubbleMenu
			pluginKey={"imageBubbleMenu"}
			editor={editor}
			tippyOptions={{ maxWidth: "100%" }}
			updateDelay={0}
			shouldShow={(props) => {
				return true; // props.editor.isActive("media");
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
							onClick={() =>
								editor.commands.updateAttributes("resizableMedia", {
									width: "50%",
								})
							}
						>
							<span>50%</span>
						</button>

						<button
							type="button"
							className="flex--item s-btn mr4"
							title=""
							onClick={() =>
								editor.commands.updateAttributes("resizableMedia", {
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
								editor.commands.updateAttributes("resizableMedia", {
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
								editor.commands.updateAttributes("resizableMedia", {
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
								editor.commands.updateAttributes("resizableMedia", {
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
								editor.commands.updateAttributes("resizableMedia", {
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
								editor.commands.updateAttributes("resizableMedia", {
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
								editor.commands.updateAttributes("resizableMedia", {
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
							onClick={() =>
								editor.commands.updateAttributes("resizableMedia", {
									caption: "Dupa",
								})
							}
						>
							<span>Toggle Caption</span>
						</button>
					</div>
				</div>
			</span>
		</BubbleMenu>
	);
}
