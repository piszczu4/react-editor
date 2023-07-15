/** Curried helper method that wraps a i18n method for menu entries w/ shortcuts */
function shortcut(text: string) {
	return (args: { shortcut?: string }) => `${text} (${args.shortcut})`;
}
/** The default set of localizable strings */
export const defaultStrings: Record<any, any> = {
	commands: {
		blockquote: shortcut("Blockquote"),
		bold: shortcut("Bold"),
		clear_formatting: "Clear formatting",
		code_block: {
			title: shortcut("Code block"),
			description: "Multiline block of code with syntax highlighting",
		},
		emphasis: shortcut("Italic"),
		font_family: "Font family",
		font_size: "Font size",
		heading: {
			dropdown: shortcut("Heading"),
			entry: ({ level }: { level: 1 | 2 | 3 | 4 | 5 | 6 }) =>
				`Heading ${level}`,
		},
		help: "Help",
		horizontal_rule: shortcut("Horizontal rule"),
		image: shortcut("Image"),
		inline_code: {
			title: shortcut("Inline code"),
			description: "Single line code span for use within a block of text",
		},
		kbd: shortcut("Keyboard"),
		link: shortcut("Link"),
		metaTagLink: shortcut("Meta tag"),
		moreFormatting: "More formatting",
		ordered_list: shortcut("Numbered list"),
		redo: shortcut("Redo"),
		spoiler: shortcut("Spoiler"),
		sub: "Subscript",
		sup: "Superscript",
		strikethrough: "Strikethrough",
		table_edit: "Edit table",
		table_insert: shortcut("Table"),
		table_column: {
			insert_after: "Insert column after",
			insert_before: "Insert column before",
			remove: "Remove column",
		},
		table_row: {
			insert_after: "Insert row after",
			insert_before: "Insert row before",
			remove: "Remove row",
		},
		tagLink: shortcut("Tag"),
		task_list: "Task list",
		text_color: "Text color",
		underline: "Underline",
		undo: shortcut("Undo"),
		unordered_list: shortcut("Bulleted list"),
	},
	link_editor: {
		cancel_button: "Cancel",
		href_label: "Link URL",
		save_button: "Save",
		text_label: "Link text",
		validation_error: "The entered URL is invalid.",
	},
	link_tooltip: {
		edit_button_title: "Edit link",
		remove_button_title: "Remove link",
	},
	menubar: {
		mode_toggle_markdown_title: "Markdown mode",
		mode_toggle_preview_title: "Markdown with preview mode",
		mode_toggle_richtext_title: "Rich text mode",
	},
	nodes: {
		codeblock_lang_auto: ({ lang }: { lang: string }) => `${lang} (auto)`,
		spoiler_reveal_text: "Reveal spoiler",
	},
	image_upload: {
		default_image_alt_text: "enter image description here",
		external_url_validation_error: "The entered URL is invalid.",
		upload_error_file_too_big: "Your image is too large to upload (over 2 MiB)",
		upload_error_generic: "Image upload failed. Please try again.",
		upload_error_unsupported_format:
			"Please select an image (jpeg, png, gif) to upload",
		uploaded_image_preview_alt: "uploaded image preview",
	},
};

/** The set of strings that were overridden by registerLocalizationStrings */
let strings = defaultStrings;
/** Registers new localization strings; any strings that are left unregistered will fall back to the default value */
export function overrideStrings(newStrings: Record<any, any>) {
	strings = newStrings;
}
/** Resolves a dot-separated key against an object */
function resolve(obj: Record<any, any>, key: string) {
	return key
		.split(".")
		.reduce((p, n) => (p === null || p === void 0 ? void 0 : p[n]), obj);
}
/** Caches key lookups to their values so we're not continuously splitting */
const cache: Record<string, any> = {};
/**
 * Checks the localized strings for a given key and returns the value
 * @param key A dot-separated key to the localized string e.g. "commands.bold"
 * @param params An object of parameters to pass to the localization function if it exists
 */
export function _t(key: string, params = {}) {
	if (!(key in cache)) {
		cache[key] = resolve(strings, key) || resolve(defaultStrings, key);
	}
	const string = cache[key];
	if (!string) {
		throw `Missing translation for key: ${key}`;
	}
	if (typeof string === "string") {
		return string;
	} else if (typeof string === "function") {
		return string(params);
	}
	throw `Missing translation for key: ${key}`;
}
