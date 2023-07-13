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
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

import { Editor } from "@tiptap/react";
import { MenuButton } from "./Components/MenuButton";
import MenuBlock from "./Components/MenuBlock";

import { _t } from "@stackoverflow/stacks-editor/dist/shared/localization";
import { getShortcut } from "@stackoverflow/stacks-editor/dist/shared/utils";
import { MenuSplitButton } from "./Components/MenuSplitButton";
import { MenuDropdownButton } from "./Components/MenuDropdownButton";

type Props = {
	editor: Editor;
};

const MenuBar = ({ editor }: Props) => {
	if (!editor) {
		return null;
	}

	let boldButton = (
		<MenuButton
			id="bold-btn"
			iconName="Bold"
			command={() => editor.chain().focus().toggleBold().run()}
			disabled={!editor.can().chain().focus().toggleBold().run()}
			active={editor.isActive("bold")}
			tooltipData={_t("commands.bold", { shortcut: getShortcut("Mod-B") })}
		/>
	);

	let italicButton = (
		<MenuButton
			id="italic-btn"
			iconName="Italic"
			command={() => editor.chain().focus().toggleItalic().run()}
			disabled={!editor.can().chain().focus().toggleItalic().run()}
			active={editor.isActive("italic")}
			tooltipData={_t("commands.emphasis", { shortcut: getShortcut("Mod-I") })}
		/>
	);

	let underlineButton = (
		<MenuButton
			id="underline-btn"
			iconName="Underline"
			command={() => editor.chain().focus().toggleUnderline().run()}
			disabled={!editor.can().chain().focus().toggleUnderline().run()}
			active={editor.isActive("underline")}
			tooltipData="Underline"
		/>
	);

	let subscriptButton = (
		<MenuButton
			id="subscript-btn"
			iconName="Subscript"
			command={() => editor.chain().focus().toggleSubscript().run()}
			disabled={!editor.can().chain().focus().toggleSubscript().run()}
			active={editor.isActive("subscript")}
			tooltipData={_t("commands.sub")}
		/>
	);

	let superscriptButton = (
		<MenuButton
			id="superscript-btn"
			iconName="Superscript"
			command={() => editor.chain().focus().toggleSuperscript().run()}
			disabled={!editor.can().chain().focus().toggleSuperscript().run()}
			active={editor.isActive("sueprscript")}
			tooltipData={_t("commands.sup", {
				shortcut: getShortcut("Mod-I"),
			})}
		/>
	);

	let strikeButton = (
		<MenuButton
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
			id="code-btn"
			iconName="Code"
			command={() => editor.chain().focus().toggleCode().run()}
			disabled={!editor.can().chain().focus().toggleCode().run()}
			active={editor.isActive("code")}
			tooltipData={_t("commands.inline_code.description")}
		/>
	);

	let codeBlockButton = (
		<MenuButton
			id="code-block-btn"
			iconName="CodeblockAlt"
			command={() => editor.chain().focus().toggleCodeBlock().run()}
			active={editor.isActive("codeBlock")}
			tooltipData={{
				title: _t("commands.inline_code.title", {
					shortcut: getShortcut("Mod-K"),
				}),
				description: _t("commands.inline_code.description"),
			}}
		/>
	);

	let blockQuoteButton = (
		<MenuButton
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
			id="horiontal-rule-btn"
			iconName="HorizontalRule"
			command={() => editor.chain().focus().setHorizontalRule().run()}
			tooltipData={_t("commands.horizontal_rule", {
				shortcut: getShortcut("Mod-R"),
			})}
		/>
	);

	let clearNodesButton = (
		<MenuButton
			id="clear-nodes-btn"
			iconName="Trash"
			command={() => editor.chain().focus().clearNodes().run()}
		/>
	);

	let undoButton = (
		<MenuButton
			id="undo-btn"
			iconName="Undo"
			command={() => editor.chain().focus().undo().run()}
			disabled={!editor.chain().focus().undo().run()}
			tooltipData={_t("commands.undo", { shortcut: getShortcut("Mod-Z") })}
		/>
	);

	let redoButton = (
		<MenuButton
			id="redo-btn"
			iconName="Refresh"
			command={() => editor.chain().focus().redo().run()}
			disabled={!editor.chain().focus().redo().run()}
			tooltipData={_t("commands.redo", { shortcut: getShortcut("Mod-Y") })}
		/>
	);

	// let textColorSplitButton = (
	// 	<MenuSplitButton
	// 		id="text-color-btn"
	// 		iconName="Bold"
	// 		command={() => editor.chain().focus().redo().run()}
	// 		children={[undoButton, redoButton]}
	// 	/>
	// );

	let clearFormattingButton = (
		<MenuButton
			id="clear-formatting-btn"
			innerText="clear"
			command={() => editor.chain().focus().unsetAllMarks().run()}
		/>
	);

	return (
		<>
			<MenuBlock children={[clearFormattingButton]} />
			{/* <MenuBlock children={[textColorSplitButton, clearFormattingButton]} /> */}
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
					clearNodesButton,
				]}
			/>
			<MenuBlock children={[undoButton, redoButton]} />
		</>
	);
};

const App = () => {
	const editor = useEditor({
		extensions: [
			Color.configure({ types: [TextStyle.name, ListItem.name] }),
			TextStyle.configure(),
			Underline,
			Subscript,
			Superscript,
			StarterKit.configure({
				bulletList: {
					keepMarks: true,
					keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
				},
				orderedList: {
					keepMarks: true,
					keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
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
