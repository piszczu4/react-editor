import { Editor } from "@tiptap/react";
import { MenuBlock } from "./MenuBlock";

import { BackgroundColorSplitButton } from "./SplitButtons/BackgroundColorSplitButton";
import { BlockquoteButton } from "./Buttons/BlockquoteButton";
import { BoldButton } from "./Buttons/BoldButton";
import { ClearFormattingButton } from "./Buttons/ClearFormattingButton";
import { CodeBlockButton } from "./Buttons/CodeBlockButton";
import { CodeButton } from "./Buttons/CodeButton";
import { DetailsButton } from "./Buttons/DetailsButton";
import { HorizontalRuleButton } from "./Buttons/HorizontalRuleButton";
import { ItalicButton } from "./Buttons/ItalicButton";
import { KeyboardButton } from "./Buttons/KeyboardButton";
import { MathDisplayButton } from "./Buttons/MathDisplayButton";
import { MathInlineButton } from "./Buttons/MathInlineButton";
import { SpoilerButton } from "./Buttons/SpoilerButton";
import { StrikethroughButton } from "./Buttons/StrikethroughButton";
import { SubscriptButton } from "./Buttons/SubscriptButton";
import { SuperscriptButton } from "./Buttons/SuperscriptButton";
import { TaskListButton } from "./Buttons/TaskListButton";
import { UnderlineButton } from "./Buttons/UnderlineButton";
import { FontFamilyDropdownButton } from "./DropdownButtons/FontFamilyDropdownButton";
import { FontSizeDropdownButton } from "./DropdownButtons/FontSizeDropdownButton";
import { HeadingDropdownButton } from "./DropdownButtons/HeadingDropdownButton";
import { OrderedListSplitButton } from "./SplitButtons/OrderedListSplitButton";

import { AlignDropdownButton } from "./DropdownButtons/AlignDropdownButton";
import { FullscreenButton } from "./FullscreenButton";
import { LinkButton } from "./LinkButton";
import { BulletListSplitButton } from "./SplitButtons/UnorderedListSplitButton";

import { useState } from "react";
import { CodeViewButton } from "./CodeViewButton";
import { ImageButton } from "./ImageButton";
import { MathPanelButton } from "./Buttons/MathPanelButton";
import { PanelButton } from "./Buttons/PanelButton";
import { TextColorSplitButton } from "./SplitButtons/TextColorSplitButton";
import { TableButton } from "./TableButton";

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
						<BulletListSplitButton editor={editor} />
						<OrderedListSplitButton editor={editor} />
						<TaskListButton editor={editor} />
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

					<MenuBlock>
						<PanelButton editor={editor} />
						<MathPanelButton editor={editor} />
					</MenuBlock>

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
