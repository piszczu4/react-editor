import * as commands from "../../commands";
import { Extension } from "@tiptap/react";

export * from "../../commands";

export const CustomCommands = Extension.create({
	name: "custom-commands",

	addCommands() {
		return {
			...commands,
		};
	},
});
