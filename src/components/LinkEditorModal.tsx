import { useState } from "react";
import ReactDOM from "react-dom";

import { EditorView } from "@tiptap/pm/view";
import { TextSelection } from "prosemirror-state";
import { _t } from "../helpers/strings";

import { hideModal, showModal } from "@stackoverflow/stacks";
import { useEffect, useRef } from "react";

import { BubbleMenu, Editor } from "@tiptap/react";

import "tippy.js/dist/svg-arrow.css";

import { getMarkAttributes, getMarkRange } from "@tiptap/react";
import { stackOverflowValidateLink } from "../extensions/extension-link/utils";

type LinkButtonProps = {
	view: EditorView;
};

export function LinkButton({ view }: LinkButtonProps) {
	let [isModalVisible, setIsModalVisible] = useState(false);
	return (
		<>
			<button
				onClick={() => {
					setIsModalVisible(true);
					showModal(document.querySelector("#modal-base") as HTMLElement);
				}}
			>
				Link
			</button>
			{}
			{isModalVisible && (
				<LinkEditorModal
					view={view}
					href=""
					text=""
					onClose={() => setIsModalVisible(false)}
				/>
			)}
		</>
	);
}
