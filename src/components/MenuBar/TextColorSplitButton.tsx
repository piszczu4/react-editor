import { Editor } from "@tiptap/react";
import { useState } from "react";
import { TextColorIcon } from "..";
import { MenuButton } from "./MenuButton";

import { ColorPalette } from "../ColorPalette";
import { TooltipContent } from "../TooltipContent";
import { MenuSplitButton } from "./MenuSplitButton";

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

let lastColor = "";

export const TextColorDropdownButton = ({ editor }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<MenuButton
			command={() => {
				setIsOpen(!isOpen);
				return true;
			}}
			disabled={!editor.can().chain().focus().toggleBulletList()}
			tooltip={{
				content: <TooltipContent title="Text color" />,
			}}
			active={isOpen}
			dropdown={{
				isDropdownButton: true,
				dropdownContent: (
					<ColorPalette
						colorCommand={(color: string) => () => {
							editor.chain().focus().setColor(color).run();
							setIsOpen(false);
							lastColor = color;
						}}
						deleteCommand={() => {
							editor.chain().focus().unsetColor().run();
							setIsOpen(false);
						}}
					/>
				),
				isOpen: isOpen,
				setIsOpen: setIsOpen,
			}}
		/>
	);
};

export const TextColorButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<TextColorIcon color={lastColor} />}
			command={() => editor.chain().focus().setColor(lastColor).run()}
			disabled={!editor.can().chain().focus().setColor(lastColor)}
			tooltip={{
				content: <TooltipContent title="Text color" />,
			}}
		/>
	);
};
