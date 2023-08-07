import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { TableIcon } from "..";
import { TooltipContent } from "../TooltipContent";

type Props = {
	editor: Editor;
};

export const TableButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<TableIcon />}
			command={() =>
				editor
					.chain()
					.focus()
					.insertTable({ rows: 3, cols: 3, withHeaderRow: true })
					.run()
			}
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
				content: <TooltipContent content="Table" />,
			}}
		/>
	);
};
