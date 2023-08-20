/// @ts-nocheck

import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";

import TagList from "./TagList.jsx";

export default {
	items: ({ query }) => {
		return [
			"Rachunek prawdopodobieństwa",
			"Statystyka",
			"Analiza matematyczna",
			"Algebra",
			"Topologia",
			"Geometria",
			"Matematyka dyskretna",
			"Matematyka stosowana",
		]
			.filter((item) => item.toLowerCase().startsWith(query.toLowerCase()))
			.slice(0, 5);
	},

	render: () => {
		let component;
		let popup;

		return {
			onStart: (props) => {
				component = new ReactRenderer(TagList, {
					props,
					editor: props.editor,
				});

				if (!props.clientRect) {
					return;
				}

				popup = tippy("body", {
					getReferenceClientRect: props.clientRect,
					appendTo: () => document.body,
					content: component.element,
					showOnCreate: true,
					interactive: true,
					trigger: "manual",
					placement: "bottom-start",
				});
			},

			onUpdate(props) {
				component.updateProps(props);

				if (!props.clientRect) {
					return;
				}

				popup[0].setProps({
					getReferenceClientRect: props.clientRect,
				});
			},

			onKeyDown(props) {
				if (props.event.key === "Escape") {
					popup[0].hide();

					return true;
				}

				return component.ref?.onKeyDown(props);
			},

			onExit() {
				popup[0].destroy();
				component.destroy();
			},
		};
	},
};
