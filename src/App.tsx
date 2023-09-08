import { Editor } from "@tiptap/react";
import { EditorContent, useEditor } from "@tiptap/react";
import { initialContent } from "./initialContent";
import { useEffect, useRef, useState } from "react";

// Components
import { MenuBar } from "./components/MenuBar";
import { FlagIcon } from "./components/Icons";

// Functions/Other
import { _t } from "./helpers/strings";
import codemirror from "codemirror";
import "codemirror/addon/edit/closetag.js"; // autoCloseTags
import "codemirror/addon/selection/active-line.js"; // require active-line.js
import "codemirror/lib/codemirror.css"; // import base style
import "codemirror/mode/xml/xml.js"; // language

// Extensions

import { Blockquote } from "./extensions/extension-blockquote";
import { BulletList } from "./extensions/extension-bullet-list";
import { Caption } from "./extensions/extension-caption";
import { ClearFormatting } from "./extensions/extension-clear-formatting/clear-formatting";
import { CodeBlock } from "./extensions/extension-code-block";
import { Code } from "./extensions/extension-code/code";
import { CodeView } from "./extensions/extension-code-view";
import { Color } from "./extensions/extension-color";
import { Commands } from "./extensions/extension-commands";
import Emoji, { gitHubEmojis } from "@tiptap-pro/extension-emoji";
import { Figure } from "./extensions/extension-figure";
import FontFamily from "@tiptap/extension-font-family";
import { FontSize } from "./extensions/extension-font-size";
import Heading from "@tiptap/extension-heading";
import { Iframe } from "./extensions/extension-iframe";
import { HelpButton } from "./components/MenuBar/Buttons/InfoButton";
import { Highlight } from "./extensions/extension-highlight";
import { HorizontalRule } from "./extensions/extension-horizontal-rule";
import { Image } from "./extensions/extension-image";
import { Indent } from "./extensions/extension-indent";
import { Keyboard } from "./extensions/extension-keyboard";
import { Link } from "./extensions/extension-link/link";
import ListItem from "@tiptap/extension-list-item";
import { MathDisplay } from "./extensions/extension-math/math-display";
import { MathInline } from "./extensions/extension-math/math-inline";
import { MathPanel } from "./extensions/extension-math-panel/math-panel";
import { MathPanelBody } from "./extensions/extension-math-panel/math-panel-body";
import { MathPanelName } from "./extensions/extension-math-panel/math-panel-name";
import { OrderedList } from "./extensions/extension-ordered-list";
import { Panel } from "./extensions/extension-panel/panel";
import { RedoButton } from "./components/MenuBar/Buttons/RedoButton";
import { Spoiler } from "./extensions/extension-spoiler";
import StarterKit from "@tiptap/starter-kit";
import { Strike } from "./extensions/extension-strike";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TaskItem from "@tiptap/extension-task-item";
import { TaskList } from "./extensions/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { TrailingNode } from "./extensions/extension-trailing-node";
import Underline from "@tiptap/extension-underline";
import { UndoButton } from "./components/MenuBar/Buttons/UndoButton";

// Bubble menus
import { ImageFigureBubbleMenu } from "./components/BubbleMenus/ImageFigureBubbleMenu";
import { LinkBubbleMenu } from "./components/BubbleMenus/LinkBubbleMenu";
import { MathBubbleMenu } from "./components/BubbleMenus/MathBubbleMenu";
import { MathPanelBubbleMenu } from "./components/BubbleMenus/MathPanelBubbleMenu";
import { PanelBubbleMenu } from "./components/BubbleMenus/PanelBubbleMenu";

import { common, createLowlight } from "lowlight";
// load all highlight.js languages
const lowlight = createLowlight(common);

// import {
// 	Details,
// 	DetailsSummary,
// 	DetailsContent,
// } from "./extensions/extension-details";

import Details from "@tiptap-pro/extension-details";
import DetailsContent from "@tiptap-pro/extension-details-content";
import DetailsSummary from "@tiptap-pro/extension-details-summary";

