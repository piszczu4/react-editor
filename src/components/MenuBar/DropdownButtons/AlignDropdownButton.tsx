import { Editor } from "@tiptap/react";
import { MenuButton } from "../MenuButton";
import {
	AlignCenterIcon,
	AlignJustifyIcon,
	AlignLeftIcon,
	AlignRightIcon,
} from "../..";
import { TooltipContent } from "../../TooltipContent";
import { useState } from "react";
import IndentIcon from "../../Icons/IndentIcon";
import OutdentIcon from "../../Icons/OutdentIcon";
import { MenuDropdown } from "../../MenuDropdown";
import { DropdownSection } from "../../DropdownSection";
import { _t } from "../../../helpers/strings";

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

function getText(align: string) {
	return align === "left" ? (
		<span>{_t("commands.text_align.left")}</span>
	) : align === "center" ? (
		<span>{_t("commands.text_align.center")}</span>
	) : align === "right" ? (
		<span>{_t("commands.text_align.right")}</span>
	) : (
		<span>{_t("commands.text_align.justify")}</span>
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
					disabled={!editor.can().setTextAlign(align)}
					dropdown={{ isDropdownItem: true }}
					text={getText(align)}
				/>
			);
		}
	);

	let indentDropdownItem = (
		<MenuButton
			key="indent-btn"
			icon={<IndentIcon />}
			text={<span>{_t("commands.indent")}</span>}
			command={() => {
				setIsOpen(false);
				return editor.chain().focus().indent().run();
			}}
			disabled={!editor.can().indent()}
		/>
	);

	let outdentDropdownItem = (
		<MenuButton
			key="outdent-btn"
			icon={<OutdentIcon />}
			text={<span>{_t("commands.outdent")}</span>}
			command={() => {
				setIsOpen(false);
				return editor.chain().focus().outdent().run();
			}}
			disabled={!editor.can().outdent()}
		/>
	);

	let dropdownContent = (
		<MenuDropdown
			id="align-dropdown"
			children={[
				<DropdownSection
					key="align-section"
					label={_t("labels.align_section")}
				/>,
				...alignDropdownItems,
				<DropdownSection
					key="indent-section"
					label={_t("labels.indent_section")}
				/>,
				indentDropdownItem,
				outdentDropdownItem,
			]}
		/>
	);

	let align = "left";
	if (editor.isActive({ textAlign: "center" })) align = "center";
	else if (editor.isActive({ textAlign: "right" })) align = "right";
	else if (editor.isActive({ textAlign: "justify" })) align = "justify";

	return (
		<MenuButton
			icon={getIcon(align)}
			command={() => {
				setIsOpen(!isOpen);
				return true;
			}}
			disabled={!editor.can().setTextAlign("center")}
			active={false}
			tooltip={{
				content: <TooltipContent title={_t("commands.text_align.title")} />,
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
