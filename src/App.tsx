import "./styles.scss";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import FontFamily from "@tiptap/extension-font-family";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Placeholder from "@tiptap/extension-placeholder";
import CodeIndent from "./Extensions/extension-code-indent";
import TextAlign from "@tiptap/extension-text-align";
import Indent from "./Extensions/extension-indent";
import Mention from "@tiptap/extension-mention";
import suggestion from "./Extensions/extension-mention/suggestion";
import { CustomCommands } from "./Extensions/extension-custom-commands/custom-commands";
import { EditorContent, isActive, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Capitalize from "./Extensions/extension-capitalize";
import Details from "@tiptap-pro/extension-details";
import DetailsSummary from "@tiptap-pro/extension-details-summary";
import DetailsContent from "@tiptap-pro/extension-details-content";
import Keyboard from "./Extensions/extension-keyboard";
import Spoiler from "./Extensions/extension-spoiler";
import CodeView from "./Extensions/extension-code-view";
import { showImageUploader } from "./Extensions/extension-resizable-media/ImageUpload";
import { ResizableMedia } from "./Extensions/extension-resizable-media";
import { ImageButton } from "./Extensions/extension-resizable-media/ImageUpload";
import { Caption } from "./Extensions/extension-caption";
import { ResizableMediaWithCaption } from "./Extensions/extension-resizable-media-with-caption/resizable-media-with-caption";
import { ResizableMediaWithCaptionBubbleMenu } from "./Extensions/extension-resizable-media-with-caption/ResizableMediaWithCaptionBubbleMenu";

import { Media, MediaBubbleMenu } from "./Extensions/extension-media";

import { Table } from "./Extensions/extension-table";
import { TableCell } from "./Extensions/extension-table-cell";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";

import { TableBubbleMenu } from "./Extensions/extension-table/TableBubbleMenu";

import React, {
	useRef,
	useState,
	useImperativeHandle,
	useEffect,
	useMemo,
} from "react";

import { Editor } from "@tiptap/react";
import { MenuButton } from "./components/MenuButton";
import MenuBlock from "./components/MenuBlock";

import { _t } from "./helpers/strings";
import { getShortcut } from "@stackoverflow/stacks-editor/dist/shared/utils";
import { MenuSplitButton } from "./components/MenuSplitButton";
import { MenuDropdownButton } from "./components/MenuDropdownButton";
import { MenuDropdownItem } from "./components/MenuDropdownItem";

import { Level } from "@tiptap/extension-heading";
import { escapeHTML } from "@stackoverflow/stacks-editor/dist/shared/utils";
import { FontSize } from "./Extensions/extension-font-size";
import { Link } from "./Extensions/extension-link/link";
import { orderedList } from "@tiptap/pm/schema-list";
import { getMarkType } from "@tiptap/react";
import { isTextSelection } from "@tiptap/react";

import { Node, NodeType, ResolvedPos } from "@tiptap/pm/model";
import DropdownSection from "./components/DropdownSection";

import { EditorState, TextSelection } from "@tiptap/pm/state";

import { Extension } from "@tiptap/react";
import { Range } from "@tiptap/core";
import { menuBar } from "@tiptap/pm/menu";
import { BubbleMenu } from "@tiptap/extension-bubble-menu";

import codemirror from "codemirror";
import "codemirror/lib/codemirror.css"; // import base style
import "codemirror/mode/xml/xml.js"; // language
import "codemirror/addon/selection/active-line.js"; // require active-line.js
import "codemirror/addon/edit/closetag.js"; // autoCloseTags

// import "@stackoverflow/stacks/dist/js/stacks.min.js";

import { showModal } from "@stackoverflow/stacks";
import { EditorView } from "@tiptap/pm/view";

import { showLinkEditor } from "./Extensions/extension-link/commands/showLinkEditor";

import { LinkButton, LinkBubbleMenu } from "./components/LinkEditorModal";

import { DialogModalTester, ImageBubbleMenu } from "./components/Modal";

// import { setMediaWithCaption } from "./Extensions/extension-resizable-media-with-caption/resizable-media-with-caption";

type Props = {
	editor: Editor;
	onViewChanged: any;
};

const MenuBar = ({ editor, onViewChanged }: Props) => {
	if (!editor) {
		return null;
	}

	let test = (
		<MenuButton
			key="test-btn"
			id="test-btn"
			iconName="test"
			tooltipData={{ title: "Tootlip!", placement: "top" }}
			command={() => {
				console.log(editor.getHTML());
				return true;
			}}
		/>
	);

	let keyboardButton = (
		<MenuButton
			key="keyboard-btn"
			id="keyboard-btn"
			iconName="Keyboard"
			tooltipData={{ title: "Keyboard", placement: "bottom" }}
			command={() => editor.chain().focus().toggleKeyboard().run()}
		/>
	);

	let spoilerButton = (
		<MenuButton
			key="spoiler-btn"
			id="spoiler-btn"
			iconName="Spoiler"
			tooltipData={{ title: "Spoiler", placement: "bottom" }}
			command={() => editor.chain().focus().toggleSpoiler().run()}
		/>
	);

	let detailsButton = (
		<MenuButton
			key="details-btn"
			id="details-btn"
			iconName="Details"
			tooltipData={{ title: "Details", placement: "bottom" }}
			command={() => editor.chain().focus().setDetails().run()}
		/>
	);

	let fullscreenButton = (
		<MenuButton
			key="fullscreen-btn"
			id="fullscreen-btn"
			iconName="ScreenFull"
			command={() => {
				let container = document.getElementById(
					"editor-container"
				) as HTMLDivElement;
				container.classList.toggle("mw-editor--fullscreen");
				container.classList.toggle("m0");

				document.body.classList.toggle("overflow-hidden");

				let button = document.querySelector(
					`[data-key="fullscreen-btn"]`
				) as HTMLButtonElement;
				button.classList.toggle("is-selected");

				let iconSpan = document.querySelector(
					`[data-key="fullscreen-btn__icon"]`
				) as HTMLSpanElement;

				if (container.classList.contains("mw-editor--fullscreen")) {
					iconSpan.className = "svg-icon-bg iconScreenNormal";
				} else {
					iconSpan.className = "svg-icon-bg iconScreenFull";
				}
				editor.commands.focus();
				return true;
			}}
			tooltipData={{
				title: _t("commands.bold", { shortcut: getShortcut("Mod-B") }),
			}}
		/>
	);

	let boldButton = (
		<MenuButton
			key="bold-btn"
			id="bold-btn"
			iconName="Bold"
			command={() => editor.chain().focus().toggleBold().run()}
			disabled={!editor.can().chain().focus().toggleBold().run()}
			active={editor.isActive("bold")}
			tooltipData={{
				title: _t("commands.bold", { shortcut: getShortcut("Mod-B") }),
			}}
		/>
	);

	let italicButton = (
		<MenuButton
			key="italic-btn"
			id="italic-btn"
			iconName="Italic"
			command={() => editor.chain().focus().toggleItalic().run()}
			disabled={!editor.can().chain().focus().toggleItalic().run()}
			active={editor.isActive("italic")}
			tooltipData={{
				title: _t("commands.emphasis", { shortcut: getShortcut("Mod-I") }),
			}}
		/>
	);

	let underlineButton = (
		<MenuButton
			key="underline-btn"
			id="underline-btn"
			iconName="Underline"
			command={() => editor.chain().focus().toggleUnderline().run()}
			disabled={!editor.can().chain().focus().toggleUnderline().run()}
			active={editor.isActive("underline")}
			tooltipData={{ title: _t("commands.underline") }}
		/>
	);

	let subscriptButton = (
		<MenuButton
			key="subscript-btn"
			id="subscript-btn"
			iconName="Subscript"
			command={() => editor.chain().focus().toggleSubscript().run()}
			disabled={!editor.can().chain().focus().toggleSubscript().run()}
			active={editor.isActive("subscript")}
			tooltipData={{ title: _t("commands.sub") }}
		/>
	);

	let superscriptButton = (
		<MenuButton
			key="superscript-btn"
			id="superscript-btn"
			iconName="Superscript"
			command={() => editor.chain().focus().toggleSuperscript().run()}
			disabled={!editor.can().chain().focus().toggleSuperscript().run()}
			active={editor.isActive("sueprscript")}
			tooltipData={{ title: _t("commands.sup") }}
		/>
	);

	let strikeButton = (
		<MenuButton
			key="strike-btn"
			id="strike-btn"
			iconName="Strikethrough"
			command={() => editor.chain().focus().toggleStrike().run()}
			disabled={!editor.can().chain().focus().toggleStrike().run()}
			active={editor.isActive("strike")}
			tooltipData={{ title: _t("commands.strikethrough") }}
		/>
	);

	let codeButton = (
		<MenuButton
			key="code-btn"
			id="code-btn"
			iconName="Code"
			command={() => editor.chain().focus().toggleCode().run()}
			disabled={!editor.can().chain().focus().toggleCode().run()}
			active={editor.isActive("code")}
			tooltipData={{
				title: _t("commands.inline_code.title", {
					shortcut: getShortcut("Mod-K"),
				}),
				description: _t("commands.inline_code.description"),
			}}
		/>
	);

	let codeBlockButton = (
		<MenuButton
			key="code-block-btn"
			id="code-block-btn"
			iconName="CodeblockAlt"
			command={() => editor.chain().focus().toggleCodeBlock().run()}
			active={editor.isActive("codeBlock")}
			tooltipData={{
				title: _t("commands.code_block.title", {
					shortcut: getShortcut("Mod-M"),
				}),
				description: _t("commands.code_block.description"),
			}}
		/>
	);

	let blockQuoteButton = (
		<MenuButton
			key="blockquote-btn"
			id="blockquote-btn"
			iconName="Quote"
			command={() => editor.chain().focus().toggleBlockquote().run()}
			active={editor.isActive("blockquote")}
			tooltipData={{
				title: _t("commands.blockquote", {
					shortcut: getShortcut("Mod-Q"),
				}),
			}}
		/>
	);

	let horizontalRuleButton = (
		<MenuButton
			key="horiontal-rule-btn"
			id="horiontal-rule-btn"
			iconName="HorizontalRule"
			command={() => editor.chain().focus().setHorizontalRule().run()}
			tooltipData={{
				title: _t("commands.horizontal_rule", {
					shortcut: getShortcut("Mod-R"),
				}),
			}}
		/>
	);

	// let clearNodesButton = (
	// 	<MenuButton
	// 		key="clear-nodes-btn"
	// 		id="clear-nodes-btn"
	// 		iconName="Trash"
	// 		command={() => editor.chain().focus().clearNodes().run()}
	// 		tooltipData={_t("commands.horizontal_rule", {
	// 			shortcut: getShortcut("Mod-R"),
	// 		})}
	// 	/>
	// );

	// let undoButton = (
	// 	<MenuButton
	// 		id="undo-btn"
	// 		iconName="Undo"
	// 		command={() => editor.chain().focus().undo().run()}
	// 		disabled={!editor.chain().focus().undo().run()}
	// 		tooltipData={_t("commands.undo", { shortcut: getShortcut("Mod-Z") })}
	// 	/>
	// );

	// let redoButton = (
	// 	<MenuButton
	// 		id="redo-btn"
	// 		iconName="Refresh"
	// 		command={() => editor.chain().focus().redo().run()}
	// 		disabled={!editor.chain().focus().redo().run()}
	// 		tooltipData={_t("commands.redo", { shortcut: getShortcut("Mod-Y") })}
	// 	/>
	// );

	// Text Color Split Button
	let textColorButton = (
		<MenuButton
			key="text-color-btn"
			id="text-color-btn"
			iconName="Bold"
			command={() => editor.chain().focus().toggleBold().run()}
			tooltipData={{ title: _t("commands.text_color") }}
		/>
	);

	let textColorDropdown = (
		<MenuDropdownButton
			key="text-color-dropdown-btn"
			id="text-color-dropdown-btn"
			tooltipData={{ title: _t("commands.text_color") }}
			children={[boldButton, italicButton]}
		/>
	);

	let textColorSplitButton = (
		<MenuSplitButton
			id="text-color-split-btn"
			button={textColorButton}
			dropdownButton={textColorDropdown}
		/>
	);

	let clearFormattingButton = (
		<MenuButton
			key="clear-formatting-btn"
			id="clear-formatting-btn"
			innerText="clear"
			command={() => editor.chain().focus().unsetAllMarks().run()}
			tooltipData={{ title: _t("commands.clear_formatting") }}
		/>
	);

	let headerDropdownItems = [0, 1, 2, 3, 4, 5, 6].map((lev, index) => {
		let key = lev === 0 ? "paragraph-btn" : `h${lev}-btn`;
		let html = `<${lev === 0 ? "p" : "h" + lev}>${
			lev === 0 ? "Paragraph" : "Heading " + lev
		}</${lev === 0 ? "p" : "h" + lev}>`;
		return (
			<MenuButton
				key={index}
				id={key}
				innerHTML={html}
				command={
					lev == 0
						? () => editor.chain().focus().setParagraph().run()
						: () =>
								editor
									.chain()
									.focus()
									.toggleHeading({ level: lev as Level })
									.run()
				}
				active={
					lev === 0
						? editor.isActive("paragraph")
						: editor.isActive("heading", { level: lev })
				}
				role="menuitem"
				kind="dropdown-item"
			/>
		);
	});

	let headingDropdownButton = (
		<MenuDropdownButton
			key="heading-dropdown"
			id="heading-dropdown"
			innerText="Paragraph"
			iconName={"Header"}
			active={false}
			children={headerDropdownItems}
			tooltipData={{
				title: _t("commands.heading.dropdown", {
					shortcut: getShortcut("Mod-H"),
				}),
			}}
		/>
	);

	// Font Family
	const DEFAULT_FONT_TYPE_NAMES = [
		"Arial",
		"Arial Black",
		"Georgia",
		"Impact",
		"Tahoma",
		"Times New Roman",
		"Verdana",
		"Courier New",
		"Lucida Console",
		"Monaco",
		"monospace",
	];

	let fontFamilyDropdownItems = DEFAULT_FONT_TYPE_NAMES.map((font, index) => {
		let key = "ff-" + font.toLowerCase().replace(" ", "-") + "-btn";
		let html = `<span style="font-family:${font};">${font}</span>`;

		return (
			<MenuButton
				key={index}
				id={key}
				innerHTML={html}
				command={() => {
					if (editor.isActive("textStyle", { fontFamily: font })) {
						return editor.chain().focus().unsetFontFamily().run();
					} else {
						return editor.chain().focus().setFontFamily(font).run();
					}
				}}
				active={editor.isActive("textStyle", { fontFamily: font })}
				role="menuitem"
				kind="dropdown-item"
			/>
		);
	});

	let fontFamilyDropdownButton = (
		<MenuDropdownButton
			key="font-family-dropdown"
			id="font-family-dropdown"
			innerText="sans-serif"
			iconName={"Header"}
			active={false}
			children={fontFamilyDropdownItems}
			tooltipData={{ title: _t("commands.font_family") }}
		/>
	);

	// Font Family
	const DEFAULT_FONT_SIZES: number[] = [
		8, 10, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72,
	];

	let fontSizeDropdownItems = DEFAULT_FONT_SIZES.map((size, index) => {
		let key = "fs-" + size + "-btn";
		let html = `<span style="font-size:${size}px;">${size}</span>`;

		return (
			<MenuButton
				key={index}
				id={key}
				innerHTML={html}
				command={() => editor.chain().focus().toggleFontSize(size).run()}
				active={editor.isActive("textStyle", { fontSize: size })}
				role="menuitem"
				kind="dropdown-item"
			/>
		);
	});

	let fontSizeDropdownButton = (
		<MenuDropdownButton
			key="font-size-dropdown"
			id="font-size-dropdown"
			innerText="18px"
			iconName={"Header"}
			active={false}
			children={fontSizeDropdownItems}
			tooltipData={{ title: _t("commands.font_size") }}
		/>
	);

	// Ordered List
	let orderedListButton = (
		<MenuButton
			key="ordered-list"
			id="ordered-list"
			iconName="OrderedList"
			command={() => editor.chain().focus().toggleOrderedList().run()}
			active={editor.isActive("orderedList")}
			tooltipData={{
				title: _t("commands.ordered_list", {
					shortcut: getShortcut("Mod-O"),
				}),
			}}
		/>
	);

	let orderedListDropdownItems = [
		"decimal",
		"lower-alpha",
		"lower-greek",
		"lower-roman",
		"upper-alpha",
		"upper-roman",
	].map((type, index) => {
		let command = () => {
			if (editor.isActive("orderedList")) {
				return editor
					.chain()
					.focus()
					.updateAttributes("orderedList", { type: type })
					.run();
			} else {
				return editor
					.chain()
					.focus()
					.toggleOrderedList()
					.updateAttributes("orderedList", { type: type })
					.run();
			}
		};

		return (
			<MenuButton
				id={`orderedList__${type}`}
				key={index}
				data-type={type}
				iconName={`orderedList__${type}`}
				command={command}
				disabled={
					!editor
						.can()
						.chain()
						.focus()
						.updateAttributes("orderedList", { type: type })
						.run()
				}
				active={editor.isActive("orderedList", { type: type })}
				tooltipData={type
					.split("-")
					.map((atom) => {
						return atom.charAt(0).toUpperCase() + atom.slice(1);
					})
					.join(" ")}
				kind="dropdown-item"
			/>
		);
	});

	let orderedListDropdownButton = (
		<MenuDropdownButton
			key="ordered-list-dropdown"
			id="ordered-list-dropdown"
			children={orderedListDropdownItems}
			nCols={3}
		/>
	);

	let orderedListSplitButton = (
		<MenuSplitButton
			key="ordered-list-split-button"
			id="ordered-list-split-button"
			button={orderedListButton}
			dropdownButton={orderedListDropdownButton}
		/>
	);

	// Bullet List
	let bulletListButton = (
		<MenuButton
			key="bullet-list"
			id="bullet-list"
			iconName="UnorderedList"
			command={() => editor.chain().focus().toggleBulletList().run()}
			active={editor.isActive("bulletList")}
			tooltipData={{
				title: _t("commands.unordered_list", {
					shortcut: getShortcut("Mod-U"),
				}),
			}}
		/>
	);

	let bulletListDropdownItems = ["disc", "circle", "square"].map(
		(type, index) => {
			let command = () => {
				if (editor.isActive("bulletList")) {
					return editor
						.chain()
						.focus()
						.updateAttributes("bulletList", { type: type })
						.run();
				} else {
					return editor
						.chain()
						.focus()
						.toggleOrderedList()
						.updateAttributes("bulletList", { type: type })
						.run();
				}
			};

			return (
				<MenuButton
					id={`bulletList__${type}`}
					key={index}
					data-type={type}
					iconName={`BulletList__${type}`}
					command={command}
					disabled={
						!editor
							.can()
							.chain()
							.focus()
							.updateAttributes("bulletList", { type: type })
							.run()
					}
					active={editor.isActive("bulletList", { type: type })}
					tooltipData={type.charAt(0).toUpperCase() + type.slice(1)}
					kind="dropdown-item"
				/>
			);
		}
	);

	let bulletListDropdownButton = (
		<MenuDropdownButton
			key="bullet-list-dropdown"
			id="bullet-list-dropdown"
			children={bulletListDropdownItems}
			nCols={3}
		/>
	);

	let bulletListSplitButton = (
		<MenuSplitButton
			key="bullet-list-split-button"
			id="bullet-list-split-button"
			button={bulletListButton}
			dropdownButton={bulletListDropdownButton}
		/>
	);

	let taskListButton = (
		<MenuButton
			key="task-list"
			id="task-list"
			iconName="UnorderedList"
			command={() => editor.chain().focus().toggleTaskList().run()}
			active={editor.isActive("taskList")}
			tooltipData={{ title: _t("commands.task_list") }}
		/>
	);

	// Align
	let alignDropdownItems = ["left", "center", "right", "justify"].map(
		(align, index) => {
			return (
				<MenuButton
					id={`text-align__${align}`}
					key={index}
					data-type={align}
					iconName={`TextAlign__${align}`}
					innerText={align.charAt(0).toUpperCase() + align.slice(1)}
					command={() => editor.chain().focus().setTextAlign(align).run()}
					active={editor.isActive({ textAlign: align })}
					kind="dropdown-item"
				/>
			);
		}
	);

	let alignSection = <DropdownSection label="Align" />;
	let indentSection = <DropdownSection label="Indent" />;

	let indentDropdownItem = (
		<MenuButton
			id="indent-btn"
			key="indent-btn"
			iconName="Indent"
			innerText="Indent"
			command={() => editor.chain().focus().indent().run()}
			kind="dropdown-item"
		/>
	);

	let outdentDropdownItem = (
		<MenuButton
			id="outdent-btn"
			key="outdent-btn"
			iconName="Outdent"
			innerText="Outdent"
			command={() => editor.chain().focus().outdent().run()}
			kind="dropdown-item"
		/>
	);
	let alignDropdownButton = (
		<MenuDropdownButton
			id="text-align-dropdown"
			key="text-align-dropdown"
			iconName="TextAlign__left"
			children={[
				alignSection,
				...alignDropdownItems,
				indentSection,
				indentDropdownItem,
				outdentDropdownItem,
			]}
			tooltipData={{ title: "Text Align" }}
		/>
	);

	let lowercaseButton = (
		<MenuButton
			id="lowercase-btn"
			key="lowercase-btn"
			command={() => editor.chain().focus().capitalize("lowercase").run()}
			innerText="lowercase"
			kind="dropdown-item"
		/>
	);

	let uppercaseButton = (
		<MenuButton
			id="uppercase-btn"
			key="uppercase-btn"
			command={() => editor.chain().focus().capitalize("uppercase").run()}
			innerText="UPPERCASE"
			kind="dropdown-item"
		/>
	);

	let titlecaseButton = (
		<MenuButton
			id="titlecase-btn"
			key="titlecase-btn"
			command={() => editor.chain().focus().capitalize("titlecase").run()}
			innerText="Title Case"
			kind="dropdown-item"
		/>
	);

	let capitalizeButton = (
		<MenuDropdownButton
			id="capitalize-dropdown-btn"
			key="capitalize-dropdown-btn"
			iconName={"Header"}
			children={[lowercaseButton, uppercaseButton, titlecaseButton]}
		/>
	);

	let codeViewRef = useRef(null);

	let [isCodeViewMode, setIsCodeViewMode] = useState(false);

	// useImperativeHandle(
	// 	ref,
	// 	() => ({
	// 		getIsCodeViewMode: () => {
	// 			return isCodeViewMode;
	// 		},
	// 	}),
	// 	[isCodeViewMode]
	// );

	useEffect(() => {
		onViewChanged(isCodeViewMode);
	}, [isCodeViewMode]);

	let codeViewButton = (
		<MenuButton
			id="code-view-btn"
			key="code-view-btn"
			iconName="CodeView"
			active={isCodeViewMode}
			command={() => {
				setIsCodeViewMode(!isCodeViewMode);
				// editor.commands.focus();
				return true;
			}}
		/>
	);

	let linkButton = (
		<MenuButton
			key="link"
			id="link"
			iconName="Link"
			command={() => {
				showLinkEditor(editor.view);
				return editor.chain().focus().run();
			}}
			active={editor.isActive("link")}
			tooltipData={{
				title: _t("commands.link", { shortcut: getShortcut("Mod-L") }),
			}}
		/>
	);

	return (
		<>
			<button
				onClick={() =>
					editor
						.chain()
						.focus()
						.insertTable({ rows: 3, cols: 3, withHeaderRow: true })
						.run()
				}
			>
				insertTable
			</button>
			<DialogModalTester editor={editor} />
			<button
				onClick={() =>
					editor.commands.setMediaWithCaption({
						"media-type": "img",
						src: "https://i.ibb.co/F699RW5/leby.jpg",
					})
				}
			>
				ImgeWithCaption
			</button>

			<button
				onClick={() =>
					editor.commands.SetMedia({
						"media-type": "img",
						src: "https://i.ibb.co/F699RW5/leby.jpg",
						caption: true,
					})
				}
			>
				Insert Media
			</button>

			<LinkButton view={editor.view} />
			<ImageButton view={editor.view} editor={editor} />
			<div className="d-flex overflow-x-auto ai-center px12 py4 pb0">
				<div className="d-flex g16 fl-grow1 ai-center js-editor-menu">
					<MenuBlock children={[codeViewButton, test]} />
					<span className="mw-menu-block__separator"></span>
					<MenuBlock
						children={[
							keyboardButton,
							spoilerButton,
							detailsButton,
							alignDropdownButton,
							capitalizeButton,
						]}
					/>
					<span className="mw-menu-block__separator"></span>
					<MenuBlock children={[fullscreenButton]} />
					<span className="mw-menu-block__separator"></span>
					<MenuBlock
						children={[
							orderedListSplitButton,
							bulletListSplitButton,
							taskListButton,
						]}
					/>
					<span className="mw-menu-block__separator"></span>
					<MenuBlock children={[clearFormattingButton]} />
					<span className="mw-menu-block__separator"></span>
					<MenuBlock children={[textColorSplitButton]} />
					<span className="mw-menu-block__separator"></span>
					<MenuBlock
						children={[
							boldButton,
							italicButton,
							underlineButton,
							strikeButton,
							subscriptButton,
							superscriptButton,
						]}
					/>
					<MenuBlock
						children={[
							codeButton,
							codeBlockButton,
							blockQuoteButton,
							horizontalRuleButton,
						]}
					/>
					<span className="mw-menu-block__separator"></span>
					<MenuBlock
						children={[
							fontFamilyDropdownButton,
							fontSizeDropdownButton,
							headingDropdownButton,
						]}
					/>
					<span className="mw-menu-block__separator"></span>
					<MenuBlock children={[linkButton]} />
					{/* <MenuBlock children={[undoButton, redoButton]} /> */}
				</div>
			</div>
		</>
	);
};

const App = () => {
	let HeadingExtension = Heading.extend({
		onSelectionUpdate() {
			let button = document.querySelector(
				'[data-key^="heading-dropdown"]'
			) as HTMLElement;

			if (button) {
				let span = button.querySelector(
					'[data-key="innerText"]'
				) as HTMLSpanElement;

				if (span) {
					if (this.editor.isActive("paragraph")) {
						span.innerText = "Paragraph";
					} else {
						let levels: number[] = [1, 2, 3, 4, 5, 6];
						for (let level of levels) {
							if (this.editor.isActive("heading", { level: level })) {
								span.innerText = "Heading " + level;
								return;
							}
						}
						span.innerText = "Paragraph";
					}
				}
			}
		},
	});

	let BulletListExtension = BulletList.extend({
		addAttributes() {
			return {
				...this.parent?.(),
				type: {
					default: "disc",
					// Take the attribute values
					renderHTML: (attributes) => {
						// … and return an object with HTML attributes.
						return {
							"data-style-tyle": attributes.type,
							style: `list-style-type: ${attributes.type}`,
						};
					},
					parseHTML: (element) => element.getAttribute("data-style-type"),
				},
			};
		},
	});

	let OrderedListExtension = OrderedList.extend({
		addAttributes() {
			return {
				...this.parent?.(),
				type: {
					default: "decimal",
					// Take the attribute values
					renderHTML: (attributes) => {
						// … and return an object with HTML attributes.
						return {
							"data-style-tyle": attributes.type,
							style: `list-style-type: ${attributes.type}`,
						};
					},
					parseHTML: (element) => element.getAttribute("data-style-type"),
				},
			};
		},
	});

	const editor = useEditor({
		extensions: [
			Color.configure({ types: [TextStyle.name, ListItem.name] }),
			TextStyle.configure(),
			Underline,
			Subscript,
			Superscript,
			Capitalize,
			HeadingExtension,
			FontFamily,
			FontSize,
			Link,
			Mention.configure({ suggestion }),
			OrderedListExtension,
			BulletListExtension,
			Indent,
			Spoiler,
			CodeIndent,
			Keyboard,
			// CodeIndentV2,
			TaskList,
			TaskItem.configure({
				nested: true,
			}),
			TextAlign.configure({ types: ["paragraph", "heading"] }),
			CustomCommands,
			Details,
			DetailsSummary,
			DetailsContent,
			ResizableMedia,
			ResizableMediaWithCaption,
			Media,
			Caption,
			Table.configure({
				resizable: true,
			}),
			TableCell,
			TableRow,
			TableHeader,
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

				placeholder: ({ node, editor }) => {
					if (node.type.name === "detailsSummary") {
						return "Summary";
					}

					return "Write something...";
				},
			}),
			StarterKit.configure({
				bulletList: false,
				orderedList: false,
				heading: false,
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

		content: `
      <h2>
        Hi there,
      </h2>
      <p>
        this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
      </p>
      <ul>
        <li>
          That’s a bullet list with one …
        </li>
        <li>
          … or two list items.
        </li>
      </ul>
      <p>
        Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
      </p>
      <pre><code class="language-css">body {
  display: none;
}</code></pre>
      <p>
        I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
      </p>
      <blockquote>
        Wow, that’s amazing. Good work, boy! 👏
        <br />
        — Mom
      </blockquote>
    `,
	});

	const [isCodeViewMode, setIsCodeViewMode] = useState(false);

	console.log("editorView");
	console.log(isCodeViewMode);

	let cmTextAreaRef = useRef(null);

	console.log("Renredring!");

	// let state: any;
	// if (editor) {
	// 	const codeView = (editor as Editor).extensionManager.extensions.find(
	// 		(e) => e.name === "code_view"
	// 	);

	// 	if (codeView) {
	// 		const { codemirror, codemirrorOptions } = codeView.options;
	// 		if (codemirror) {
	// 			// merge options
	// 			const cmOptions = {
	// 				...codemirrorOptions,
	// 				readOnly: !(editor as Editor).isEditable,
	// 			};
	// 			state = codemirror.fromTextArea(cmTextAreaRef.current, cmOptions);
	// 		}
	// 	}
	// }

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
	}, [isCodeViewMode, cmInstance]);

	return (
		<div
			id="editor-container"
			className="ps-relative s-textarea p0 d-flex fd-column"
			style={{ width: "1500px", minWidth: "600 px", zIndex: 10 }}
		>
			<div className="js-sticky py6 bg-inherit btr-sm w100 ps-sticky t0 l0 z-nav s-editor-shadow js-plugin-container js-sticky">
				<MenuBar editor={editor as Editor} onViewChanged={setIsCodeViewMode} />
			</div>
			{editor ? <LinkBubbleMenu editor={editor} href="" /> : null}
			{/* {editor ? <ImageBubbleMenu editor={editor} /> : null} */}
			{editor ? <ResizableMediaWithCaptionBubbleMenu editor={editor} /> : null}
			{editor ? <MediaBubbleMenu editor={editor} /> : null}
			{editor ? <TableBubbleMenu editor={editor} /> : null}

			<div
				id="editor-content"
				className={`overflow-scroll fl-grow1 outline-none p12 pt6 w100 s-prose js-editor ProseMirror ${
					!isCodeViewMode ? "" : "d-none"
				}`}
			>
				<EditorContent editor={editor} />
			</div>

			{isCodeViewMode ? (
				<div
					className={`mw-editor__codemirror ${isCodeViewMode ? "" : "d-none"}`}
				>
					<textarea ref={cmTextAreaRef}></textarea>
				</div>
			) : null}

			{isCodeViewMode ? null : <div id="editor-resize-container"></div>}

			{editor ? (
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
			) : null}
		</div>
	);
};

export default App;
