import { Editor } from "@tiptap/react";
import { MenuButton } from "../MenuButton";
import { PreviewIcon, RedoIcon } from "../../Icons";
import { TooltipContent } from "../../TooltipContent";
import { _t } from "../../../helpers/strings";
import { useState, useEffect } from "react";
import EyeIcon from "../../Icons/EyeIcon";
import { Modal } from "../../Modal";
import {
	handleCodeBlocks,
	handleSpoilers,
	handleTaskItems,
} from "../../../main";

type Props = {
	editor: Editor;
};

export const PreviewButton = ({ editor }: Props) => {
	let [isOpen, setIsOpen] = useState(false);
	let [exists, setExists] = useState(false);

	let handleClick = () => {
		setExists(true);
		setIsOpen(true);
		editor.setEditable(false);
		return true;
	};

	useEffect(() => {
		handleSpoilers();
		handleTaskItems();
		handleCodeBlocks();
	});

	return (
		<div>
			<MenuButton
				icon={<PreviewIcon />}
				command={handleClick}
				tooltip={{
					content: <TooltipContent title={_t("commands.preview")} />,
				}}
			/>
			{exists && (
				<Modal
					isOpen={isOpen}
					onOutsideClick={() => {
						setIsOpen(false);
						editor.setEditable(true);
					}}
				>
					<div
						style={{ maxWidth: "800px" }}
						className="s-prose ProseMirror preview"
						dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
					></div>
				</Modal>
			)}
		</div>
	);
};
