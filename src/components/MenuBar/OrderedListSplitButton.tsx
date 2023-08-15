import { MenuButton } from "./MenuButton";
import { Editor, isActive } from "@tiptap/react";
import { useState } from "react";
import {
	DecimalOrderedListIcon,
	LowerAlphaOrderedListIcon,
	LowerGreekOrderedListIcon,
	LowerRomanOrderedListIcon,
	OrderedListIcon,
	UpperAlphaOrderedListIcon,
	UpperRomanOrderedListIcon,
} from "..";

import { MenuDropdown } from "../MenuDropdown";
import { TooltipContent } from "../TooltipContent";
import { MenuSplitButton } from "./MenuSplitButton";
import { Placement } from "tippy.js";

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
				disabled={
					!editor
						.can()
						.chain()
						.focus()
						.updateAttributes("orderedList", { type: type })
						.run()
				}
				active={editor.isActive("orderedList", { type: type })}
				tooltip={{
					content: type
						.split("-")
						.map((atom) => {
							return atom.charAt(0).toUpperCase() + atom.slice(1);
						})
						.join(" "),
					placement: "left",
				}}
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
			// icon={<OrderedListIcon />}
			command={() => {
				setIsOpen(!isOpen);
				return true;
			}}
			disabled={!editor.can().chain().focus().toggleOrderedList()}
			tooltip={{
				content: <TooltipContent title="Ordered List" shortcut="Mod-O" />,
			}}
			dropdown={{
				isDropdownButton: true,
				dropdownContent: dropdownContent,
				isOpen: isOpen,
				setIsOpen: setIsOpen,
			}}
		/>
	);
};

export const OrderedListButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<OrderedListIcon />}
			command={() => editor.chain().focus().toggleOrderedList().run()}
			disabled={!editor.can().chain().focus().toggleOrderedList()}
			active={editor.isActive("orderedList")}
			tooltip={{
				content: <TooltipContent title="Ordered List" shortcut="Mod-O" />,
			}}
		/>
	);
};

// // Ordered List
// let orderedListButton = (
// 	<MenuButton
// 		key="ordered-list"
// 		id="ordered-list"
// 		iconName="OrderedList"
// 		command={() => editor.chain().focus().toggleOrderedList().run()}
// 		active={editor.isActive("orderedList")}
// 		tooltipData={{
// 			title: _t("commands.ordered_list", {
// 				shortcut: getShortcut("Mod-O"),
// 			}),
// 		}}
// 	/>
// );

// let orderedListDropdownButton = (
// 	<MenuDropdownButton
// 		key="ordered-list-dropdown"
// 		id="ordered-list-dropdown"
// 		children={orderedListDropdownItems}
// 		nCols={3}
// 	/>
// );

// let orderedListSplitButton = (
// 	<MenuSplitButton
// 		key="ordered-list-split-button"
// 		id="ordered-list-split-button"
// 		button={orderedListButton}
// 		dropdownButton={orderedListDropdownButton}
// 	/>
// );
