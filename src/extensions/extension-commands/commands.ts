import * as commands from "../../commands";
import { Extension } from "@tiptap/react";
export * from "../../commands";

export const Commands = Extension.create({
	name: "commands_",

	addCommands() {
		return {
			...commands,
		};
	},
});
