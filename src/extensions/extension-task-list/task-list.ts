import TiptapTaskList from "@tiptap/extension-task-list";

export const TaskList = TiptapTaskList.extend({
	addKeyboardShortcuts() {
		return {
			"Alt-t": () => this.editor.commands.toggleTaskList(),
		};
	},
});
