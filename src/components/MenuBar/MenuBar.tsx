import { Editor } from "@tiptap/react";
import { _t } from "../../helpers/strings";
import { MenuButton } from "../MenuButton";
import { MenuDropdownButton } from "../MenuDropdownButton";
import { MenuBlock } from "./MenuBlock";

import { BlockquoteButton } from "./Buttons/BlockquoteButton";
import { BoldButton } from "./Buttons/BoldButton";
import { CodeBlockButton } from "./Buttons/CodeBlockButton";
import { CodeButton } from "./Buttons/CodeButton";
import { DetailsButton } from "./Buttons/DetailsButton";
import { FontSizeDropdownButton } from "./DropdownButtons/FontSizeDropdownButton";
import { HorizontalRuleButton } from "./Buttons/HorizontalRuleButton";
import { HelpButton } from "./Buttons/InfoButton";
import { ItalicButton } from "./Buttons/ItalicButton";
import { KeyboardButton } from "./Buttons/KeyboardButton";
import { RedoButton } from "./Buttons/RedoButton";
import { SpoilerButton } from "./Buttons/SpoilerButton";
import { StrikethroughButton } from "./Buttons/StrikethroughButton";
import { UnderlineButton } from "./Buttons/UnderlineButton";
import { UndoButton } from "./Buttons/UndoButton";
import { SubscriptButton } from "./Buttons/SubscriptButton";
import { SuperscriptButton } from "./Buttons/SuperscriptButton";
import { ClearFormattingButton } from "./Buttons/ClearFormattingButton";
import { TaskListButton } from "./TaskListButton";
import { FontFamilyDropdownButton } from "./DropdownButtons/FontFamilyDropdownButton";
import { FullscreenButton } from "./FullscreenButton";
import { Level } from "@tiptap/extension-heading";
import { HeadingDropdownButton } from "./DropdownButtons/HeadingDropdownButton";
import { OrderedListSplitButton } from "./OrderedListSplitButton";
import { BulletListSplitButton } from "./UnorderedListSplitButton";
import { LinkButton } from "./LinkButton";
import { AlignDropdownButton } from "./DropdownButtons/AlignDropdownButton";

import Tippy from "@tippyjs/react";
import { TextColorSplitButton } from "./TextColorSplitButton";
import { TableButton } from "./TableButton";
import { CodeViewButton } from "./CodeViewButton";
import { BackgroundColorSplitButton } from "./BackgroundColorSplitButton";
import { PanelButton } from "./PanelButton";
import { MathPanelButton } from "./MathPanelButton";
import ReactModal from "react-modal";
import { useState } from "react";
import { ImageButton } from "./ImageButton";
import { MathInlineButton } from "./Buttons/MathInlineButton";
import { MathDisplayButton } from "./Buttons/MathDisplayButton";

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

	let [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{/* <DialogModalTester editor={editor} /> */}

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
						<HeadingDropdownButton editor={editor} />
						<AlignDropdownButton editor={editor} />
						<FontSizeDropdownButton editor={editor} />
						<FontFamilyDropdownButton editor={editor} />
					</MenuBlock>
					<MenuBlock>
						<CodeButton editor={editor} />
						{/* dBlock! */}
						<CodeBlockButton editor={editor} />
					</MenuBlock>
					<MenuBlock>
						<BlockquoteButton editor={editor} />
						<SpoilerButton editor={editor} />
						<HorizontalRuleButton editor={editor} />
						<DetailsButton editor={editor} />
						<MathInlineButton editor={editor} />
						<MathDisplayButton editor={editor} />

						<ImageButton editor={editor} />
					</MenuBlock>

					<PanelButton editor={editor} />
					<MathPanelButton editor={editor} />

					<MenuBlock>
						<FullscreenButton
							isFullscreenMode={isFullscreenMode}
							setIsFullscreenMode={setIsFullscreenMode}
						/>
					</MenuBlock>

					<MenuBlock>
						<LinkButton editor={editor} />
					</MenuBlock>

					<MenuBlock>
						<CodeViewButton
							isCodeViewMode={isCodeViewMode}
							setIsCodeViewMode={setIsCodeViewMode}
						/>
						<TableButton editor={editor} />
						<SuperscriptButton editor={editor} />
						<TaskListButton editor={editor} />

						<OrderedListSplitButton editor={editor} />
						<BulletListSplitButton editor={editor} />

						<button
							onClick={() =>
								editor.commands.setImage({
									src: "https://i.ibb.co/F699RW5/leby.jpg",
									width: "500px",
								})
							}
						/>

						<button
							onClick={() =>
								editor.commands.setFigure({
									src: "https://i.ibb.co/F699RW5/leby.jpg",
									width: "500px",
								})
							}
						/>

						<button
							onClick={() =>
								editor.commands.setIframe({
									src: "https://player.vimeo.com/video/852812634?h=bf341d034c",
									width: "640",
									height: "360",
								})
							}
						>
							Iframe
						</button>

						<button
							onClick={() =>
								editor.commands.setVideo({
									src: "https://player.vimeo.com/video/852812634?h=bf341d034c",
									width: "640",
									height: "360",
								})
							}
						>
							video figure
						</button>

						<button onClick={() => editor.commands.setTable()}>
							table figure
						</button>
					</MenuBlock>

					{/* <MyModal /> */}

					{/* <div>
						<button onClick={() => setIsOpen(!isOpen)}></button>
						<ReactModal
							isOpen={isOpen}
							contentLabel="Minimal"
							parentSelector={() =>
								document.getElementById("modal-container") as HTMLElement
							}
						>
							<button onClick={() => setIsOpen(false)}> siema</button>
							<input type="file"></input>
						</ReactModal>
					</div> */}

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
