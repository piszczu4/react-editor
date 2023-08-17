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
				return true;
			}}
			active={isOpen}
			dropdown={{
				isDropdownButton: true,
				dropdownContent: (
					<ColorPalette
						colorCommand={(color: string) => () => {
							editor.chain().focus().toggleHighlight({ color: color }).run();
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
			icon={<TextColorIcon color={lastColor} />}
			command={() =>
				editor.chain().focus().setHighlight({ color: lastColor }).run()
			}
			disabled={!editor.can().setHighlight({ color: "white" })}
			tooltip={{
				content: (
					<TooltipContent
						title={_t("commands.background_color")}
						shortcut="Alt-H"
					/>
				),
			}}
		/>
	);
};
