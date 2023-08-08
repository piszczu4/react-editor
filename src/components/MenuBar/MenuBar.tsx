import { Editor } from "@tiptap/react";
import { _t } from "../../helpers/strings";
import { MenuButton } from "../MenuButton";
import { MenuDropdownButton } from "../MenuDropdownButton";
import { MenuBlock } from "./MenuBlock";

import { BlockquoteButton } from "./BlockquoteButton";
import { BoldButton } from "./BoldButton";
import { CodeBlockButton } from "./CodeBlockButton";
import { CodeButton } from "./CodeButton";
import { DetailsButton } from "./DetailsButton";
import { FontSizeDropdownButton } from "./FontSizeDropdownButton";
import { HorizontalRuleButton } from "./HorizontalRuleButton";
import { HelpButton } from "./InfoButton";
import { ItalicButton } from "./ItalicButton";
import { KeyboardButton } from "./KeyboardButton";
import { RedoButton } from "./RedoButton";
import { SpoilerButton } from "./SpoilerButton";
import { StrikethroughButton } from "./StrikethroughButton";
import { UnderlineButton } from "./UnderlineButton";
import { UndoButton } from "./UndoButton";
import { SubscriptButton } from "./SubscriptButton";
import { SuperscriptButton } from "./SuperscriptButton";
import { ClearFormattingButton } from "./ClearFormattingButton";
import { TaskListButton } from "./TaskListButton";
import { LowercaseButton } from "./LowercaseButton";
import { UppercaseButton } from "./UppercaseButton";
import { TitlecaseButton } from "./TitlecaseButton";
import { FontFamilyDropdownButton } from "./FontFamilyDropdownButton";
import { FullscreenButton } from "./FullscreenButton";
import { Level } from "@tiptap/extension-heading";
import { HeadingDropdownButton } from "./HeadingDropdownButton";
import { OrderedListSplitButton } from "./OrderedListSplitButton";
import { BulletListSplitButton } from "./UnorderedListSplitButton";
import { LinkButton } from "./LinkButton";
import { AlignDropdownButton } from "./AlignDropdownButton";

import Tippy from "@tippyjs/react";
import { TextColorSplitButton } from "./TextColorSplitButton";
import { TableButton } from "./TableButton";
import { CodeViewButton } from "./CodeViewButton";
import { BackgroundColorSplitButton } from "./BackgroundColorSplitButton";
import { PanelButton } from "./PanelButton";
import { MathPanelButton } from "./MathPanelButton";

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
			{/* <DialogModalTester editor={editor} /> */}

			<div id="editor-menu-bar--sticky-wrapper">
				<div id="editor-menu-bar">
					<MenuBlock>
						<UndoButton editor={editor} />
						<RedoButton editor={editor} />
					</MenuBlock>
					<MenuBlock>
						<BoldButton editor={editor} />
						<UnderlineButton editor={editor} />
						<ItalicButton editor={editor} />
						<StrikethroughButton editor={editor} />
						<SubscriptButton editor={editor} />
						<TextColorSplitButton editor={editor} />
						<BackgroundColorSplitButton editor={editor} />
					</MenuBlock>
					<MenuBlock>
						<CodeButton editor={editor} />
						{/* dBlock! */}
						{/* <CodeBlockButton editor={editor} /> */}
					</MenuBlock>
					<MenuBlock>
						<BlockquoteButton editor={editor} />
						{/* <HorizontalRuleButton editor={editor} /> */}
					</MenuBlock>

					<PanelButton editor={editor} />
					<MathPanelButton editor={editor} />

					<MenuBlock>{<FontSizeDropdownButton editor={editor} />}</MenuBlock>

					<MenuBlock>
						<FullscreenButton
							isFullscreenMode={isFullscreenMode}
							setIsFullscreenMode={setIsFullscreenMode}
						/>
						<HelpButton />
					</MenuBlock>

					<MenuBlock>
						<LinkButton editor={editor} />
						<AlignDropdownButton editor={editor} />
					</MenuBlock>

					<MenuBlock>
						<CodeViewButton
							isCodeViewMode={isCodeViewMode}
							setIsCodeViewMode={setIsCodeViewMode}
						/>
						<TableButton editor={editor} />
						<KeyboardButton editor={editor} />
						<SpoilerButton editor={editor} />
						{/* <DetailsButton editor={editor} /> */}
						<SuperscriptButton editor={editor} />
						<ClearFormattingButton editor={editor} />
						<TaskListButton editor={editor} />
						<LowercaseButton editor={editor} />
						<UppercaseButton editor={editor} />
						<TitlecaseButton editor={editor} />
						<FontFamilyDropdownButton editor={editor} />
						<HeadingDropdownButton editor={editor} />

						<OrderedListSplitButton editor={editor} />
						<BulletListSplitButton editor={editor} />
					</MenuBlock>

					{/* <MenuBlock children={[codeViewButton, test]} />
					<span className="mw-menu-block__separator"></span>
					<MenuBlock
						children={[
                            keyboardButton,
							spoilerButton,
							detailsButton,
							alignDropdownButton,
							capitalizeButton,
						]}
                        />
                        <span className="mw-menu-block__separator"></span>
                        <MenuBlock children={[fullscreenButton]} />
					<span className="mw-menu-block__separator"></span>
					<MenuBlock
						children={[
							orderedListSplitButton,
							bulletListSplitButton,
							taskListButton,
						]}
                        />
                        <span className="mw-menu-block__separator"></span>
                        <MenuBlock children={[clearFormattingButton]} />
                        <span className="mw-menu-block__separator"></span>
                        <MenuBlock children={[textColorSplitButton]} />
					<span className="mw-menu-block__separator"></span>
					<MenuBlock
						children={[
                            italicButton,
							underlineButton,
							strikeButton,
							subscriptButton,
							superscriptButton,
						]}
					/>
					<MenuBlock
                    children={[
                        codeButton,
                        codeBlockButton,
							blockQuoteButton,
							horizontalRuleButton,
						]}
                        />
                        <span className="mw-menu-block__separator"></span>
                        <MenuBlock
						children={[
							fontFamilyDropdownButton,
							fontSizeDropdownButton,
							headingDropdownButton,
						]}
                        />
                        <span className="mw-menu-block__separator"></span>
					<MenuBlock children={[linkButton]} /> */}
					{/* <MenuBlock children={[undoButton, redoButton]} /> */}
				</div>
			</div>
		</>
	);
};
