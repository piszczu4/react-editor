import { Editor } from "@tiptap/react";
import { useState } from "react";
import { TextColorIcon } from "..";
import { MenuButton } from "./MenuButton";

import { MenuDropdown } from "../MenuDropdown";
import { TooltipContent } from "../TooltipContent";
import { MenuSplitButton } from "./MenuSplitButton";
import { ColorPalette } from "../ColorPalette";

type Props = {
	editor: Editor;
};

export const TextColorSplitButton = ({ editor }: Props) => {
	return (
		<MenuSplitButton
			id="text-color-split-button"
			button={<TextColorButton editor={editor} />}
			dropdownButton={<TextColorDropdownButton editor={editor} />}
		/>
	);
};

export const TextColorDropdownButton = ({ editor }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	// let dropdownContent = (
	// 	<MenuDropdown
	// 		id="ordered-list-dropdown"
	// 		// children={bulletListDropdownItems}
	// 		nCols={3}
	// 	/>
	// );

	return (
		<MenuButton
			command={() => {
				setIsOpen(!isOpen);
				return true;
			}}
			disabled={!editor.can().chain().focus().toggleBulletList()}
			tooltip={{
				content: <TooltipContent content="Text color" />,
			}}
			dropdown={{
				isDropdownButton: true,
				dropdownContent: <ColorPalette />,
				isOpen: isOpen,
				setIsOpen: setIsOpen,
			}}
		/>
	);
};

export const TextColorButton = ({ editor }: Props) => {
	let color = "red";
	return (
		<MenuButton
			icon={<TextColorIcon color={color} />}
			command={() => editor.chain().focus().setColor(color).run()}
			disabled={!editor.can().chain().focus().setColor(color)}
			active={editor.isActive("bulletList")}
			tooltip={{
				content: <TooltipContent content="Text color" />,
			}}
		/>
	);
};

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
