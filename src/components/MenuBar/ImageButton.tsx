// import { Editor } from "@tiptap/react";
// import { MenuButton } from "./MenuButton";
// import { ImageIcon } from "..";
// import { TooltipContent } from "../TooltipContent";

// type Props = {
// 	editor: Editor;
// };

// export const CodeBlockButton = ({ editor }: Props) => {
// 	return (
// 		<MenuButton
// 			icon={<ImageIcon />}
// 			command={() => editor.chain().focus().SetMedia().run()}
// 			disabled={!editor.can().chain().focus().toggleBlockquote().run()}
// 			active={editor.isActive("blockquote")}
// 			tooltip={{
// 				content: <TooltipContent content="Blockquote" shortcut="Mod-Q" />,
// 			}}
// 		/>
// 	);
// };
