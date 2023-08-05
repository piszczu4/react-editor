import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { HelpIcon } from "..";
import { TooltipContent } from "../TooltipContent";

export const HelpButton = () => {
	return (
		<MenuButton
			icon={<HelpIcon />}
			command={() => {
				window.open("https://www.mathwizards.pl/", "_blank");
				return true;
			}}
			tooltip={{ content: <TooltipContent content="Help" /> }}
		/>
	);
};
