import { Extension } from "@tiptap/react";
import { extendCodemirror } from "./utils";

export const DEFAULT_CODEMIRROR_OPTIONS = {
	lineNumbers: true,
	lineWrapping: true,
	tabSize: 2,
	tabMode: "indent",
	mode: "text/html",
};

export class CodeView extends Extension {
	constructor(options = {}) {
		options = { ...options, name: "code_view" };
		super(options);

		// @ts-ignore
		const { codemirror } = options;
		if (codemirror == null) {
			console.warn("`CodeView` extension requires the CodeMirror library.");
		} else {
			extendCodemirror(codemirror);
		}

		this.options = {
			codemirror,
			codemirrorOptions: {
				...this.defaultOptions.codemirrorOptions,
				// @ts-ignore
				...options.codemirrorOptions,
			},
		};
	}

	// get name() {
	// 	return "code_view";
	// }

	get defaultOptions() {
		return {
			codemirror: null,
			codemirrorOptions: {
				...DEFAULT_CODEMIRROR_OPTIONS,
			},
		};
	}
}
