import { useEffect, useState } from "react";

import { TextSelection } from "prosemirror-state";
import { _t } from "../../helpers/strings";
import { showModal } from "@stackoverflow/stacks";
import { useRef } from "react";

import { BubbleMenu, Editor } from "@tiptap/react";
import { findNodePos } from "../../utils";

import "tippy.js/dist/svg-arrow.css";

import { getMarkAttributes, getMarkRange } from "@tiptap/react";
import { LinkModal } from "../Modals/LinkModal";

import katex from "katex";

function _interopDefaultLegacy(e: any) {
	return e && typeof e === "object" && "default" in e ? e : { default: e };
}

var katex__default = /*#__PURE__*/ _interopDefaultLegacy(katex);

type MathBubbleMenuProps = {
	editor: Editor;
};

export function MathBubbleMenu({ editor }: MathBubbleMenuProps) {
	let pos = findNodePos(editor, "math_inline");
	let displayMode = false;
	if (!pos) {
		displayMode = true;
		pos = findNodePos(editor, "math_display");
	}
	let node;
	let text: string = "";
	if (pos && pos !== -1) {
		node = editor.state.doc.nodeAt(pos!);
		text = node?.textContent ?? "";
		console.log(node?.textContent);
	}

	let textRef = useRef<any>(null);

	useEffect(() => {
		try {
			katex.render(text, textRef.current, {
				displayMode: displayMode,
				globalGroup: true,
			});
		} catch (err: any) {
			textRef.current.innerText = err.toString();
		}

		let root = document.querySelector("[data-tippy-root]") as HTMLElement;
		// if (displayMode) {
		// 	if (root) root.style.width = "90%";
		// } else {
		// 	if (root) root.style.width = "unset";
		// }
	});

	// let [text, setText] = useState(node?.textContent ?? "\\frac{1}{2}");

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

				// onShown() {
				// 	let pos = findNodePos(editor, "math_inline");
				// 	node = editor.state.doc.nodeAt(pos!);
				// 	console.log(node);

				// 	if (node) {
				// 		katex.render(
				// 			text,
				// 			document.getElementById("math-preview") as HTMLElement
				// 		);
				// 		setText(node.textContent);
				// 	}
				// },
				getReferenceClientRect: () => {
					let pos = findNodePos(editor, "math_inline");
					pos = pos ?? findNodePos(editor, "math_display");
					let closestNode = editor.view.nodeDOM(pos!) as HTMLElement;

					return closestNode.getBoundingClientRect();
				},
			}}
			shouldShow={(props) => {
				return (
					props.editor.isActive("math_display") ||
					props.editor.isActive("math_inline")
				);
			}}
		>
			<p ref={textRef} id="math-preview"></p>
		</BubbleMenu>
	);
}
