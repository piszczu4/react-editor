import "./App.scss";

import { MenuBar } from "./components/MenuBar";

import { BulletList } from "./extensions/extension-bullet-list";
import { Heading } from "./extensions/extension-heading";
import { OrderedList } from "./extensions/extension-ordered-list";

import Details from "@tiptap-pro/extension-details";
import DetailsContent from "@tiptap-pro/extension-details-content";
import DetailsSummary from "@tiptap-pro/extension-details-summary";
import { Color } from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import ListItem from "@tiptap/extension-list-item";
import Mention from "@tiptap/extension-mention";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Capitalize from "./extensions/extension-capitalize";
import { Caption } from "./extensions/extension-caption";
import CodeIndent from "./extensions/extension-code-indent";
import CodeView from "./extensions/extension-code-view";
import { CustomCommands } from "./extensions/extension-custom-commands/custom-commands";
import Indent from "./extensions/extension-indent";
import Keyboard from "./extensions/extension-keyboard";
import suggestion from "./extensions/extension-mention/suggestion";
// import { ResizableMedia } from "./extensions/extension-resizable-media";
// import { ResizableMediaWithCaptionBubbleMenu } from "./extensions/extension-resizable-media-with-caption/ResizableMediaWithCaptionBubbleMenu";
// import { ResizableMediaWithCaption } from "./extensions/extension-resizable-media-with-caption/resizable-media-with-caption";
// import { ImageButton } from "./extensions/extension-resizable-media/ImageUpload";
import Spoiler from "./extensions/extension-spoiler";

import { Media, MediaBubbleMenu } from "./extensions/extension-media";

import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import { DBlock } from "./extensions/extension-dBlock";
// import { Panel, PanelType } from "./extensions/extension-panel/panel";
import { Table } from "./extensions/extension-table";
import { TableCell } from "./extensions/extension-table-cell";

import { Document as Doc } from "./extensions/extension-document";
import { TableBubbleMenu } from "./extensions/extension-table/TableBubbleMenu";

import { useEffect, useRef, useState } from "react";

import { Editor } from "@tiptap/react";

import { FontSize } from "./extensions/extension-font-size";
import { Link } from "./extensions/extension-link/link";

import codemirror from "codemirror";
import "codemirror/addon/edit/closetag.js"; // autoCloseTags
import "codemirror/addon/selection/active-line.js"; // require active-line.js
import "codemirror/lib/codemirror.css"; // import base style
import "codemirror/mode/xml/xml.js"; // language

// import "@stackoverflow/stacks/dist/js/stacks.min.js";

import { LinkBubbleMenu } from "./components/LinkEditorModal";

import { Resizer } from "./components/Resizer";
import { initialContent } from "./initialContent";
import { TrailingNode } from "./extensions/extension-trailing-node";

import { Resizable, ResizableBox } from "react-resizable";

import Highlight from "@tiptap/extension-highlight";
import { Panel } from "./extensions/extension-panel/panel";
import { PanelBubbleMenu } from "./extensions/extension-panel/PanelBubbleMenu";

// import { setMediaWithCaption } from "./Extensions/extension-resizable-media-with-caption/resizable-media-with-caption";

import "tippy.js/animations/shift-toward-subtle.css";
import { MathPanel } from "./extensions/extension-math-panel/math-panel";
import { MathPanelBody } from "./extensions/extension-math-panel/math-panel-body";
import { MathPanelName } from "./extensions/extension-math-panel/math-panel-name";
import { MathPanelBubbleMenu } from "./extensions/extension-math-panel/MathPanelBubbleMenu";
import { MathInline } from "./extensions/extension-math/math-inline";
import { MathDisplay } from "./extensions/extension-math/math-display";

