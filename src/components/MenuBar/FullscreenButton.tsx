import { Editor } from "@tiptap/react";
import { MenuButton } from "./MenuButton";
import { ScreenFullIcon, ScreenNormalIcon } from "..";
import { TooltipContent } from "../TooltipContent";
import { useState } from "react";

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
				content: <TooltipContent content="Fullscreen" />,
			}}
		/>
	);
};
