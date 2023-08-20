import { Editor } from "@tiptap/react";
import { useState } from "react";
import { TextColorIcon } from "../../Icons";
import { MenuButton } from "../MenuButton";

import { ColorPalette } from "../../ColorPalette";
import { TooltipContent } from "../../TooltipContent";
import { MenuSplitButton } from "../MenuSplitButton";
import { _t } from "../../../helpers/strings";

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

	return (
		<MenuButton
			command={() => {
				setIsOpen(!isOpen);
				return true;
			}}
			disabled={!editor.can().setColor("black")}
			active={isOpen}
			dropdown={{
				isDropdownButton: true,
				dropdownContent: (
					<ColorPalette
						colorCommand={(color: string) => () => {
							editor.chain().focus().setColor(color).run();
							setIsOpen(false);
							editor.storage.color.lastColor = color;
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
	let lastColor = editor.storage.color.lastColor;
	return (
		<MenuButton
			icon={<TextColorIcon color={lastColor} />}
			command={() => editor.chain().focus().setColor(lastColor).run()}
			disabled={!editor.can().setColor("black")}
			tooltip={{
				content: (
					<TooltipContent title={_t("commands.text_color")} shortcut="Alt-T" />
				),
			}}
		/>
	);
};
