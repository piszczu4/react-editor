import { Editor } from "@tiptap/react";
import { useState } from "react";
import {
	CircleBulletListIcon,
	DiscBulletListIcon,
	BulletListIcon,
	SquareBulletListIcon,
} from "../../Icons";
import { MenuButton } from "../MenuButton";

import { MenuDropdown } from "../../MenuDropdown";
import { TooltipContent } from "../../TooltipContent";
import { MenuSplitButton } from "../MenuSplitButton";
import { _t } from "../../../helpers/strings";

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
			tooltip={{
				content: (
					<TooltipContent
						title={_t("commands.unordered_list.title")}
						shortcut="Alt-U"
					/>
				),
			}}
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
					if (editor.getAttributes("bulletList")["type"] === type) {
						return editor.chain().focus().toggleBulletList().run();
					}
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
					disabled={!editor.can().toggleBulletList()}
					active={editor.isActive("bulletList", { type: type })}
					tooltip={_t(`commands.unordered_list.${type}`)}
					dropdown={{ isDropdownItem: true }}
				/>
			);
		}
	);

	let dropdownContent = (
		<MenuDropdown
			id="unordered-list-dropdown"
			children={bulletListDropdownItems}
			nCols={3}
		/>
	);

	return (
		<MenuButton
			command={() => {
				setIsOpen(!isOpen);
				return editor.commands.focus();
			}}
			disabled={!editor.can().toggleBulletList()}
			active={isOpen}
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
			disabled={!editor.can().toggleBulletList()}
			active={editor.isActive("bulletList")}
		/>
	);
};
