import "./App.scss";
import "./styles/buttons.scss";
import "./styles/tippy.scss";
import "./styles/details.scss";
import "./styles/math.scss";

import "tippy.js/animations/scale-extreme.css";
import "tippy.js/animations/shift-toward-subtle.css";

import { MenuBar } from "./components/MenuBar";

// Extensions
import { Blockquote } from "./extensions/extension-blockquote";
import { BulletList } from "./extensions/extension-bullet-list";
import { ClearFormatting } from "./extensions/extension-clear-formatting/clear-formatting";
import { Code } from "./extensions/extension-code/code";
import { CodeBlock } from "./extensions/extension-code-block";
import { Color } from "./extensions/extension-color";
import FontFamily from "@tiptap/extension-font-family";

import { FontSize } from "./extensions/extension-font-size";

import Heading from "@tiptap/extension-heading";
import { HelpButton } from "./components/MenuBar/Buttons/InfoButton";
import { Highlight } from "./extensions/extension-highlight";
import { HorizontalRule } from "./extensions/extension-horizontal-rule";
import { Indent } from "./extensions/extension-indent";
import { Keyboard } from "./extensions/extension-keyboard";
import ListItem from "@tiptap/extension-list-item";
import { MathDisplay } from "./extensions/extension-math/math-display";
import { MathInline } from "./extensions/extension-math/math-inline";

import { OrderedList } from "./extensions/extension-ordered-list";

import { RedoButton } from "./components/MenuBar/Buttons/RedoButton";
import { Spoiler } from "./extensions/extension-spoiler";
import StarterKit from "@tiptap/starter-kit";

import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";

import TaskItem from "@tiptap/extension-task-item";

import { TaskList } from "./extensions/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";

import Underline from "@tiptap/extension-underline";
import { UndoButton } from "./components/MenuBar/Buttons/UndoButton";

// import {
// 	Details,
// 	DetailsSummary,
// 	DetailsContent,
// } from "./extensions/extension-details";

import Details from "@tiptap-pro/extension-details";
import DetailsSummary from "@tiptap-pro/extension-details-summary";
import DetailsContent from "@tiptap-pro/extension-details-content";

import Mention from "@tiptap/extension-mention";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import { Caption } from "./extensions/extension-caption";
import CodeIndent from "./extensions/extension-code-indent";
import CodeView from "./extensions/extension-code-view";
import { CustomCommands } from "./extensions/extension-custom-commands/custom-commands";
import suggestion from "./extensions/extension-mention/suggestion";
// import { ResizableMedia } from "./extensions/extension-resizable-media";
// import { ResizableMediaWithCaptionBubbleMenu } from "./extensions/extension-resizable-media-with-caption/ResizableMediaWithCaptionBubbleMenu";
// import { ResizableMediaWithCaption } from "./extensions/extension-resizable-media-with-caption/resizable-media-with-caption";
// import { ImageButton } from "./extensions/extension-resizable-media/ImageUpload";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
// import { Panel, PanelType } from "./extensions/extension-panel/panel";
import { Table } from "./extensions/extension-table";
import { TableCell } from "./extensions/extension-table-cell";

import { useEffect, useRef, useState } from "react";
import { TableCellBubbleMenu } from "./components/BubbleMenus/TableCellBubbleMenu";

import { Editor } from "@tiptap/react";

import { Link } from "./extensions/extension-link/link";

import codemirror from "codemirror";
import "codemirror/addon/edit/closetag.js"; // autoCloseTags
import "codemirror/addon/selection/active-line.js"; // require active-line.js
import "codemirror/lib/codemirror.css"; // import base style
import "codemirror/mode/xml/xml.js"; // language

// import "@stackoverflow/stacks/dist/js/stacks.min.js";

import { Resizer } from "./components/Resizer";
import { TrailingNode } from "./extensions/extension-trailing-node";
import { initialContent } from "./initialContent";

import { PanelBubbleMenu } from "./components/BubbleMenus/PanelBubbleMenu";
import { Panel } from "./extensions/extension-panel/panel";
// import { setMediaWithCaption } from "./Extensions/extension-resizable-media-with-caption/resizable-media-with-caption";

