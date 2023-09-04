import { Level } from "@tiptap/extension-heading";
import { Editor } from "@tiptap/react";
import { useState } from "react";
import {
	Header1Icon,
	Header2Icon,
	Header3Icon,
	Header4Icon,
	Header5Icon,
	Header6Icon,
	ParagraphIcon,
} from "../../Icons";
import { _t } from "../../../helpers/strings";
import { MenuDropdown } from "../../MenuDropdown";
import { TooltipContent } from "../../TooltipContent";
import { MenuButton } from "../MenuButton";

function getIcon(lev: number) {
	return lev === undefined ? (
		<ParagraphIcon />
	) : lev === 1 ? (
		<Header1Icon />
	) : lev === 2 ? (
		<Header2Icon />
	) : lev === 3 ? (
		<Header3Icon />
	) : lev === 4 ? (
		<Header4Icon />
	) : lev === 5 ? (
		<Header5Icon />
	) : (
		<Header6Icon />
	);
}

function getText(lev: number) {
	return lev === 0 ? (
		<p>{_t("commands.heading.level0")}</p>
	) : lev === 1 ? (
		<h1>{_t("commands.heading.level1")}</h1>
	) : lev === 2 ? (
		<h2>{_t("commands.heading.level2")}</h2>
	) : lev === 3 ? (
		<h3>{_t("commands.heading.level3")}</h3>
	) : lev === 4 ? (
		<h4>{_t("commands.heading.level4")}</h4>
	) : lev === 5 ? (
		<h5>{_t("commands.heading.level5")}</h5>
	) : (
		<h6>{_t("commands.heading.level6")}</h6>
	);
}

type Props = {
	editor: Editor;
};

export const HeadingDropdownButton = ({ editor }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	let headingDropdownItems = [0, 1, 2, 3, 4, 5, 6].map((lev) => {
		let key = lev === 0 ? "paragraph-btn" : `h${lev}-btn`;
		let text = getText(lev);

		return (
			<MenuButton
				key={key}
				command={() => {
					setIsOpen(false);
					return editor
						.chain()
						.focus()
						.command(({ commands }) => {
							if (lev === 0) return commands.setParagraph();
							else return commands.toggleHeading({ level: lev as Level });
						})
						.run();
				}}
				text={text}
				active={
					lev === 0
						? editor.isActive("paragraph")
						: editor.isActive("heading", { level: lev as Level })
				}
				dropdown={{ isDropdownItem: true }}
			/>
		);
	});

	let dropdownContent = (
		<MenuDropdown id="heading-dropdown" children={headingDropdownItems} />
	);

	let { level } = editor.getAttributes("heading");

	return (
		<MenuButton
			icon={getIcon(level)}
			command={() => {
				setIsOpen(!isOpen);
				return editor.commands.focus();
			}}
			disabled={!editor.can().chain().focus().setParagraph()}
			tooltip={{
				content: (
					<TooltipContent
						title={_t("commands.heading.title")}
						shortcut="Mod-Alt-[0-6]"
					/>
				),
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
