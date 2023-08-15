let _language = "en";

export function setLanguage(language: string) {
	_language = language;
}

/** Curried helper method that wraps a i18n method for menu entries w/ shortcuts */
function shortcut(text: string) {
	return (args: { shortcut?: string }) => `${text} (${args.shortcut})`;
}

/** The default set of localizable strings */
export const defaultStrings: Record<any, any> = {
	en: {
		commands: {
			blockquote: "Blockquote", // DONE
			bold: "Bold", // DONE
			clear_formatting: {
				title: "Clear formatting",
				description:
					"Allows you to remove all formatting in the selection, leaving only plain, unformatted text",
			},
			code_block: {
				// DONE
				title: "Code block",
				description: "Multiline block of code with syntax highlighting",
			},
			details: "Details",
			font_family: "Font family",
			font_size: "Font size",
			heading: {
				dropdown: shortcut("Heading"),
				entry: ({ level }: { level: 1 | 2 | 3 | 4 | 5 | 6 }) =>
					`Heading ${level}`,
			},
			help: "Help",
			horizontal_rule: "Horizontal rule",
			image: shortcut("Image"),
			code: {
				// DONE
				title: "Inline code",
				description: "Single line code span for use within a block of text",
			},
			italic: "Italic", // DONE
			keyboard: "Keyboard", // DONE
			link: shortcut("Link"),
			math_display: "Math Display",
			math_inline: "Math Inline",
			metaTagLink: shortcut("Meta tag"),
			moreFormatting: "More formatting",
			ordered_list: shortcut("Numbered list"),
			redo: "Redo", // DONE
			spoiler: "Spoiler", // DONE
			subscript: "Subscript", // DONE
			superscript: "Superscript", // DONE
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
			underline: "Underline", // DONE
			undo: "Undo", // DONE
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
			upload_error_file_too_big:
				"Your image is too large to upload (over 2 MiB)",
			upload_error_generic: "Image upload failed. Please try again.",
			upload_error_unsupported_format:
				"Please select an image (jpeg, png, gif) to upload",
			uploaded_image_preview_alt: "uploaded image preview",
		},
	},

	pl: {
		commands: {
			blockquote: "Cytat", // DONE
			bold: "Pogrubienie", // DONE
			clear_formatting: {
				title: "Wyczyść całe formatowanie",
				description:
					"Umożliwia usunięcie całego formatowania w zaznaczeniu, co spowoduje pozostawienie tylko zwykłego, niesformatowanego tekstu",
			},
			code_block: {
				// DONE
				title: "Blok kodu",
				description: "Wieloliniowy blok kodu z podświetleniem składni",
			},
			details: "Detale",
			font_family: "Czcionka",
			font_size: "Rozmiar czcionki",
			heading: {
				dropdown: shortcut("Nagłówek"),
				entry: ({ level }: { level: 1 | 2 | 3 | 4 | 5 | 6 }) =>
					`Nagłówek ${level}`,
			},
			help: "Pomoc",
			horizontal_rule: "Linia pozioma",
			image: shortcut("Obraz"),
			code: {
				// DONE
				title: "Kod jednoliniowy",
				description: "Pojedyncza linia kodu do użycia w bloku tekstu",
			},
			italic: "Kursywa", // DONE
			keyboard: "Klawiatura", // DONE
			link: shortcut("Link"),
			math_display: "Math Display",
			math_inline: "Math Inline",
			metaTagLink: shortcut("Meta tag"),
			moreFormatting: "Więcej formatowania",
			ordered_list: shortcut("Lista numerowana"),
			redo: "Powtórz", // DONE
			spoiler: "Spojler", // DONE
			subscript: "Indeks dolny", // DONE
			superscript: "Indeks górny", // DONE
			strikethrough: "Przekreślenie",
			table_edit: "Tabela",
			table_insert: shortcut("Tabela"),
			table_column: {
				insert_after: "Dodaj kolumne po",
				insert_before: "Dodaj kolumne przed",
				remove: "Usuń kolumne",
			},
			table_row: {
				insert_after: "Dodaj wiersz po",
				insert_before: "Dodaj wiersz przed",
				remove: "Usuń wiersz",
			},
			tagLink: shortcut("Tag"),
			task_list: "Lista zadań",
			text_color: "Kolor czcionki",
			underline: "Podkreślenie", // DONE
			undo: "Cofnij", // DONE
			unordered_list: shortcut("Lista wypunktowana"),
		},
		link_editor: {
			cancel_button: "Anuluj",
			href_label: "Link URL",
			save_button: "Zapisz",
			text_label: "tekst linku",
			validation_error: "Wpisany link URL jest nieprawidłowy",
		},
		link_tooltip: {
			edit_button_title: "Edytuj link",
			remove_button_title: "Usuń link",
		},
		menubar: {
			mode_toggle_markdown_title: "Markdown mode",
			mode_toggle_preview_title: "Markdown with preview mode",
			mode_toggle_richtext_title: "Rich text mode",
		},
		nodes: {
			codeblock_lang_auto: ({ lang }: { lang: string }) => `${lang} (auto)`,
			spoiler_reveal_text: "Odkryj spoiler",
		},
		image_upload: {
			default_image_alt_text: "enter image description here",
			external_url_validation_error: "The entered URL is invalid.",
			upload_error_file_too_big:
				"Your image is too large to upload (over 2 MiB)",
			upload_error_generic: "Image upload failed. Please try again.",
			upload_error_unsupported_format:
				"Please select an image (jpeg, png, gif) to upload",
			uploaded_image_preview_alt: "uploaded image preview",
		},
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
		cache[key] =
			resolve(strings[_language], key) || resolve(defaultStrings, key);
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
