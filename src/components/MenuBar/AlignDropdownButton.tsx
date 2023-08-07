import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import {
	AlignCenterIcon,
	AlignJustifyIcon,
	AlignLeftIcon,
	AlignRightIcon,
} from "..";
import { TooltipContent } from "../TooltipContent";
import { useState } from "react";
import IndentIcon from "../Icons/IndentIcon";
import OutdentIcon from "../Icons/OutdentIcon";
import { MenuDropdown } from "../MenuDropdown";
import { DropdownSection } from "../DropdownSection";

type Props = {
	editor: Editor;
};

function getIcon(align: string) {
	return align === "left" ? (
		<AlignLeftIcon />
	) : align === "center" ? (
		<AlignCenterIcon />
	) : align === "right" ? (
		<AlignRightIcon />
	) : (
		<AlignJustifyIcon />
	);
}

export const AlignDropdownButton = ({ editor }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	let alignDropdownItems = ["left", "center", "right", "justify"].map(
		(align, index) => {
			return (
				<MenuButton
					key={index}
					icon={getIcon(align)}
					command={() => {
						setIsOpen(false);
						return editor.chain().focus().setTextAlign(align).run();
					}}
					active={editor.isActive({ textAlign: align })}
					dropdown={{ isDropdownItem: true }}
					text={<span>{align.charAt(0).toUpperCase() + align.slice(1)}</span>}
				/>
			);
		}
	);

	let indentDropdownItem = (
		<MenuButton
			key="indent-btn"
			icon={<IndentIcon />}
			text={<span>Indent</span>}
			command={() => {
				setIsOpen(false);
				return editor.chain().focus().indent().run();
			}}
		/>
	);

	let outdentDropdownItem = (
		<MenuButton
			key="outdent-btn"
			icon={<OutdentIcon />}
			text={<span>Outdent</span>}
			command={() => {
				setIsOpen(false);
				return editor.chain().focus().outdent().run();
			}}
		/>
	);

	let dropdownContent = (
		<MenuDropdown
			id="align-dropdown"
			children={[
				<DropdownSection key="align-section" label="Align" />,
				...alignDropdownItems,
				<DropdownSection key="indent-section" label="Indent" />,
				indentDropdownItem,
				outdentDropdownItem,
			]}
		/>
	);

	let align = editor.getAttributes("textAlign")["textAlign"];
	return (
		<MenuButton
			icon={getIcon(align)}
			command={() => {
				setIsOpen(!isOpen);
				return true;
			}}
			disabled={!editor.can().chain().focus().toggleCode().run()}
			active={editor.isActive("code")}
			tooltip={{
				content: <TooltipContent content="Text Align" />,
			}}
			dropdown={{
				isDropdownButton: true,
				isOpen: isOpen,
				setIsOpen: setIsOpen,
				dropdownContent: dropdownContent,
			}}
		/>
	);
};
