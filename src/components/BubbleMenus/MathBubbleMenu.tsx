import { useEffect } from "react";

import { useRef } from "react";

import { BubbleMenu, Editor } from "@tiptap/react";

import "tippy.js/dist/svg-arrow.css";

import katex from "katex";

type MathBubbleMenuProps = {
	editor: Editor;
};

export function MathBubbleMenu({ editor }: MathBubbleMenuProps) {
	let textRef = useRef<any>(null);

	useEffect(() => {
		let pos = editor.state.selection.from;
		let node = editor.state.doc.nodeAt(pos);
		let text = node?.textContent as string;
		if (text === undefined) {
			return;
		}
		let displayMode = node?.type.name === "math_display";

		if (text === "") {
			textRef.current.innerText = "(empty)";
			textRef.current.style.color = "red";
		} else {
			textRef.current.style.color = "unset";

			try {
				katex.render(text, textRef.current, {
					displayMode: displayMode,
					globalGroup: true,
				});
			} catch (err: any) {
				textRef.current.innerText = err.toString();
			}
		}

		let width = document.getElementById("editor-content")?.clientWidth;
		if (displayMode) {
			if (textRef.current) textRef.current.style.width = width! * 0.9 + "px";
		} else {
			if (textRef.current) textRef.current.style.width = "unset";
		}
	});

	return (
		<BubbleMenu
			pluginKey={"mathBubbleMenu"}
			editor={editor}
			tippyOptions={{
				maxWidth: "100%",
				duration: 200,
				animation: "shift-toward-subtle",
				moveTransition: "transform 0.2s ease-in-out",
				arrow: true,
				placement: "bottom",
				getReferenceClientRect: () => {
					// let pos = findNodePos(editor, "math_inline");
					// if (!pos) pos = findNodePos(editor, "math_display"); //editor.state.selection.from;
					let pos = editor.state.selection.from;
					let node = editor.view.nodeDOM(pos!) as HTMLElement;

					return node.getBoundingClientRect();
				},
			}}
			shouldShow={(props) => {
				return (
					props.editor.isActive("math_display") ||
					props.editor.isActive("math_inline")
				);
			}}
		>
			<div id="math-preview">
				<p>
					<span className="label">Preview</span>
				</p>
				<p ref={textRef} className="preview"></p>
			</div>
		</BubbleMenu>
	);
}