import Mention from "@tiptap/extension-mention";
import Placeholder from "@tiptap/extension-placeholder";
import CodeIndent from "./extensions/extension-code-indent";
import suggestion from "./extensions/extension-mention/suggestion";
import emojiSuggestion from "./extensions/extension-emoji/suggestion";
// import { ResizableMedia } from "./extensions/extension-resizable-media";
// import { ResizableMediaWithCaptionBubbleMenu } from "./extensions/extension-resizable-media-with-caption/ResizableMediaWithCaptionBubbleMenu";
// import { ResizableMediaWithCaption } from "./extensions/extension-resizable-media-with-caption/resizable-media-with-caption";
// import { ImageButton } from "./extensions/extension-resizable-media/ImageUpload";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
// import { Panel, PanelType } from "./extensions/extension-panel/panel";
import { Table } from "./extensions/extension-table";
import { TableCell } from "./extensions/extension-table-cell";

import { TableCellBubbleMenu } from "./components/BubbleMenus/TableCellBubbleMenu";

import { Resizer } from "./components/Resizer";

// import { setMediaWithCaption } from "./Extensions/extension-resizable-media-with-caption/resizable-media-with-caption";

import { TableBubbleMenu } from "./components/BubbleMenus/TableBubbleMenu";
import { VideoBubbleMenu } from "./components/BubbleMenus/VideoFigureBubbleMenu";
import { Math } from "./extensions/extension-math/math";
import { KeyboardShortcuts } from "./extensions/extension-keyboard-shortcuts";

const App = () => {
	const editor = useEditor({
		extensions: [
			MathDisplay,
			MathInline,
			Math,
			KeyboardShortcuts,

			StarterKit.configure({
				bulletList: false,
				orderedList: false,
				heading: false,
				code: false,
				codeBlock: false,
				blockquote: false,
				horizontalRule: false,
				listItem: false,
				strike: false,
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
			CodeBlock.configure({
				lowlight,
				defaultLanguage: "csharp",
				HTMLAttributes: { class: "s-code-block" },
			}),
			Commands,
			Subscript,
			Superscript,
			Heading,
			HorizontalRule,
			FontFamily,
			FontSize,
			Link,
			ClearFormatting,
			Mention.configure({ suggestion }),
			OrderedList,
			BulletList,
			Iframe,
			Indent,
			ListItem,
			MathPanelName,
			MathPanelBody,
			MathPanel,
			Spoiler,
			CodeIndent,
			Panel,
			Keyboard,
			Emoji.configure({
				emojis: gitHubEmojis,
				suggestion: emojiSuggestion,
			}),
			TaskList,
			TaskItem.configure({
				nested: true,
				onReadOnlyChecked: () => false,
			}),
			TextAlign.configure({ types: ["paragraph", "heading"] }),
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
			Figure,
			Strike,
			Caption,
			Image,
			Table.configure({
				resizable: true,
			}),
			TableCell,
			TableRow,
			TableHeader,
			TrailingNode,
			new CodeView({
				codemirror,
				codemirrorOptions: {
					styleActiveLine: true,
					autoCloseTags: true,
				},
			}),
			Placeholder.configure({
				includeChildren: true,
				showOnlyCurrent: false,

				placeholder: ({ node, editor }) => {
					if (node.type.name === "detailsSummary") {
						return "Summary";
					}

					if (node.type.name === "paragraph" && editor.state.doc.nodeSize === 4)
						return _t("placeholders.empty_editor");
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
			state.setValue(editor.getHTML()); // init content
			// state.setValue(editor.view.dom.innerHTML); // init content

			// Format code
			state.execCommand("selectAll");
			const selectedRange = {
				from: state.getCursor(true),
				to: state.getCursor(false),
			};
			// state.autoFormatRange(selectedRange.from, selectedRange.to);
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
		<>
			{
				<div
					className={`mw-editor--fullscreen-background ${
						!isFullscreenMode ? "d-none" : ""
					}`}
				/>
			}
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
						className={`mw-editor__codemirror ${
							isCodeViewMode ? "" : "d-none"
						}`}
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

				{editor && <LinkBubbleMenu editor={editor} href="" />}
				{editor && <ImageFigureBubbleMenu editor={editor} />}
				{editor && <TableCellBubbleMenu editor={editor} />}
				{editor && <PanelBubbleMenu editor={editor} />}
				{editor && <MathPanelBubbleMenu editor={editor} />}
				{editor && <MathBubbleMenu editor={editor} />}
				{editor && <TableBubbleMenu editor={editor} />}
				{editor && <VideoBubbleMenu editor={editor} />}
			</div>
		</>
	);
};

export default App;
