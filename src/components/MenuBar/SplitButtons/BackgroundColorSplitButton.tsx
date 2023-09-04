import { Editor } from "@tiptap/react";
import { useState } from "react";
import { BackgroundColorIcon } from "../../Icons";
import { MenuButton } from "../MenuButton";

import { ColorPalette } from "../../ColorPalette";
import { TooltipContent } from "../../TooltipContent";
import { MenuSplitButton } from "../MenuSplitButton";
import { _t } from "../../../helpers/strings";

type Props = {
	editor: Editor;
};

export const BackgroundColorSplitButton = ({ editor }: Props) => {
	return (
		<MenuSplitButton
			id="background-color-split-button"
			button={<BackgroundColorButton editor={editor} />}
			dropdownButton={<BackgroundColorDropdownButton editor={editor} />}
		/>
	);
};

export const BackgroundColorDropdownButton = ({ editor }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<MenuButton
			command={() => {
				setIsOpen(!isOpen);
				return editor.commands.focus();
			}}
			active={isOpen}
			dropdown={{
				isDropdownButton: true,
				dropdownContent: (
					<ColorPalette
						colorCommand={(color: string) => () => {
							editor.chain().focus().setHighlight(color).run();
							setIsOpen(false);
							editor.storage.highlight.lastColor = color;
						}}
						deleteCommand={() => {
							editor.chain().focus().unsetHighlight().run();
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

export const BackgroundColorButton = ({ editor }: Props) => {
	let lastColor = editor.storage.highlight.lastColor;
	return (
		<MenuButton
			icon={<BackgroundColorIcon color={lastColor} />}
			command={() => editor.chain().focus().setHighlight(lastColor).run()}
			disabled={!editor.can().setHighlight("white")}
			tooltip={{
				content: (
					<TooltipContent
						title={_t("commands.background_color.title")}
						description={_t("commands.background_color.description")}
						shortcut="Alt-H"
					/>
				),
			}}
		/>
	);
};
