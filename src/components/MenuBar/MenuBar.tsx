import { Editor } from "@tiptap/react";
import { MenuBlock } from "./MenuBlock";

import { AlignDropdownButton } from "./DropdownButtons/AlignDropdownButton";
import { BackgroundColorSplitButton } from "./SplitButtons/BackgroundColorSplitButton";
import { BlockquoteButton } from "./Buttons/BlockquoteButton";
import { BoldButton } from "./Buttons/BoldButton";
import { BulletListSplitButton } from "./SplitButtons/UnorderedListSplitButton";
import { ClearFormattingButton } from "./Buttons/ClearFormattingButton";
import { CodeBlockButton } from "./Buttons/CodeBlockButton";
import { CodeButton } from "./Buttons/CodeButton";
import { CodeViewButton } from "./Buttons/CodeViewButton";
import { DetailsButton } from "./Buttons/DetailsButton";
import { FontFamilyDropdownButton } from "./DropdownButtons/FontFamilyDropdownButton";
import { FontSizeDropdownButton } from "./DropdownButtons/FontSizeDropdownButton";
import { FullscreenButton } from "./Buttons/FullscreenButton";
import { HeadingDropdownButton } from "./DropdownButtons/HeadingDropdownButton";
import { HorizontalRuleButton } from "./Buttons/HorizontalRuleButton";
import { ImageButton } from "./ModalButtons/ImageButton";
import { ItalicButton } from "./Buttons/ItalicButton";
import { KeyboardButton } from "./Buttons/KeyboardButton";
import { LinkButton } from "./ModalButtons/LinkButton";
import { MathDisplayButton } from "./Buttons/MathDisplayButton";
import { MathInlineButton } from "./Buttons/MathInlineButton";
import { MathPanelButton } from "./Buttons/MathPanelButton";
import { OrderedListSplitButton } from "./SplitButtons/OrderedListSplitButton";
import { PanelButton } from "./Buttons/PanelButton";
import { SpoilerButton } from "./Buttons/SpoilerButton";
import { StrikethroughButton } from "./Buttons/StrikethroughButton";
import { SubscriptButton } from "./Buttons/SubscriptButton";
import { SuperscriptButton } from "./Buttons/SuperscriptButton";
import { TableButton } from "./DropdownButtons/TableButton";
import { TaskListButton } from "./Buttons/TaskListButton";
import { TextColorSplitButton } from "./SplitButtons/TextColorSplitButton";
import { UnderlineButton } from "./Buttons/UnderlineButton";
import { VideoButton } from "./ModalButtons/VideoButton";
import { PreviewButton } from "./Buttons/PreviewButton";
import { MathPanelV2Button } from "./Buttons/MathPanelV2Button";

type MenuBarProps = {
	editor: Editor;
	isCodeViewMode: boolean;
	setIsCodeViewMode: (isCodeViewMode: boolean) => void;
	isFullscreenMode: boolean;
	setIsFullscreenMode: (isCodeViewMode: boolean) => void;
};

export const MenuBar = ({
	editor,
	isCodeViewMode,
	setIsCodeViewMode,
	isFullscreenMode,
	setIsFullscreenMode,
}: MenuBarProps) => {
	if (!editor) {
		return null;
	}

	return (
		<>
			<div id="editor-menu-bar--sticky-wrapper">
				<div id="editor-menu-bar">
					<MenuBlock>
						<BoldButton editor={editor} />
						<UnderlineButton editor={editor} />
						<ItalicButton editor={editor} />
						<StrikethroughButton editor={editor} />
						<SubscriptButton editor={editor} />
						<SuperscriptButton editor={editor} />
						<KeyboardButton editor={editor} />
						<TextColorSplitButton editor={editor} />
						<BackgroundColorSplitButton editor={editor} />
						<ClearFormattingButton editor={editor} />
					</MenuBlock>

					<MenuBlock>
						<AlignDropdownButton editor={editor} />
						<FontSizeDropdownButton editor={editor} />
						<HeadingDropdownButton editor={editor} />
						<FontFamilyDropdownButton editor={editor} />
					</MenuBlock>

					<MenuBlock>
						<BulletListSplitButton editor={editor} />
						<OrderedListSplitButton editor={editor} />
						<TaskListButton editor={editor} />
					</MenuBlock>

					<MenuBlock>
						<CodeButton editor={editor} />
						<CodeBlockButton editor={editor} />
					</MenuBlock>

					<MenuBlock>
						<BlockquoteButton editor={editor} />
						<SpoilerButton editor={editor} />
						<HorizontalRuleButton editor={editor} />
						<DetailsButton editor={editor} />
						<MathInlineButton editor={editor} />
						<MathDisplayButton editor={editor} />
					</MenuBlock>

					<MenuBlock>
						<PanelButton editor={editor} />
						<MathPanelButton editor={editor} />
					</MenuBlock>

					<MenuBlock>
						<LinkButton editor={editor} />
						<ImageButton editor={editor} />
						<VideoButton editor={editor} />
						<TableButton editor={editor} />
					</MenuBlock>

					<MenuBlock>
						<FullscreenButton
							isFullscreenMode={isFullscreenMode}
							setIsFullscreenMode={setIsFullscreenMode}
						/>
						<CodeViewButton
							editor={editor}
							isCodeViewMode={isCodeViewMode}
							setIsCodeViewMode={setIsCodeViewMode}
						/>
						<PreviewButton editor={editor} />
					</MenuBlock>
				</div>
			</div>
		</>
	);
};
