import { Editor } from "@tiptap/react";
import { useState } from "react";
import {
	CircleBulletListIcon,
	DiscBulletListIcon,
	BulletListIcon,
	SquareBulletListIcon,
} from "..";
import { MenuButton } from "./MenuButton";

import { MenuDropdown } from "../MenuDropdown";
import { TooltipContent } from "../TooltipContent";
import { MenuSplitButton } from "./MenuSplitButton";

function getIcon(type: string) {
	return type === "disc" ? (
		<DiscBulletListIcon />
	) : type === "circle" ? (
		<CircleBulletListIcon />
	) : type === "square" ? (
		<SquareBulletListIcon />
	) : null;
}

type Props = {
	editor: Editor;
};

export const BulletListSplitButton = ({ editor }: Props) => {
	return (
		<MenuSplitButton
			id="unordered-list-split-button"
			button={<BulletListButton editor={editor} />}
			dropdownButton={<BulletListDropdownButton editor={editor} />}
		/>
	);
};

export const BulletListDropdownButton = ({ editor }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	let bulletListDropdownItems = ["disc", "circle", "square"].map(
		(type, index) => {
			let command = () => {
				setIsOpen(false);
				if (editor.isActive("bulletList")) {
					return editor
						.chain()
						.focus()
						.updateAttributes("bulletList", { type: type })
						.run();
				} else {
					return editor
						.chain()
						.focus()
						.toggleBulletList()
						.updateAttributes("bulletList", { type: type })
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
							.updateAttributes("bulletList", { type: type })
							.run()
					}
					active={editor.isActive("bulletList", { type: type })}
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
		}
	);

	let dropdownContent = (
		<MenuDropdown
			id="ordered-list-dropdown"
			children={bulletListDropdownItems}
			nCols={3}
		/>
	);

	return (
		<MenuButton
			command={() => {
				setIsOpen(!isOpen);
				return true;
			}}
			disabled={!editor.can().chain().focus().toggleBulletList()}
			tooltip={{
				content: <TooltipContent content="Bullet List" />,
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

export const BulletListButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<BulletListIcon />}
			command={() => editor.chain().focus().toggleBulletList().run()}
			disabled={!editor.can().chain().focus().toggleBulletList()}
			active={editor.isActive("bulletList")}
			tooltip={{
				content: <TooltipContent content="Bullet List" shortcut="Mod-U" />,
			}}
		/>
	);
};
