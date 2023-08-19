import { BubbleMenu, Editor } from "@tiptap/react";
import { findNode, findNodePos } from "../../utils";
import { MenuButton } from "../MenuBar/MenuButton";
import {
	AlignCenterIcon,
	AlignLeftIcon,
	AlignRightIcon,
	MirrorHorizontalIcon,
	MirrorVerticalIcon,
	ResetIcon,
	RotateLeftIcon,
	RotateRightIcon,
	TrashIcon,
} from "../Icons";
import CaptionIcon from "../Icons/CaptionIcon";

type ImageFigureBubbleMenuProps = { editor: Editor };

export function ImageFigureBubbleMenu({ editor }: ImageFigureBubbleMenuProps) {
	return (
		<BubbleMenu
			pluginKey={"imageFigureBubbleMenu"}
			editor={editor}
			tippyOptions={{
				maxWidth: "100%",
				placement: "bottom",
				duration: 200,
				animation: "shift-toward-subtle",
				moveTransition: "transform 0.2s ease-in-out",
				getReferenceClientRect: () => {
					let nodeWithPos = findNode(editor, "image");
					let dom = editor.view.nodeDOM(nodeWithPos?.pos!) as HTMLElement;
					let img = dom.getElementsByTagName("img")[0] as HTMLElement;
					return img.getBoundingClientRect();
				},
			}}
			updateDelay={0}
			shouldShow={(props) => {
				return props.editor.isActive("image");
			}}
		>
			<div id="image-figure-bbm">
				<div className="d-flex">
					<MenuButton
						text={<span>50%</span>}
						command={() => {
							editor.commands.updateAttributes("figure", {
								width: "50%",
							});
							editor.commands.updateAttributes("image", {
								width: "100%",
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
							editor.commands.updateAttributes("image", {
								width: "100%",
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
							editor.commands.updateAttributes("image", {
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

					{/* <MenuButton
						icon={<RotateLeftIcon />}
						command={() => {
							editor.commands.rotate(-90, "");
							return true;
						}}
					/>

					<MenuButton
						icon={<RotateRightIcon />}
						command={() => {
							editor.commands.rotate(90, "");
							return true;
						}}
					/>

					<MenuButton
						icon={<MirrorVerticalIcon />}
						command={() => {
							editor.commands.rotate(180, "-x");
							return true;
						}}
					/>

					<MenuButton
						icon={<MirrorHorizontalIcon />}
						command={() => {
							editor.commands.rotate(180, "-y");
							return true;
						}}
					/> */}

					<MenuButton
						icon={<ResetIcon />}
						command={() => {
							editor.commands.resetAttributes("figure", [
								"width",
								"height",
								"dataAlign",
								"dataFloat",
							]);
							editor.commands.resetAttributes("image", [
								"width",
								"height",
								"data-rotate",
								"data-rotate-x",
								"data-rotate-y",
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
