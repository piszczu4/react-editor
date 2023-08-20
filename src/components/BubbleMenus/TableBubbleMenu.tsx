import { BubbleMenu, Editor } from "@tiptap/react";
import { findNode } from "../../utils";
import {
	AlignCenterIcon,
	AlignLeftIcon,
	AlignRightIcon,
	ResetIcon,
	TrashIcon
} from "../Icons";
import CaptionIcon from "../Icons/CaptionIcon";
import { MenuButton } from "../MenuBar/MenuButton";

type MediaBubbleMenuProps = { editor: Editor };

export function TableBubbleMenu({ editor }: MediaBubbleMenuProps) {
	return (
		<BubbleMenu
			pluginKey={"tableBubbleMenu"}
			editor={editor}
			tippyOptions={{
				maxWidth: "100%",
				placement: "bottom",
				duration: 200,
				animation: "shift-toward-subtle",
				moveTransition: "transform 0.2s ease-in-out",
				getReferenceClientRect: () => {
					let nodeWithPos = findNode(editor, "table");
					let dom = editor.view.nodeDOM(nodeWithPos?.pos!) as HTMLElement;
					return dom.getBoundingClientRect();
				},
			}}
			updateDelay={0}
			shouldShow={(props) => {
				return props.editor.isActive("table");
			}}
		>
			<div id="table-bbm">
				<div className="d-flex">
					<MenuButton
						text={<span>50%</span>}
						command={() => {
							editor.commands.updateAttributes("figure", {
								width: "50%",
							});
							return true;
						}}
					/>

					<MenuButton
						text={<span>75%</span>}
						command={() => {
							editor.commands.updateAttributes("figure", {
								width: "75%",
							});
							return true;
						}}
					/>

					<MenuButton
						text={<span>100%</span>}
						command={() => {
							editor.commands.updateAttributes("figure", {
								width: "100%",
							});
							return true;
						}}
					/>

					<MenuButton
						icon={<AlignLeftIcon />}
						command={() => {
							editor.commands.updateAttributes("figure", {
								dataAlign: "left",
								dataFloat: null,
							});
							return true;
						}}
					/>

					<MenuButton
						icon={<AlignCenterIcon />}
						command={() => {
							editor.commands.updateAttributes("figure", {
								dataAlign: "center",
								dataFloat: null,
							});
							return true;
						}}
					/>

					<MenuButton
						icon={<AlignRightIcon />}
						command={() => {
							editor.commands.updateAttributes("figure", {
								dataAlign: "right",
								dataFloat: null,
							});
							return true;
						}}
					/>
				</div>

				<div className="d-flex">
					<MenuButton
						icon={<AlignLeftIcon />}
						command={() => {
							editor.commands.updateAttributes("figure", {
								dataAlign: null,
								dataFloat: "left",
							});
							return true;
						}}
					/>

					<MenuButton
						icon={<AlignRightIcon />}
						command={() => {
							editor.commands.updateAttributes("figure", {
								dataAlign: null,
								dataFloat: "right",
							});
							return true;
						}}
					/>

					<MenuButton
						icon={<CaptionIcon />}
						command={() => {
							editor.chain().toggleCaption();
							return true;
						}}
					/>

					<MenuButton
						text={<span>ResetWidth</span>}
						command={() => {
							let node = findNode(editor, "table");
							editor
								.chain()
								.focus()
								.setNodeSelection(node?.pos!)
								.updateAttributes("tableCell", { colwidth: null })
								.run();
							return true;
						}}
					/>

					<MenuButton
						icon={<ResetIcon />}
						command={() => {
							editor.commands.resetAttributes("figure", [
								"width",
								"height",
								"dataAlign",
								"dataFloat",
							]);
							return true;
						}}
					/>

					<MenuButton
						icon={<TrashIcon />}
						command={() => {
							editor.chain().focus().deleteNode("figure").run();
							return true;
						}}
					/>
				</div>
			</div>
		</BubbleMenu>
	);
}
