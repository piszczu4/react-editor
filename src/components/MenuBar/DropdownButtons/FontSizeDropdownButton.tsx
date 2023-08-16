import { Editor } from "@tiptap/react";
import { MenuButton } from "../MenuButton";
import { FontSizeIcon, PlusIcon } from "../..";
import { TooltipContent } from "../../TooltipContent";
import { useEffect, useRef, useState } from "react";
import { MenuDropdown } from "../../MenuDropdown";
import { _t } from "../../../helpers/strings";
import { DropdownSection } from "../../DropdownSection";
import { LowercaseIcon } from "../..";
import MinusIcon from "../../Icons/MinusIcon";
import { getNodeAtPosition } from "../../../commands";

import { getFontSize } from "../../../extensions/extension-font-size";

const DEFAULT_FONT_SIZES: number[] = [
	8, 10, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72,
];

type Props = {
	editor: Editor;
};

export const FontSizeDropdownButton = ({ editor }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	// const LowercaseButton = ({ editor }: Props) => {
	// 	return (
	// 		<MenuButton
	// 			command={() => {
	// 				setIsOpen(false);
	// 				return editor.chain().focus().capitalize("lowercase").run();
	// 			}}
	// 			text={<span>lowercase</span>}
	// 			dropdown={{ isDropdownItem: true }}
	// 		/>
	// 	);
	// };

	// const UppercaseButton = ({ editor }: Props) => {
	// 	return (
	// 		<MenuButton
	// 			command={() => {
	// 				setIsOpen(false);
	// 				return editor.chain().focus().capitalize("uppercase").run();
	// 			}}
	// 			text={<span>UPPERCASE</span>}
	// 			dropdown={{ isDropdownItem: true }}
	// 		/>
	// 	);
	// };

	// const TitlecaseButton = ({ editor }: Props) => {
	// 	return (
	// 		<MenuButton
	// 			command={() => {
	// 				setIsOpen(false);
	// 				return editor.chain().focus().capitalize("titlecase").run();
	// 			}}
	// 			text={<span>Title Case</span>}
	// 			dropdown={{ isDropdownItem: true }}
	// 		/>
	// 	);
	// };

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
					setFontSize(size);
					return editor.chain().focus().toggleFontSize(size).run();
				}}
				active={editor.isActive({ fontSize: size })}
				text={text}
				dropdown={{ isDropdownItem: true }}
			/>
		);
	});

	let _fontSize = getFontSize(editor);
	let [fontSize, setFontSize] = useState(_fontSize);

	useEffect(() => {
		setFontSize(_fontSize);
	}, [_fontSize]);

	let inputGroup = (
		<div key="input-group" className="d-flex fw-wrap ai-center">
			<div className="flex--item">
				<MenuButton
					key="fs-decrease"
					icon={<MinusIcon />}
					command={() => {
						setFontSize(fontSize - 1);
						return editor
							.chain()
							.focus()
							.setFontSize(fontSize - 1)
							.run();
					}}
					tooltip={{
						content: (
							<TooltipContent
								title={_t("commands.font_size.decrease")}
								shortcut="Mod-Shift--"
							/>
						),
						placement: "left",
					}}
				/>
			</div>

			<div className="flex--item d-flex">
				<div className="d-flex fl-grow1 ps-relative">
					<input
						step="0.01"
						value={fontSize.toString()}
						type="number"
						id="fs-input"
						className="flex--item s-input bar0 w48"
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								editor
									.chain()
									.focus()
									.setFontSize(Number((event.target as HTMLInputElement).value))
									.run();
								setIsOpen(false);
							}
						}}
						onInput={(e) => {
							let input = Number((e.target as HTMLInputElement).value);
							setFontSize(input);
						}}
					/>
				</div>

				<div className="d-flex ai-center order-last s-input-fill brr0">
					<div className="d-flex gx4 ai-center">
						<label
							className="flex--item s-label s-label__sm fw-normal p1"
							htmlFor="fs-input"
						>
							px
						</label>
					</div>
				</div>
			</div>
			<div className="flex--item">
				<MenuButton
					key="fs-increase"
					icon={<PlusIcon />}
					command={() => {
						setFontSize(fontSize + 1);
						return editor
							.chain()
							.focus()
							.setFontSize(fontSize + 1)
							.run();
					}}
					tooltip={{
						content: (
							<TooltipContent
								title={_t("commands.font_size.increase")}
								shortcut="Mod-Shift-+"
							/>
						),
						placement: "right",
					}}
				/>
			</div>
		</div>
	);

	let dropdownContent = (
		<MenuDropdown id="font-size-dropdown">
			{[
				// <DropdownSection
				// 	key="casing-section"
				// 	label={_t("labels.capitalization_section")}
				// />,
				// <LowercaseButton editor={editor} />,
				// <UppercaseButton editor={editor} />,
				// <TitlecaseButton editor={editor} />,

				// <DropdownSection
				// 	key="font-size-section"
				// 	label={_t("labels.font_size_section")}
				// />,
				<DropdownSection
					key="fs-c-sec"
					label={_t("labels.font_size.custom")}
				/>,
				inputGroup,
				<DropdownSection
					key="fs-p-sec"
					label={_t("labels.font_size.presets")}
				/>,
				...fontSizeDropdownItems,
			]}
		</MenuDropdown>
	);

	// let { fontSize } = editor.getAttributes("textStyle");

	return (
		<MenuButton
			icon={<FontSizeIcon />}
			command={() => {
				setIsOpen(!isOpen);
				return true;
			}}
			disabled={!editor.can().toggleFontSize(16)}
			tooltip={{
				content: <TooltipContent title={_t("commands.font_size.title")} />,
			}}
			dropdown={{
				isDropdownButton: true,
				dropdownContent: dropdownContent,
				isOpen: isOpen,
				setIsOpen: setIsOpen,
			}}
			// text={<span>{fontSize ? fontSize + "px" : "(Default)"}</span>}
		/>
	);
};
