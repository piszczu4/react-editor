import { Editor } from "@tiptap/react";
import { useState } from "react";
import {
	DecimalOrderedListIcon,
	LowerAlphaOrderedListIcon,
	LowerGreekOrderedListIcon,
	LowerRomanOrderedListIcon,
	OrderedListIcon,
	UpperAlphaOrderedListIcon,
	UpperRomanOrderedListIcon,
} from "../../Icons";
import { MenuButton } from "../MenuButton";

import { _t } from "../../../helpers/strings";
import { MenuDropdown } from "../../MenuDropdown";
import { TooltipContent } from "../../TooltipContent";
import { MenuSplitButton } from "../MenuSplitButton";

function getIcon(type: string) {
	return type === "decimal" ? (
		<DecimalOrderedListIcon />
	) : type === "lower-alpha" ? (
		<LowerAlphaOrderedListIcon />
	) : type === "lower-greek" ? (
		<LowerGreekOrderedListIcon />
	) : type === "lower-roman" ? (
		<LowerRomanOrderedListIcon />
	) : type === "upper-alpha" ? (
		<UpperAlphaOrderedListIcon />
	) : (
		<UpperRomanOrderedListIcon />
	);
}

type Props = {
	editor: Editor;
};

export const OrderedListSplitButton = ({ editor }: Props) => {
	return (
		<MenuSplitButton
			id="ordered-list-split-button"
			button={<OrderedListButton editor={editor} />}
			dropdownButton={<OrderedListDropdownButton editor={editor} />}
			tooltip={{
				content: (
					<TooltipContent
						title={_t("commands.ordered_list.title")}
						shortcut="Alt-O"
					/>
				),
			}}
		/>
	);
};

export const OrderedListDropdownButton = ({ editor }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	let orderedListDropdownItems = [
		"decimal",
		"lower-alpha",
		"lower-greek",
		"lower-roman",
		"upper-alpha",
		"upper-roman",
	].map((type, index) => {
		let command = () => {
			setIsOpen(false);
			if (editor.isActive("orderedList")) {
				if (editor.getAttributes("orderedList")["type"] === type) {
					return editor.chain().focus().toggleOrderedList().run();
				}
				return editor
					.chain()
					.focus()
					.updateAttributes("orderedList", { type: type })
					.run();
			} else {
				return editor
					.chain()
					.focus()
					.toggleOrderedList()
					.updateAttributes("orderedList", { type: type })
					.run();
			}
		};

		return (
			<MenuButton
				key={index}
				icon={getIcon(type)}
				command={command}
				disabled={!editor.can().toggleOrderedList()}
				active={editor.isActive("orderedList", { type: type })}
				tooltip={_t(`commands.ordered_list.${type}`)}
				dropdown={{ isDropdownItem: true }}
			/>
		);
	});

	let dropdownContent = (
		<MenuDropdown
			id="ordered-list-dropdown"
			children={orderedListDropdownItems}
			nCols={3}
		/>
	);

	return (
		<MenuButton
			command={() => {
				setIsOpen(!isOpen);
				return editor.commands.focus();
			}}
			disabled={!editor.can().toggleOrderedList()}
			dropdown={{
				isDropdownButton: true,
				dropdownContent: dropdownContent,
				isOpen: isOpen,
				setIsOpen: setIsOpen,
			}}
			active={isOpen}
		/>
	);
};

export const OrderedListButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<OrderedListIcon />}
			command={() => editor.chain().focus().toggleOrderedList().run()}
			disabled={!editor.can().toggleOrderedList()}
			active={editor.isActive("orderedList")}
		/>
	);
};
