import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { TaskListIcon } from "..";
import { TooltipContent } from "../TooltipContent";

type Props = {
	editor: Editor;
};

export const TaskListButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<TaskListIcon />}
			command={() => editor.chain().focus().toggleTaskList().run()}
			disabled={!editor.can().chain().focus().toggleTaskList().run()}
			active={editor.isActive("taskList")}
			tooltip={{
				content: <TooltipContent content="Task List" />,
			}}
		/>
	);
};
