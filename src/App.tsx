// import Tiptap from "./Tiptap.tsx";

// const App = () => {
// 	return (
// 		<div className="App">
// 			<Tiptap />
// 		</div>
// 	);
// };

// export default App;

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
import { CustomCommands } from "./Extensions/extension-custom-commands/custom-commands";
import { EditorContent, isActive, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

import { Editor } from "@tiptap/react";
import { MenuButton } from "./Components/MenuButton";
import { MenuInput } from "./Components/MenuInput";
import MenuBlock from "./Components/MenuBlock";

import { _t } from "./helpers/strings";
import { getShortcut } from "@stackoverflow/stacks-editor/dist/shared/utils";
import { MenuSplitButton } from "./Components/MenuSplitButton";
import { MenuDropdownButton } from "./Components/MenuDropdownButton";

import { Level } from "@tiptap/extension-heading";
import { escapeHTML } from "@stackoverflow/stacks-editor/dist/shared/utils";
import { FontSize } from "./Extensions/extension-font-size";
import Link from "@tiptap/extension-link";
import { orderedList } from "@tiptap/pm/schema-list";
import { getMarkType } from "@tiptap/react";
import { isTextSelection } from "@tiptap/react";

import { ResolvedPos } from "@tiptap/pm/model";

type Props = {
	editor: Editor;
};

const MenuBar = ({ editor }: Props) => {
	if (!editor) {
		return null;
	}

	let test = (
		<MenuInput
			key="test"
			id="test"
			iconName="Bold"
			tooltipData="Dupa" //{{ title: "siema", description: "elo" }}
			command={() => true}
		/>
	);

	let boldButton = (
		<MenuInput
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
		<MenuInput
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
		<MenuInput
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
		<MenuInput
			key="subscript-btn"
			id="subscript-btn"
			iconName="Subscript"
			command={() => editor.chain().focus().toggleSubscript().run()}
			disabled={!editor.can().chain().focus().toggleSubscript().run()}
			active={editor.isActive("subscript")}
			tooltipData={_t("commands.sub")}
		/>
	);

	let superscriptButton = (
		<MenuInput
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
			tooltipData={_t("commands.strikethrough")}
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
			tooltipData={_t("commands.blockquote", {
				shortcut: getShortcut("Mod-Q"),
			})}
		/>
	);

	let horizontalRuleButton = (
		<MenuButton
			key="horiontal-rule-btn"
			id="horiontal-rule-btn"
			iconName="HorizontalRule"
			command={() => editor.chain().focus().setHorizontalRule().run()}
			tooltipData={_t("commands.horizontal_rule", {
				shortcut: getShortcut("Mod-R"),
			})}
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

	let textColorSplitButton = (
		<MenuSplitButton
			key="text-color-btn"
			id="text-color-btn"
			iconName="Bold"
			command={() => editor.chain().focus().toggleBold().run()}
			children={[boldButton, italicButton]}
			tooltipData={_t("commands.text_color")}
		/>
	);

	let clearFormattingButton = (
		<MenuButton
			key="clear-formatting-btn"
			id="clear-formatting-btn"
			innerText="clear"
			command={() => editor.chain().focus().unsetAllMarks().run()}
			tooltipData={_t("commands.clear_formatting")}
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
				dataAction="s-popover#hide"
				dropdownItem={true}
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
			tooltipData={_t("commands.heading.dropdown", {
				shortcut: getShortcut("Mod-H"),
			})}
			// command={() => editor.chain().focus().toggleBold().run()}
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
				dropdownItem={true}
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
			tooltipData={_t("commands.font_family")}
			// command={() => editor.chain().focus().toggleBold().run()}
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
				dropdownItem={true}
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
			tooltipData={_t("commands.font_size")}
			// command={() => editor.chain().focus().toggleBold().run()}
		/>
	);

	let linkButton = (
		<MenuButton
			key="link"
			id="link"
			iconName="Link"
			command={() => editor.chain().focus().run()}
			active={editor.isActive("link")}
			tooltipData={_t("commands.link", { shortcut: getShortcut("Mod-L") })}
		/>
	);

	let orderedListButton = (
		<MenuButton
			key="ordered-list"
			id="ordered-list"
			iconName="OrderedList"
			command={() => editor.chain().focus().toggleOrderedList().run()}
			active={editor.isActive("orderedList")}
			tooltipData={_t("commands.ordered_list", {
				shortcut: getShortcut("Mod-O"),
			})}
		/>
	);

	let bulletListButton = (
		<MenuButton
			key="bullet-list"
			id="bullet-list"
			iconName="UnorderedList"
			command={() => editor.chain().focus().toggleBulletList().run()}
			active={editor.isActive("bulletList")}
			tooltipData={_t("commands.unordered_list", {
				shortcut: getShortcut("Mod-U"),
			})}
		/>
	);

	let taskListButton = (
		<MenuButton
			key="task-list"
			id="task-list"
			iconName="UnorderedList"
			command={() => editor.chain().focus().toggleTaskList().run()}
			active={editor.isActive("taskList")}
			tooltipData={_t("commands.task_list")}
		/>
	);

	return (
		<>
			<div className="d-flex overflow-x-auto ai-center px12 py4 pb0">
				<div className="d-flex g16 fl-grow1 ai-center js-editor-menu">
					<MenuBlock children={[test]} />
					<span className="mw-menu-block__separator"></span>
					<MenuBlock
						children={[orderedListButton, bulletListButton, taskListButton]}
					/>
					<span className="mw-menu-block__separator"></span>

					<MenuBlock children={[clearFormattingButton]} />
					<span className="mw-menu-block__separator"></span>

					<MenuBlock children={[textColorSplitButton, clearFormattingButton]} />
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

	const editor = useEditor({
		extensions: [
			Color.configure({ types: [TextStyle.name, ListItem.name] }),
			TextStyle.configure(),
			Underline,
			Subscript,
			Superscript,
			HeadingExtension,
			FontFamily,
			FontSize,
			Link,
			OrderedList,
			BulletList,
			TaskList,
			TaskItem.configure({
				nested: true,
			}),
			Placeholder,
			CustomCommands,
			StarterKit.configure({
				bulletList: {
					keepMarks: true,
					keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
				},
				orderedList: {
					keepMarks: true,
					keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
				},
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

	return (
		<div
			id="editor-container"
			className="ps-relative z-base s-textarea overflow-auto hmn2 w100 p0 d-flex fd-column s-editor-resizable"
			style={{ margin: "200px" }}
		>
			<div className="js-sticky py6 bg-inherit btr-sm w100 ps-sticky t0 l0 z-nav s-editor-shadow js-plugin-container js-sticky">
				<MenuBar editor={editor as Editor} />
			</div>
			<div className="fl-grow1 outline-none p12 pt6 w100 s-prose js-editor ProseMirror">
				<EditorContent editor={editor} />
			</div>
		</div>
	);
};

export default App;
