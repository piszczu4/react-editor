import { Editor } from "@tiptap/react";
import { MenuButton } from "../MenuButton";
import { HelpIcon } from "../../Icons";
import { TooltipContent } from "../../TooltipContent";
import { _t } from "../../../helpers/strings";

export const HelpButton = () => {
	return (
		<MenuButton
			icon={<HelpIcon />}
			command={() => {
				window.open("https://www.mathwizards.pl/", "_blank");
				return true;
			}}
			tooltip={{ content: <TooltipContent title={_t("commands.help")} /> }}
		/>
	);
};