import "tippy.js/animations/shift-toward-subtle.css";
import { MathPanelBubbleMenu } from "./components/BubbleMenus/MathPanelBubbleMenu";
import { MathPanel } from "./extensions/extension-math-panel/math-panel";
import { MathPanelBody } from "./extensions/extension-math-panel/math-panel-body";
import { MathPanelName } from "./extensions/extension-math-panel/math-panel-name";

import { LinkBubbleMenu } from "./components/BubbleMenus/LinkBubbleMenu";
import { FlagIcon } from "./components";
import { FigureBubbleMenu } from "./components/BubbleMenus/FigureBubbleMenu";
import { MathBubbleMenu } from "./components/BubbleMenus/MathBubbleMenu";
import { TableBubbleMenu } from "./components/BubbleMenus/TableBubbleMenu";
import { VideoBubbleMenu } from "./components/BubbleMenus/VideoBubbleMenu";
import Figure from "./extensions/extension-figure";
import Iframe from "./extensions/extension-iframe";
import Image from "./extensions/extension-image";
import { Commands } from "./extensions/extension-commands";

const App = () => {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				bulletList: false,
				orderedList: false,
				heading: false,
				code: false,
				codeBlock: false,
				blockquote: false,
				horizontalRule: false,
				// document: false,
			}),
			// Doc,
			// DBlock,
			Color.configure({ types: [TextStyle.name, ListItem.name] }),
			Highlight.configure({ multicolor: true }),
			TextStyle,
			Underline,
			Blockquote,
			Code,
			CodeBlock,
			Commands,
			Subscript,
			Superscript,
			Heading,
			HorizontalRule,
			FontFamily,
			FontSize,
			Link,
			MathPanel,
			ClearFormatting,
			MathPanelName,
			MathPanelBody,
			Mention.configure({ suggestion }),
			OrderedList,
			BulletList,
			Iframe,
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
			Details.configure({
				HTMLAttributes: {
					class: "mw-editor-details",
				},
			}),
			DetailsSummary.configure({
				HTMLAttributes: {
					class: "mw-editor-details__summary",
				},
			}),
			DetailsContent,
			// Media,
			Figure,
			Caption,
			Image,
			Table.configure({
				resizable: true,
			}),
			TableCell,
			TableRow,
			MathInline,
			MathDisplay,
			TableHeader,
			TrailingNode,
			new CodeView({
				codemirror,
				codemirrorOptions: {
					styleActiveLine: true,
					autoCloseTags: true,
				},
			}),
			// Placeholder.configure({
			// 	includeChildren: true,
			// 	showOnlyCurrent: true,

			// 	placeholder: ({ node }) => {
			// 		if (node.type.name === "detailsSummary") {
			// 			return "Summary";
			// 		}

			// 		return "";
			// 	},
			// }),
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
				<div id="editor-footer">
					<div className="editor-buttons">
						{editor && <UndoButton editor={editor} />}
						{editor && <RedoButton editor={editor} />}
						<div className="mw-separator"></div>
						<HelpButton />
					</div>
					<button className="issue-btn mw-btn">
						<FlagIcon />
					</button>
				</div>
			}

			{
				<div className={isFullscreenMode ? "d-none" : ""}>
					<Resizer
						targetId={isCodeViewMode ? "codemirror" : "editor-content"}
					/>
				</div>
			}
			<div id="modal-container" style={{ zIndex: 5000 }}></div>
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
			{/* {editor ? <MediaBubbleMenu editor={editor} /> : null} */}
			{editor && <FigureBubbleMenu editor={editor} />}
			{editor ? <TableCellBubbleMenu editor={editor} /> : null}
			{editor ? <PanelBubbleMenu editor={editor} /> : null}
			{editor ? <MathPanelBubbleMenu editor={editor} /> : null}
			{editor && <MathBubbleMenu editor={editor} />}
			{editor && <TableBubbleMenu editor={editor} />}
			{editor && <VideoBubbleMenu editor={editor} />}
		</div>
	);
};

export default App;
