import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { FontFamilyIcon } from "..";
import { TooltipContent } from "../TooltipContent";
import { useState } from "react";
import { MenuDropdown } from "../MenuDropdown";
import {
	ParagraphIcon,
	Header1Icon,
	Header2Icon,
	Header3Icon,
	Header4Icon,
	Header5Icon,
	Header6Icon,
} from "..";
import { Level } from "@tiptap/extension-heading";

function getIcon(lev: number) {
	return lev === 0 ? (
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
type Props = {
	editor: Editor;
};

export const HeadingDropdownButton = ({ editor }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	let headingDropdownItems = [0, 1, 2, 3, 4, 5, 6].map((lev) => {
		let key = lev === 0 ? "paragraph-btn" : `h${lev}-btn`;
		let text =
			lev === 0 ? (
				<p>Paragraph</p>
			) : lev === 1 ? (
				<h1>Heading 1</h1>
			) : lev === 2 ? (
				<h2>Heading 2</h2>
			) : lev === 3 ? (
				<h3>Heading 3</h3>
			) : lev === 4 ? (
				<h4>Heading 4</h4>
			) : lev === 5 ? (
				<h5>Heading 5</h5>
			) : (
				<h6>Heading 6</h6>
			);

		return (
			<MenuButton
				key={key}
				command={() => {
					setIsOpen(false);
					if (lev === 0) return editor.chain().focus().setParagraph().run();
					else {
						return editor
							.chain()
							.focus()
							.toggleHeading({ level: lev as Level })
							.run();
					}
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
				return true;
			}}
			disabled={!editor.can().chain().focus().setParagraph()}
			tooltip={{
				content: <TooltipContent content="Heading" shortcut="Mod-H" />,
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
