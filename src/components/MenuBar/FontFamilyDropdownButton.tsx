import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { FontFamilyIcon } from "..";
import { TooltipContent } from "../TooltipContent";
import { useState } from "react";
import { MenuDropdown } from "../MenuDropdown";

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

type Props = {
	editor: Editor;
};

export const FontFamilyDropdownButton = ({ editor }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	let fontSizeDropdownItems = DEFAULT_FONT_TYPE_NAMES.map((font) => {
		let key = "ff-" + font.toLowerCase().replace(" ", "-") + "-btn";
		let text = (
			<span style={{ fontFamily: font, textAlign: "left" }}>{font}</span>
		);

		return (
			<MenuButton
				key={key}
				command={() => {
					setIsOpen(false);
					if (editor.isActive("textStyle", { fontFamily: font })) {
						return editor.chain().focus().unsetFontFamily().run();
					} else {
						return editor.chain().focus().setFontFamily(font).run();
					}
				}}
				active={editor.isActive("textStyle", { fontFamily: font })}
				text={text}
				dropdown={{ isDropdownItem: true }}
			/>
		);
	});

	let dropdownContent = (
		<MenuDropdown id="font-family-dropdown" children={fontSizeDropdownItems} />
	);

	let { fontFamily } = editor.getAttributes("textStyle");

	return (
		<MenuButton
			icon={<FontFamilyIcon />}
			command={() => {
				setIsOpen(!isOpen);
				return true;
			}}
			disabled={!editor.can().chain().focus().setFontFamily("Arial").run()}
			tooltip={{
				content: <TooltipContent title="Font family" />,
			}}
			dropdown={{
				isDropdownButton: true,
				dropdownContent: dropdownContent,
				isOpen: isOpen,
				setIsOpen: setIsOpen,
			}}
			text={<span>{fontFamily ? fontFamily : "sans-serif"}</span>}
		/>
	);
};
