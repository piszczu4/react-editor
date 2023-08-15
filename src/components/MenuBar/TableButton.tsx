import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { TableIcon } from "..";
import { TooltipContent } from "../TooltipContent";
import { useEffect, useState } from "react";

const INIT_GRID_SIZE = 5;
const MAX_GRID_SIZE = 10;
const DEFAULT_SELECTED_GRID_SIZE = 2;

interface GridSize {
	row: number;
	col: number;
}

export const TablePopover = ({
	isOpen,
	setIsOpen,
	editor,
}: {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	editor: Editor;
}) => {
	useEffect(() => {
		if (!isOpen) resetTableGridSize();
	}, [isOpen]);
	let [tableGridSize, setTableGridSize] = useState({
		row: INIT_GRID_SIZE,
		col: INIT_GRID_SIZE,
	});

	let [selectedTableGridSize, setSelectedTableGridSize] = useState({
		row: DEFAULT_SELECTED_GRID_SIZE,
		col: DEFAULT_SELECTED_GRID_SIZE,
	});

	function selectTableGridSize(row: number, col: number): void {
		setTableGridSize({
			row:
				row === tableGridSize.row
					? Math.min(row + 1, MAX_GRID_SIZE)
					: tableGridSize.row,
			col:
				col === tableGridSize.col
					? Math.min(col + 1, MAX_GRID_SIZE)
					: tableGridSize.col,
		});
		setSelectedTableGridSize({ row: row, col: col });
	}

	function onMouseDown(row: number, col: number): void {
		editor.commands.insertTable({ rows: row, cols: col, withHeaderRow: true });
		setIsOpen(false);
	}

	function resetTableGridSize(): void {
		setTableGridSize({ row: INIT_GRID_SIZE, col: INIT_GRID_SIZE });

		setSelectedTableGridSize({
			row: DEFAULT_SELECTED_GRID_SIZE,
			col: DEFAULT_SELECTED_GRID_SIZE,
		});
	}

	function Cell(row: number, col: number) {
		return (
			<div
				className={`table-grid-size-editor__cell ${
					row <= selectedTableGridSize.row &&
					col <= selectedTableGridSize.col &&
					"table-grid-size-editor__cell--selected"
				}`}
				onMouseOver={() => selectTableGridSize(row, col)}
				onMouseDown={() => onMouseDown(row, col)}
			>
				<div className="table-grid-size-editor__cell__inner" />
			</div>
		);
	}

	function Row(row: number) {
		let cells = [];
		for (let col = 1; col <= tableGridSize.col; col++)
			cells.push(Cell(row, col));
		return <div className="table-grid-size-editor__row">{...cells}</div>;
	}

	let rows: JSX.Element[] = [];
	for (let row = 1; row <= tableGridSize.row; row++) rows.push(Row(row));

	return (
		<div className="table-grid-size-editor">
			<div className="table-grid-size-editor__body">{...rows}</div>
			<div className="table-grid-size-editor__footer">
				{selectedTableGridSize.row} X {selectedTableGridSize.col}
			</div>
		</div>
	);
};

type Props = {
	editor: Editor;
};

export const TableButton = ({ editor }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	let dropdownContent = (
		<TablePopover isOpen={isOpen} setIsOpen={setIsOpen} editor={editor} />
	);

	return (
		<MenuButton
			icon={<TableIcon />}
			command={() => {
				setIsOpen(true);
				return true;
			}}
			disabled={
				!editor
					.can()
					.chain()
					.focus()
					.insertTable({ rows: 3, cols: 3, withHeaderRow: true })
					.run()
			}
			active={editor.isActive("table")}
			tooltip={{
				content: <TooltipContent title="Table" />,
			}}
			dropdown={{
				isDropdownButton: false,
				dropdownContent: dropdownContent,
				isOpen: isOpen,
				setIsOpen: setIsOpen,
			}}
		/>
	);
};