const App = () => {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				bulletList: false,
				orderedList: false,
				heading: false,
				// document: false,
			}),
			// Doc,
			// DBlock,
			Color.configure({ types: [TextStyle.name, ListItem.name] }),
			Highlight.configure({ multicolor: true }),
			TextStyle,
			Underline,
			Subscript,
			Superscript,
			Capitalize,
			Heading,
			FontFamily,
			FontSize,
			Link,
			MathPanel,
			MathPanelName,
			MathPanelBody,
			Mention.configure({ suggestion }),
			OrderedList,
			BulletList,
			Indent,
			Spoiler,
			CodeIndent,
			Panel,
			Keyboard,
			TaskList,
			TaskItem.configure({
				nested: true,
			}),
			TextAlign.configure({ types: ["paragraph", "heading"] }),
			CustomCommands,
			Details,
			DetailsSummary,
			DetailsContent,
			Media,
			Caption,
			Table.configure({
				resizable: true,
			}),
			TableCell,
			TableRow,
			MathInline,
			MathDisplay,
			TableHeader,
			// TrailingNode,
			new CodeView({
				codemirror,
				codemirrorOptions: {
					styleActiveLine: true,
					autoCloseTags: true,
				},
			}),
			Placeholder.configure({
				includeChildren: true,
				showOnlyCurrent: true,

				placeholder: ({ node }) => {
					if (node.type.name === "detailsSummary") {
						return "Summary";
					}

					return "Write something...";
				},
			}),
		],
		onFocus: () => {
			let container = document.getElementById(
				"editor-container"
			) as HTMLElement;
			container.classList.add("bs-ring", "bc-blue-300");
			return false;
		},
		onBlur: () => {
			let container = document.getElementById(
				"editor-container"
			) as HTMLElement;
			container.classList.remove("bs-ring", "bc-blue-300");
			return false;
		},

		content: initialContent,
	});

	// Code View
	const [isCodeViewMode, setIsCodeViewMode] = useState<boolean>(false);
	let cmTextAreaRef = useRef(null);
	let [cmInstance, setCmInstance] = useState<any>(null);

	useEffect(() => {
		if (!editor) return;
		let state = cmInstance;
		if (isCodeViewMode && !cmInstance) {
			const codeView = (editor as Editor).extensionManager.extensions.find(
				(e) => e.name === "code_view"
			);
			if (codeView) {
				const { codemirror, codemirrorOptions } = codeView.options;
				if (codemirror) {
					// merge options
					const cmOptions = {
						...codemirrorOptions,
						readOnly: !(editor as Editor).isEditable,
					};

					state = codemirror.fromTextArea(cmTextAreaRef.current, cmOptions);
					setCmInstance(state);
				}
			}
		}

		if (isCodeViewMode) {
			state.setValue((editor as Editor).getHTML()); // init content
			// Format code
			state.execCommand("selectAll");
			const selectedRange = {
				from: state.getCursor(true),
				to: state.getCursor(false),
			};
			state.autoFormatRange(selectedRange.from, selectedRange.to);
			state.setCursor(0);
		} else {
			if (!state) return;
			const content = state.getValue();
			(editor as Editor).commands.setContent(content, true);
			// Destroy code mirror
			const element = state.doc.cm.getWrapperElement();
			element && element.remove && element.remove();
			setCmInstance(null);
			state = null;
		}
	}, [isCodeViewMode]);

	const [isFullscreenMode, setIsFullscreenMode] = useState(false);

	return (
		<div
			id="editor-container"
			className={`mw-textarea ${
				isFullscreenMode ? "mw-editor--fullscreen" : ""
			}`}
		>
			<MenuBar
				editor={editor as Editor}
				isCodeViewMode={isCodeViewMode}
				setIsCodeViewMode={setIsCodeViewMode}
				isFullscreenMode={isFullscreenMode}
				setIsFullscreenMode={setIsFullscreenMode}
			/>

			<div
				id="editor-content"
				className={`s-prose ProseMirror ${!isCodeViewMode ? "" : "d-none"}`}
			>
				<EditorContent editor={editor} />
			</div>

			{isCodeViewMode && (
				<div
					id="codemirror"
					className={`mw-editor__codemirror ${isCodeViewMode ? "" : "d-none"}`}
				>
					<textarea ref={cmTextAreaRef}></textarea>
				</div>
			)}

			{/* {!isCodeViewMode && !isFullscreenMode && (
				<div>Empty div...</div>
				// <Resizer targetId={"editor-content"} />
			)} */}

			{
				<div className={isFullscreenMode ? "d-none" : ""}>
					<Resizer
						targetId={isCodeViewMode ? "codemirror" : "editor-content"}
					/>
				</div>
			}

			{/* {editor ? (
				<div id="editor-dialog" role="dialog">
					<div
						data-controller="s-modal"
						id="modal-base"
						// data-s-modal-return-element="#mw-content"
					>
						<aside
							id="link-editor"
							className="s-modal"
							data-s-modal-target="modal"
							role="dialog"
							aria-labelledby="modal-title"
							aria-describedby="modal-description"
							aria-hidden="true"
						></aside>
					</div>
				</div>
			) : null} */}

			{editor ? <LinkBubbleMenu editor={editor} href="" /> : null}
			{/* {editor ? <ImageBubbleMenu editor={editor} /> : null} */}
			{editor ? <MediaBubbleMenu editor={editor} /> : null}
			{editor ? <TableBubbleMenu editor={editor} /> : null}
			{editor ? <PanelBubbleMenu editor={editor} /> : null}
			{editor ? <MathPanelBubbleMenu editor={editor} /> : null}
		</div>
	);
};

export default App;
