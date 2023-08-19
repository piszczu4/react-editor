import { BubbleMenu, Editor } from "@tiptap/react";
import {
	AddColumnAfterIcon,
	AddColumnBeforeIcon,
	AddRowAfterIcon,
	AddRowBeforeIcon,
	BackgroundColorIcon,
	BorderIcon,
	MergeCellsIcon,
	RemoveColumnIcon,
	RemoveRowIcon,
	SplitCellsIcon,
	TextColorIcon,
} from "../Icons";
import { MenuButton } from "../MenuBar/MenuButton";
import { ColorPalette } from "../ColorPalette";
import { useEffect, useState } from "react";
import { TooltipContent } from "../TooltipContent";
import { MenuSplitButton } from "../MenuBar/MenuSplitButton";
import { BoldButton } from "../MenuBar/Buttons/BoldButton";
import { MenuDropdown } from "../MenuDropdown";

type TableBubbleMenuProps = { editor: Editor };

export function TableCellBubbleMenu({ editor }: TableBubbleMenuProps) {
	const [isOpen, setIsOpen] = useState(false);
	let lastColor = editor.storage.tableCell.lastBgColor;

	let bgColorButton = (
		<MenuButton
			icon={<TextColorIcon color={lastColor} />}
			command={() =>
				editor
					.chain()
					.focus()
					.setCellAttribute("backgroundColor", lastColor)
					.run()
			}
		/>
	);

	let bgColorDropdownButton = (
		<MenuButton
			command={() => {
				setIsOpen(!isOpen);
				return true;
			}}
			active={isOpen}
			dropdown={{
				isDropdownButton: true,
				dropdownContent: (
					<ColorPalette
						colorCommand={(color: string) => () => {
							editor
								.chain()
								.focus()
								.setCellAttribute("backgroundColor", color)
								.run();
							setIsOpen(false);
							editor.storage.tableCell.lastBgColor = color;
						}}
						deleteCommand={() => {
							editor
								.chain()
								.focus()
								.setCellAttribute("backgroundColor", null)
								.run();
							setIsOpen(false);
						}}
					/>
				),
				isOpen: isOpen,
				setIsOpen: setIsOpen,
			}}
		/>
	);

	let bgColorSplitButton = (
		<MenuSplitButton
			id="table-cell-bg-color-split-button"
			button={bgColorButton}
			dropdownButton={bgColorDropdownButton}
		/>
	);

	// Border //

	// Border Type
	let [isBorderTypeDropdownOpen, setIsBorderTypeDropdownOpen] = useState(false);
	let lastBorderType = editor.storage.tableCell.lastBorderType;
	const TYPES = ["solid", "dashed", "dotted"];
	let borderTypeDropdownContent = TYPES.map((type, index) => {
		return (
			<MenuButton
				key={index}
				text={<hr style={{ borderTop: type + " black 2px", width: "30px" }} />}
				command={() => {
					setIsBorderTypeDropdownOpen(false);
					editor.storage.tableCell.lastBorderType = type;
					return true;
				}}
				dropdown={{ isDropdownItem: true }}
			/>
		);
	});

	let borderTypeDropdownButton = (
		<MenuButton
			text={
				<hr
					style={{ borderTop: lastBorderType + " black 2px", width: "30px" }}
				/>
			}
			command={() => {
				setIsBorderTypeDropdownOpen(!isBorderTypeDropdownOpen);
				return true;
			}}
			dropdown={{
				isDropdownButton: true,
				isOpen: isBorderTypeDropdownOpen,
				setIsOpen: setIsBorderTypeDropdownOpen,
				dropdownContent: (
					<MenuDropdown>{borderTypeDropdownContent}</MenuDropdown>
				),
			}}
		/>
	);

	// Border Color //
	let [isBorderColorDropdownOpen, setIsBorderColorDropdownOpen] =
		useState(false);
	let lastBorderColor = editor.storage.tableCell.lastBorderColor;

	let borderColorDropdownButton = (
		<MenuButton
			command={() => {
				setIsBorderColorDropdownOpen(!isOpen);
				return true;
			}}
			active={isOpen}
			dropdown={{
				isDropdownButton: true,
				dropdownContent: (
					<ColorPalette
						colorCommand={(color: string) => () => {
							editor.storage.tableCell.lastBorderColor = color;
							setIsBorderColorDropdownOpen(false);
						}}
						deleteCommand={() => {
							setIsBorderColorDropdownOpen(false);
						}}
					/>
				),
				isOpen: isBorderColorDropdownOpen,
				setIsOpen: setIsBorderColorDropdownOpen,
			}}
		/>
	);

	// Border Width //
	let lastBorderWidth = editor.storage.tableCell.lastBorderWidth;
	let [borderWidth, setBorderWidth] = useState(lastBorderWidth);

	useEffect(() => {
		[lastBorderWidth];
	});
	let borderWidthInput = (
		<input
			value={borderWidth}
			style={{ width: "30px" }}
			type="number"
			onInput={(e) => {
				let value = Number((e.target as HTMLInputElement).value);
				editor.storage.tableCell.lastBorderWidth = value;
				setBorderWidth(value);
				return true;
			}}
		/>
	);

	// Preview
	let previewElement = (
		<span className="d-flex">
			<hr
				style={{
					width: "50px",
					borderStyle: lastBorderType,
					borderColor: lastBorderColor,
					borderWidth: lastBorderWidth,
					alignSelf: "center",
				}}
			/>
		</span>
	);

	// Borders choice
	let [leftBorder, setLeftBorder] = useState(false);
	let [rightBorder, setRightBorder] = useState(false);
	let [topBorder, setTopBorder] = useState(false);
	let [bottomBorder, setBottomBorder] = useState(false);

	let bordersChoice = (
		<div className="d-grid">
			<MenuButton
				text={<span>Top</span>}
				command={() => {
					setTopBorder(!topBorder);
					return true;
				}}
				active={topBorder}
			/>

			<MenuButton
				text={<span>Right</span>}
				command={() => {
					setRightBorder(!rightBorder);
					return true;
				}}
				active={rightBorder}
			/>

			<MenuButton
				text={<span>Bottom</span>}
				command={() => {
					setBottomBorder(!bottomBorder);
					return true;
				}}
				active={bottomBorder}
			/>

			<MenuButton
				text={<span>Left</span>}
				command={() => {
					setLeftBorder(!leftBorder);
					return true;
				}}
				active={leftBorder}
			/>
		</div>
	);

	// Apply button //
	let applyButton = (
		<MenuButton
			text={<span>Apply</span>}
			command={() => {
				setIsDropdownBorderOpen(false);
				return editor
					.chain()
					.command(({ chain }) => {
						if (leftBorder) {
							chain().setCellAttribute(
								"borderLeft",
								`${lastBorderType} ${lastBorderColor} ${lastBorderWidth}px`
							);
						}
						if (rightBorder) {
							chain().setCellAttribute(
								"borderRight",
								`${lastBorderType} ${lastBorderColor} ${lastBorderWidth}px`
							);
						}
						if (bottomBorder) {
							chain().setCellAttribute(
								"borderBottom",
								`${lastBorderType} ${lastBorderColor} ${lastBorderWidth}px`
							);
						}
						if (topBorder) {
							chain().setCellAttribute(
								"borderTop",
								`${lastBorderType} ${lastBorderColor} ${lastBorderWidth}px`
							);
						}
						return true;
					})
					.run();
			}}
		/>
	);

	// Border Dropdown //
	let borderDropdownContent = (
		<div className="d-flex g8">
			{borderTypeDropdownButton}
			{borderColorDropdownButton}
			{borderWidthInput}
			{previewElement}
			{bordersChoice}
			{applyButton}
		</div>
	);

	// Border Button //
	let [isBorderDropdownOpen, setIsDropdownBorderOpen] = useState(false);
	let borderButton = (
		<MenuButton
			icon={<BorderIcon />}
			command={() => {
				setIsDropdownBorderOpen(!isBorderDropdownOpen);
				return true;
			}}
			dropdown={{
				isDropdownButton: true,
				dropdownIcon: false,
				isOpen: isBorderDropdownOpen,
				setIsOpen: setIsDropdownBorderOpen,
				dropdownContent: <MenuDropdown>{borderDropdownContent}</MenuDropdown>,
			}}
		/>
	);

	return (
		<BubbleMenu
			pluginKey={"tableCellBubbleMenu"}
			editor={editor}
			tippyOptions={{
				maxWidth: "100%",
				duration: 200,
				animation: "shift-toward-subtle",
				moveTransition: "transform 0.2s ease-in-out",
			}}
			updateDelay={0}
			shouldShow={(props) => {
				return props.editor.isActive("tableCell");
			}}
		>
			<div id="table-cell-bbm">
				<div className="d-flex">
					<MenuButton
						icon={<AddColumnBeforeIcon />}
						command={() => editor.chain().focus().addColumnBefore().run()}
					/>

					<MenuButton
						icon={<AddColumnAfterIcon />}
						command={() => editor.chain().focus().addColumnAfter().run()}
					/>

					<MenuButton
						icon={<RemoveColumnIcon />}
						command={() => editor.chain().focus().deleteColumn().run()}
					/>

					<MenuButton
						icon={<MergeCellsIcon />}
						command={() => editor.chain().focus().mergeCells().run()}
					/>

					{bgColorSplitButton}
				</div>

				<div className="d-flex">
					<MenuButton
						icon={<AddRowBeforeIcon />}
						command={() => editor.chain().focus().addRowBefore().run()}
					/>

					<MenuButton
						icon={<AddRowAfterIcon />}
						command={() => editor.chain().focus().addRowAfter().run()}
					/>

					<MenuButton
						icon={<RemoveRowIcon />}
						command={() => editor.chain().focus().deleteRow().run()}
					/>

					<MenuButton
						icon={<SplitCellsIcon />}
						command={() => editor.chain().focus().splitCell().run()}
					/>
					{borderButton}
				</div>

				{/* 
					<button
						onClick={() =>
							editor.chain().focus().setCellAttribute("colspan", 2).run()
						}
					>
						setCellAttribute
					</button> */}
			</div>
		</BubbleMenu>
	);
}
