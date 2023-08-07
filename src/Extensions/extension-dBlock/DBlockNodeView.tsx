/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useMemo } from "react";
import { NodeViewWrapper, NodeViewProps, NodeViewContent } from "@tiptap/react";
import { GrabberVerticalIcon, PlusIcon } from "../../components";

export const DBlockNodeView: React.FC<NodeViewProps> = ({
	node,
	getPos,
	editor,
}) => {
	const isTable = useMemo(() => {
		const { content } = node.content as any;

		return content[0].type.name === "table";
	}, [node.content]);

	const createNodeAfter = () => {
		const pos = getPos() + node.nodeSize;

		editor.commands.insertContentAt(pos, {
			type: "dBlock",
			content: [
				{
					type: "paragraph",
				},
			],
		});
	};

	return (
		<NodeViewWrapper
			as="div"
			data-block
			className="flex gap-2 group w-full relative"
		>
			<section className="flex gap-1" aria-label="left-menu">
				<button
					type="button"
					className="d-block-button plus-btn group-hover:opacity-100"
					onClick={createNodeAfter}
				>
					<PlusIcon />
				</button>
				<div
					className="d-block-button drag-btn group-hover:opacity-100"
					contentEditable={false}
					draggable
					data-drag-handle
				>
					<GrabberVerticalIcon />
				</div>
			</section>

			<NodeViewContent
				className={`node-view-content w-full ${isTable ? "ml-6" : ""}`}
			/>
		</NodeViewWrapper>
	);
};
