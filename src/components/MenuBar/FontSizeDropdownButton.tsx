import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { BoldIcon, FontSizeIcon } from "..";
import { TooltipContent } from "../TooltipContent";
import { useState } from "react";

const DEFAULT_FONT_SIZES: number[] = [
	8, 10, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72,
];

type Props = {
	editor: Editor;
};

export const FontSizeDropdownButton = ({ editor }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	let fontSizeDropdownItems = DEFAULT_FONT_SIZES.map((size) => {
		let key = "fs-" + size + "-btn";
		let text = (
			<span style={{ fontSize: size + "px", textAlign: "left" }}>{size}</span>
		);

		return (
			<MenuButton
				key={key}
				command={() => {
					setIsOpen(false);
					return editor.chain().focus().toggleFontSize(size).run();
				}}
				active={editor.isActive("textStyle", { fontSize: size })}
				text={text}
				dropdown={{ isDropdownItem: true }}
			/>
		);
	});

	let dropdownContent = (
		<MenuDropdown id="font-size-dropdown" children={fontSizeDropdownItems} />
	);

	let { fontSize } = editor.getAttributes("textStyle");

	return (
		<MenuButton
			icon={<FontSizeIcon />}
			command={() => {
				setIsOpen(!isOpen);
				return true;
			}}
			disabled={!editor.can().chain().focus().toggleFontSize(16).run()}
			tooltip={{
				content: <TooltipContent content="Font size" />,
			}}
			dropdown={{
				isDropdownButton: true,
				dropdownContent: dropdownContent,
				isOpen: isOpen,
				setIsOpen: setIsOpen,
			}}
			text={<span>{fontSize ? fontSize + "px" : "(Default)"}</span>}
		/>
	);
};

type MenuDropdownProps = {
	children: JSX.Element[];
	id?: string;
	nCols?: number;
};

export const MenuDropdown = ({
	children,
	id = undefined,
	nCols = 1,
}: MenuDropdownProps) => {
	return (
		<div className="mw-dropdown-content">
			<div id={id} className={`d-grid grid__${nCols}`}>
				{children}
			</div>
		</div>
	);
};
