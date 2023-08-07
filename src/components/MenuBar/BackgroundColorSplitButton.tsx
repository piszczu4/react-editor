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

export const BackgroundColorSplitButton = ({ editor }: Props) => {
	return (
		<MenuSplitButton
			id="background-color-split-button"
			button={<BackgroundColorButton editor={editor} />}
			dropdownButton={<BackgroundColorDropdownButton editor={editor} />}
		/>
	);
};

let lastColor = "";

export const BackgroundColorDropdownButton = ({ editor }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<MenuButton
			command={() => {
				setIsOpen(!isOpen);
				return true;
			}}
			tooltip={{
				content: <TooltipContent content="Text color" />,
			}}
			active={isOpen}
			dropdown={{
				isDropdownButton: true,
				dropdownContent: (
					<ColorPalette
						colorCommand={(color: string) => () => {
							editor.chain().focus().toggleHighlight({ color: color }).run();
							setIsOpen(false);
							lastColor = color;
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
	return (
		<MenuButton
			icon={<TextColorIcon color={lastColor} />}
			command={() =>
				editor.chain().focus().setHighlight({ color: lastColor }).run()
			}
			disabled={
				!editor.can().chain().focus().setHighlight({ color: lastColor })
			}
			tooltip={{
				content: <TooltipContent content="Background color" />,
			}}
		/>
	);
};
