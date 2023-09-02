import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";

export function SpoilerNodeView({
	editor,
	node,
	updateAttributes,
	deleteNode,
}: NodeViewProps) {
	return (
		<NodeViewWrapper
			as="div"
			className="mw-panel panel-bubble-menu"
			data-panel-type={node.attrs.panelType}
			style={{ backgroundColor: getColor(node.attrs.panelType) }}
		>
			<div
				className="mw-panel--icon"
				contentEditable={false}
				style={{ color: getIconColor(node.attrs.panelType) }}
			>
				{getIcon(node.attrs.panelType)}
			</div>
			<NodeViewContent className="mw-panel--content" />
		</NodeViewWrapper>
	);
}
