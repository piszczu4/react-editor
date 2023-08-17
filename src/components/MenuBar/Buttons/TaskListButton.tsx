import { Editor } from "@tiptap/react";
import { MenuButton } from "../MenuButton";
import { TaskListIcon } from "../../Icons";
import { TooltipContent } from "../../TooltipContent";
import { _t } from "../../../helpers/strings";

type Props = {
	editor: Editor;
};

export const TaskListButton = ({ editor }: Props) => {
	return (
		<MenuButton
			icon={<TaskListIcon />}
			command={() => editor.chain().focus().toggleTaskList().run()}
			disabled={!editor.can().toggleTaskList()}
			active={editor.isActive("taskList")}
			tooltip={{
				content: (
					<TooltipContent title={_t("commands.task_list")} shortcut="Alt-T" />
				),
			}}
		/>
	);
};
