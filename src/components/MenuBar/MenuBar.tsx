import { Editor } from "@tiptap/react";
import { MenuButton } from "../MenuButton";
import { getShortcut } from "@stackoverflow/stacks-editor/dist/shared/utils";
import { MenuBlock } from "./MenuBlock";
import { MenuDropdownButton } from "../MenuDropdownButton";
import { MenuSplitButton } from "../MenuSplitButton";
import { _t } from "../../helpers/strings";
import DropdownSection from "../DropdownSection";

import { BoldButton } from "./BoldButton";
import { ItalicButton } from "./ItalicButton";
import { StrikethroughButton } from "./StrikethroughButton";
import { UndoButton } from "./UndoButton";
import { RedoButton } from "./RedoButton";
import { CodeButton } from "./CodeButton";
import { CodeBlockButton } from "./CodeBlockButton";
import { BlockquoteButton } from "./BlockquoteButton";
import { HelpButton } from "./InfoButton";
import { HorizontalRuleButton } from "./HorizontalRuleButton";
import { FontSizeDropdownButton } from "./FontSizeDropdownButton";

type MenuBarProps = {
	editor: Editor;
	onViewChanged: any;
};

export const MenuBar = ({ editor, onViewChanged }: MenuBarProps) => {
	if (!editor) {
		return null;
	}

	// let keyboardButton = (
	// 	<MenuButton
	// 		key="keyboard-btn"
	// 		id="keyboard-btn"
	// 		iconName="Keyboard"
	// 		tooltipData={{ title: "Keyboard", placement: "bottom" }}
	// 		command={() => editor.chain().focus().toggleKeyboard().run()}
	// 	/>
	// );

	// let spoilerButton = (
	// 	<MenuButton
	// 		key="spoiler-btn"
	// 		id="spoiler-btn"
	// 		iconName="Spoiler"
	// 		tooltipData={{ title: "Spoiler", placement: "bottom" }}
	// 		command={() => editor.chain().focus().toggleSpoiler().run()}
	// 	/>
	// );

	// let detailsButton = (
	// 	<MenuButton
	// 		key="details-btn"
	// 		id="details-btn"
	// 		iconName="Details"
	// 		tooltipData={{ title: "Details", placement: "bottom" }}
	// 		command={() => editor.chain().focus().setDetails().run()}
	// 	/>
	// );

	// let fullscreenButton = (
	// 	<MenuButton
	// 		key="fullscreen-btn"
	// 		id="fullscreen-btn"
	// 		iconName="ScreenFull"
	// 		command={() => {
	// 			let container = document.getElementById(
	// 				"editor-container"
	// 			) as HTMLDivElement;
	// 			container.classList.toggle("mw-editor--fullscreen");
	// 			container.classList.toggle("m0");

	// 			document.body.classList.toggle("overflow-hidden");

	// 			let button = document.querySelector(
	// 				`[data-key="fullscreen-btn"]`
	// 			) as HTMLButtonElement;
	// 			button.classList.toggle("is-selected");

	// 			let iconSpan = document.querySelector(
	// 				`[data-key="fullscreen-btn__icon"]`
	// 			) as HTMLSpanElement;

	// 			if (container.classList.contains("mw-editor--fullscreen")) {
	// 				iconSpan.className = "svg-icon-bg iconScreenNormal";
	// 			} else {
	// 				iconSpan.className = "svg-icon-bg iconScreenFull";
	// 			}
	// 			editor.commands.focus();
	// 			return true;
	// 		}}
	// 		tooltipData={{
	// 			title: _t("commands.bold", { shortcut: getShortcut("Mod-B") }),
	// 		}}
	// 	/>
	// );

	// let underlineButton = (
	// 	<MenuButton
	// 		key="underline-btn"
	// 		id="underline-btn"
	// 		iconName="Underline"
	// 		command={() => editor.chain().focus().toggleUnderline().run()}
	// 		disabled={!editor.can().chain().focus().toggleUnderline().run()}
	// 		active={editor.isActive("underline")}
	// 		tooltipData={{ title: _t("commands.underline") }}
	// 	/>
	// );

	// let subscriptButton = (
	// 	<MenuButton
	// 		key="subscript-btn"
	// 		id="subscript-btn"
	// 		iconName="Subscript"
	// 		command={() => editor.chain().focus().toggleSubscript().run()}
	// 		disabled={!editor.can().chain().focus().toggleSubscript().run()}
	// 		active={editor.isActive("subscript")}
	// 		tooltipData={{ title: _t("commands.sub") }}
	// 	/>
	// );

	// let superscriptButton = (
	// 	<MenuButton
	// 		key="superscript-btn"
	// 		id="superscript-btn"
	// 		iconName="Superscript"
	// 		command={() => editor.chain().focus().toggleSuperscript().run()}
	// 		disabled={!editor.can().chain().focus().toggleSuperscript().run()}
	// 		active={editor.isActive("sueprscript")}
	// 		tooltipData={{ title: _t("commands.sup") }}
	// 	/>
	// );

	// // let clearNodesButton = (
	// // 	<MenuButton
	// // 		key="clear-nodes-btn"
	// // 		id="clear-nodes-btn"
	// // 		iconName="Trash"
	// // 		command={() => editor.chain().focus().clearNodes().run()}
	// // 		tooltipData={_t("commands.horizontal_rule", {
	// // 			shortcut: getShortcut("Mod-R"),
	// // 		})}
	// // 	/>
	// // );

	// // Text Color Split Button
	// let textColorButton = (
	// 	<MenuButton
	// 		key="text-color-btn"
	// 		id="text-color-btn"
	// 		iconName="Bold"
	// 		command={() => editor.chain().focus().toggleBold().run()}
	// 		tooltipData={{ title: _t("commands.text_color") }}
	// 	/>
	// );

	// let textColorDropdown = (
	// 	<MenuDropdownButton
	// 		key="text-color-dropdown-btn"
	// 		id="text-color-dropdown-btn"
	// 		tooltipData={{ title: _t("commands.text_color") }}
	// 		children={[italicButton]}
	// 	/>
	// );

	// let textColorSplitButton = (
	// 	<MenuSplitButton
	// 		id="text-color-split-btn"
	// 		button={textColorButton}
	// 		dropdownButton={textColorDropdown}
	// 	/>
	// );

	// let clearFormattingButton = (
	// 	<MenuButton
	// 		key="clear-formatting-btn"
	// 		id="clear-formatting-btn"
	// 		innerText="clear"
	// 		command={() => editor.chain().focus().unsetAllMarks().run()}
	// 		tooltipData={{ title: _t("commands.clear_formatting") }}
	// 	/>
	// );

	// let headerDropdownItems = [0, 1, 2, 3, 4, 5, 6].map((lev, index) => {
	// 	let key = lev === 0 ? "paragraph-btn" : `h${lev}-btn`;
	// 	let html = `<${lev === 0 ? "p" : "h" + lev}>${
	// 		lev === 0 ? "Paragraph" : "Heading " + lev
	// 	}</${lev === 0 ? "p" : "h" + lev}>`;
	// 	return (
	// 		<MenuButton
	// 			key={index}
	// 			id={key}
	// 			innerHTML={html}
	// 			command={
	// 				lev == 0
	// 					? () => editor.chain().focus().setParagraph().run()
	// 					: () =>
	// 							editor
	// 								.chain()
	// 								.focus()
	// 								.toggleHeading({ level: lev as Level })
	// 								.run()
	// 			}
	// 			active={
	// 				lev === 0
	// 					? editor.isActive("paragraph")
	// 					: editor.isActive("heading", { level: lev })
	// 			}
	// 			role="menuitem"
	// 			kind="dropdown-item"
	// 		/>
	// 	);
	// });

	// let headingDropdownButton = (
	// 	<MenuDropdownButton
	// 		key="heading-dropdown"
	// 		id="heading-dropdown"
	// 		innerText="Paragraph"
	// 		iconName={"Header"}
	// 		active={false}
	// 		children={headerDropdownItems}
	// 		tooltipData={{
	// 			title: _t("commands.heading.dropdown", {
	// 				shortcut: getShortcut("Mod-H"),
	// 			}),
	// 		}}
	// 	/>
	// );

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

	// // Ordered List
	// let orderedListButton = (
	// 	<MenuButton
	// 		key="ordered-list"
	// 		id="ordered-list"
	// 		iconName="OrderedList"
	// 		command={() => editor.chain().focus().toggleOrderedList().run()}
	// 		active={editor.isActive("orderedList")}
	// 		tooltipData={{
	// 			title: _t("commands.ordered_list", {
	// 				shortcut: getShortcut("Mod-O"),
	// 			}),
	// 		}}
	// 	/>
	// );

	// let orderedListDropdownItems = [
	// 	"decimal",
	// 	"lower-alpha",
	// 	"lower-greek",
	// 	"lower-roman",
	// 	"upper-alpha",
	// 	"upper-roman",
	// ].map((type, index) => {
	// 	let command = () => {
	// 		if (editor.isActive("orderedList")) {
	// 			return editor
	// 				.chain()
	// 				.focus()
	// 				.updateAttributes("orderedList", { type: type })
	// 				.run();
	// 		} else {
	// 			return editor
	// 				.chain()
	// 				.focus()
	// 				.toggleOrderedList()
	// 				.updateAttributes("orderedList", { type: type })
	// 				.run();
	// 		}
	// 	};

	// 	return (
	// 		<MenuButton
	// 			id={`orderedList__${type}`}
	// 			key={index}
	// 			data-type={type}
	// 			iconName={`orderedList__${type}`}
	// 			command={command}
	// 			disabled={
	// 				!editor
	// 					.can()
	// 					.chain()
	// 					.focus()
	// 					.updateAttributes("orderedList", { type: type })
	// 					.run()
	// 			}
	// 			active={editor.isActive("orderedList", { type: type })}
	// 			tooltipData={type
	// 				.split("-")
	// 				.map((atom) => {
	// 					return atom.charAt(0).toUpperCase() + atom.slice(1);
	// 				})
	// 				.join(" ")}
	// 			kind="dropdown-item"
	// 		/>
	// 	);
	// });

	// let orderedListDropdownButton = (
	// 	<MenuDropdownButton
	// 		key="ordered-list-dropdown"
	// 		id="ordered-list-dropdown"
	// 		children={orderedListDropdownItems}
	// 		nCols={3}
	// 	/>
	// );

	// let orderedListSplitButton = (
	// 	<MenuSplitButton
	// 		key="ordered-list-split-button"
	// 		id="ordered-list-split-button"
	// 		button={orderedListButton}
	// 		dropdownButton={orderedListDropdownButton}
	// 	/>
	// );

	// // Bullet List
	// let bulletListButton = (
	// 	<MenuButton
	// 		key="bullet-list"
	// 		id="bullet-list"
	// 		iconName="UnorderedList"
	// 		command={() => editor.chain().focus().toggleBulletList().run()}
	// 		active={editor.isActive("bulletList")}
	// 		tooltipData={{
	// 			title: _t("commands.unordered_list", {
	// 				shortcut: getShortcut("Mod-U"),
	// 			}),
	// 		}}
	// 	/>
	// );

	// let bulletListDropdownItems = ["disc", "circle", "square"].map(
	// 	(type, index) => {
	// 		let command = () => {
	// 			if (editor.isActive("bulletList")) {
	// 				return editor
	// 					.chain()
	// 					.focus()
	// 					.updateAttributes("bulletList", { type: type })
	// 					.run();
	// 			} else {
	// 				return editor
	// 					.chain()
	// 					.focus()
	// 					.toggleOrderedList()
	// 					.updateAttributes("bulletList", { type: type })
	// 					.run();
	// 			}
	// 		};

	// 		return (
	// 			<MenuButton
	// 				id={`bulletList__${type}`}
	// 				key={index}
	// 				data-type={type}
	// 				iconName={`BulletList__${type}`}
	// 				command={command}
	// 				disabled={
	// 					!editor
	// 						.can()
	// 						.chain()
	// 						.focus()
	// 						.updateAttributes("bulletList", { type: type })
	// 						.run()
	// 				}
	// 				active={editor.isActive("bulletList", { type: type })}
	// 				tooltipData={type.charAt(0).toUpperCase() + type.slice(1)}
	// 				kind="dropdown-item"
	// 			/>
	// 		);
	// 	}
	// );

	// let bulletListDropdownButton = (
	// 	<MenuDropdownButton
	// 		key="bullet-list-dropdown"
	// 		id="bullet-list-dropdown"
	// 		children={bulletListDropdownItems}
	// 		nCols={3}
	// 	/>
	// );

	// let bulletListSplitButton = (
	// 	<MenuSplitButton
	// 		key="bullet-list-split-button"
	// 		id="bullet-list-split-button"
	// 		button={bulletListButton}
	// 		dropdownButton={bulletListDropdownButton}
	// 	/>
	// );

	// let taskListButton = (
	// 	<MenuButton
	// 		key="task-list"
	// 		id="task-list"
	// 		iconName="UnorderedList"
	// 		command={() => editor.chain().focus().toggleTaskList().run()}
	// 		active={editor.isActive("taskList")}
	// 		tooltipData={{ title: _t("commands.task_list") }}
	// 	/>
	// );

	// // Align
	// let alignDropdownItems = ["left", "center", "right", "justify"].map(
	// 	(align, index) => {
	// 		return (
	// 			<MenuButton
	// 				id={`text-align__${align}`}
	// 				key={index}
	// 				data-type={align}
	// 				iconName={`TextAlign__${align}`}
	// 				innerText={align.charAt(0).toUpperCase() + align.slice(1)}
	// 				command={() => editor.chain().focus().setTextAlign(align).run()}
	// 				active={editor.isActive({ textAlign: align })}
	// 				kind="dropdown-item"
	// 			/>
	// 		);
	// 	}
	// );

	// let alignSection = <DropdownSection label="Align" />;
	// let indentSection = <DropdownSection label="Indent" />;

	// let indentDropdownItem = (
	// 	<MenuButton
	// 		id="indent-btn"
	// 		key="indent-btn"
	// 		iconName="Indent"
	// 		innerText="Indent"
	// 		command={() => editor.chain().focus().indent().run()}
	// 		kind="dropdown-item"
	// 	/>
	// );

	// let outdentDropdownItem = (
	// 	<MenuButton
	// 		id="outdent-btn"
	// 		key="outdent-btn"
	// 		iconName="Outdent"
	// 		innerText="Outdent"
	// 		command={() => editor.chain().focus().outdent().run()}
	// 		kind="dropdown-item"
	// 	/>
	// );
	// let alignDropdownButton = (
	// 	<MenuDropdownButton
	// 		id="text-align-dropdown"
	// 		key="text-align-dropdown"
	// 		iconName="TextAlign__left"
	// 		children={[
	// 			alignSection,
	// 			...alignDropdownItems,
	// 			indentSection,
	// 			indentDropdownItem,
	// 			outdentDropdownItem,
	// 		]}
	// 		tooltipData={{ title: "Text Align" }}
	// 	/>
	// );

	// let lowercaseButton = (
	// 	<MenuButton
	// 		id="lowercase-btn"
	// 		key="lowercase-btn"
	// 		command={() => editor.chain().focus().capitalize("lowercase").run()}
	// 		innerText="lowercase"
	// 		kind="dropdown-item"
	// 	/>
	// );

	// let uppercaseButton = (
	// 	<MenuButton
	// 		id="uppercase-btn"
	// 		key="uppercase-btn"
	// 		command={() => editor.chain().focus().capitalize("uppercase").run()}
	// 		innerText="UPPERCASE"
	// 		kind="dropdown-item"
	// 	/>
	// );

	// let titlecaseButton = (
	// 	<MenuButton
	// 		id="titlecase-btn"
	// 		key="titlecase-btn"
	// 		command={() => editor.chain().focus().capitalize("titlecase").run()}
	// 		innerText="Title Case"
	// 		kind="dropdown-item"
	// 	/>
	// );

	// let capitalizeButton = (
	// 	<MenuDropdownButton
	// 		id="capitalize-dropdown-btn"
	// 		key="capitalize-dropdown-btn"
	// 		iconName={"Header"}
	// 		children={[lowercaseButton, uppercaseButton, titlecaseButton]}
	// 	/>
	// );

	// let [isCodeViewMode, setIsCodeViewMode] = useState(false);

	// // useImperativeHandle(
	// // 	ref,
	// // 	() => ({
	// // 		getIsCodeViewMode: () => {
	// // 			return isCodeViewMode;
	// // 		},
	// // 	}),
	// // 	[isCodeViewMode]
	// // );

	// useEffect(() => {
	// 	onViewChanged(isCodeViewMode);
	// }, [isCodeViewMode]);

	// let codeViewButton = (
	// 	<MenuButton
	// 		id="code-view-btn"
	// 		key="code-view-btn"
	// 		iconName="CodeView"
	// 		active={isCodeViewMode}
	// 		command={() => {
	// 			setIsCodeViewMode(!isCodeViewMode);
	// 			// editor.commands.focus();
	// 			return true;
	// 		}}
	// 	/>
	// );

	// let linkButton = (
	// 	<MenuButton
	// 		key="link"
	// 		id="link"
	// 		iconName="Link"
	// 		command={() => {
	// 			showLinkEditor(editor.view);
	// 			return editor.chain().focus().run();
	// 		}}
	// 		active={editor.isActive("link")}
	// 		tooltipData={{
	// 			title: _t("commands.link", { shortcut: getShortcut("Mod-L") }),
	// 		}}
	// 	/>
	// );

	return (
		<>
			{/* <button
				onClick={() =>
					editor
						.chain()
						.focus()
						.insertTable({ rows: 3, cols: 3, withHeaderRow: true })
						.run()
				}
			>
				insertTable
			</button> */}
			{/* <button
				onClick={() =>
					editor.chain().focus().setPanel({ panelType: PanelType.INFO }).run()
				}
			>
				insertPanel
			</button> */}
			{/* <DialogModalTester editor={editor} /> */}
			{/* <button
				onClick={() =>
					editor.commands.setMediaWithCaption({
						"media-type": "img",
						src: "https://i.ibb.co/F699RW5/leby.jpg",
					})
				}
			>
				ImgeWithCaption
			</button> */}
			{/* <button
				onClick={() =>
					editor.commands.SetMedia({
						"media-type": "img",
						src: "https://i.ibb.co/F699RW5/leby.jpg",
						caption: true,
					})
				}
			>
				Insert Media
			</button> */}
			{/* // <LinkButton view={editor.view} /> */}
			{/* <ImageButton view={editor.view} editor={editor} /> */}
			<div className="overflow-x-auto ai-center px12 py4 pb0">
				<div className="mw-editor-menu">
					<MenuBlock>
						{<UndoButton editor={editor} />}
						{<RedoButton editor={editor} />}
					</MenuBlock>
					<MenuBlock>
						{<BoldButton editor={editor} />}
						{<ItalicButton editor={editor} />}
						{<StrikethroughButton editor={editor} />}
					</MenuBlock>
					<MenuBlock>
						{<CodeButton editor={editor} />}
						{<CodeBlockButton editor={editor} />}
					</MenuBlock>
					<MenuBlock>
						{<BlockquoteButton editor={editor} />}
						{<HorizontalRuleButton editor={editor} />}
					</MenuBlock>

					<MenuBlock>{<FontSizeDropdownButton editor={editor} />}</MenuBlock>
					<MenuBlock>
						<HelpButton />
					</MenuBlock>

					{/* <MenuBlock children={[codeViewButton, test]} />
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
					<MenuBlock children={[linkButton]} /> */}
					{/* <MenuBlock children={[undoButton, redoButton]} /> */}
				</div>
			</div>
		</>
	);
};
