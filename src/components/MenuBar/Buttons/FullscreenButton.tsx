import { Editor } from "@tiptap/react";
import { ScreenFullIcon, ScreenNormalIcon } from "../../Icons";
import { useState } from "react";
import { MenuButton } from "../MenuButton";
import { TooltipContent } from "../../TooltipContent";
import { _t } from "../../../helpers/strings";

type Props = {
	isFullscreenMode: boolean;
	setIsFullscreenMode: (isCodeViewMode: boolean) => void;
};

export const FullscreenButton = ({
	isFullscreenMode,
	setIsFullscreenMode,
}: Props) => {
	return (
		<MenuButton
			icon={!isFullscreenMode ? <ScreenFullIcon /> : <ScreenNormalIcon />}
			command={() => {
				setIsFullscreenMode(!isFullscreenMode);
				return true; //editor.commands.focus();
			}}
			active={isFullscreenMode}
			tooltip={{
				content: <TooltipContent title={_t("commands.fullscreen")} />,
			}}
		/>
	);
};
