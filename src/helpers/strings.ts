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
			background_color: "Background color",
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
			code_view: "Code view",
			details: "Details",
			font_family: "Font family",
			font_size: {
				title: "Font size",
				increase: "Increase by 1px",
				decrease: "Decrease by 1px",
			},
			fullscreen: "Fullscreen",
			heading: {
				title: "Heading",
				level0: "Paragraph",
				level1: "Heading 1",
				level2: "Heading 2",
				level3: "Heading 3",
				level4: "Heading 4",
				level5: "Heading 5",
				level6: "Heading 6",
			},
			help: "Help",
			horizontal_rule: "Horizontal rule",
			code: {
				// DONE
				title: "Inline code",
				description: "Single line code span for use within a block of text",
			},
			image: { title: "Image" },
			indent: "Indent",
			italic: "Italic", // DONE
			keyboard: "Keyboard", // DONE
			link: {
				title: "Link",
			},
			math_display: "Math Display",
			math_inline: "Math Inline",
			math_panel: {
				title: "Math block",
				description:
					"Insert theorem, definition, lemma, example or remark block",
				definition: "Definition",
				theorem: "Theorem",
				lemma: "Lemma",
				example: "Example",
				remark: "Remark",
				proof: "Proof",
			},
			metaTagLink: shortcut("Meta tag"),
			moreFormatting: "More formatting",
			ordered_list: {
				title: "Numbered list",
				decimal: "Decimal",
				"lower-alpha": "Lower Alpha",
				"lower-greek": "Lower Greek",
				"lower-roman": "Lower Roman",
				"upper-alpha": "Upper Alpha",
				"upper-roman": "Upper Roman",
			},
			outdent: "Outdent",
			panel: {
				title: "Panel",
				description: "Insert Info, Note, Success, Warning or Error panel ",
				info: "Info",
				note: "Note",
				success: "Success",
				warning: "Warning",
				error: "Error",
				delete: "Delete",
			},
			redo: "Redo", // DONE
			spoiler: "Spoiler", // DONE
			subscript: "Subscript", // DONE
			superscript: "Superscript", // DONE
			strikethrough: "Strikethrough",
			table: {
				title: "Table",
			},
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
			task_list: "Task list",
			tagLink: shortcut("Tag"),
			text_align: {
				title: "Text Align",
				left: "Left",
				center: "Center",
				right: "Right",
				justify: "Justify",
			},
			text_color: "Text color",
			underline: "Underline", // DONE
			undo: "Undo", // DONE
			unordered_list: {
				title: "Bullet list",
				disc: "Disc",
				circle: "Circle",
				square: "Square",
			},
			video: {
				title: "Video",
			},
		},
		image_modal: {
			header: "Image",
			release: "Release to Upload,",
			drag: "Drag & Drop,",
			paste_image: "paste an image, ",
			paste_link: "paste image URL,",
			or: "or ",
			browse: "browse",
			supported_files: "Supports: JPEG, JPG, PNG",
			alt: "Image not found",
			add: "Add image",
			cancel: "Cancel",
			href_label: "Image URL",
			status: {
				empty: "Enter valid image URL",
				uploading: "Uploading...",
				success: "Image was successfully uploaded!",
				error: "Failed to upload an image. Try again.",
				badLink: "Image URL is invalid!",
				goodLink: "Image URL is correct!",
				unsupported: "Unsupported file type!",
			},
		},
		link_editor: {
			cancel_button: "Cancel",
			href_label: "Link URL",
			save_button: "Save",
			text_label: "Link text",
			validation_error: "The entered URL is invalid!",
			validation_info: "Enter valid URL",
			validation_success: "The entered URL is correct!",
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
		palette: {
			color: "Color",
			correct: "Color is correct!",
			info: "Enter valid CSS color",
			invalid: "Color is invalid!",
			presets: "Presets",
		},
		placeholders: {
			empty_editor: "Ask your question...",
			caption: "Caption",
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
		labels: {
			align_section: "Align",
			capitalization_section: "Capitalization",
			font_size_section: "Font size",
			font_size: {
				custom: "Custom",
				presets: "Presets",
			},
			indent_section: "Indent",
		},
		video_modal: {
			add: "Add video",
			cancel: "Cancel",
			header: "Video",
			url_label: "Video URL",
			status: {
				empty: "Enter valid video URL",
				bad_link:
					"Invalid video URL! Currently only YouTube and Vimeo videos are supported.",
				good_link: "Video URL is correct!",
			},
		},
	},

	pl: {
		commands: {
			background_color: "Kolor tła",
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
			code_view: "Widok kodu",
			details: "Detale",
			font_family: "Czcionka",
			font_size: {
				title: "Rozmiar czcionki",
				increase: "Zwiększ o 1px",
				decrease: "Zmniejsz o 1px",
			},
			fullscreen: "Tryb pełnoekranowy",
			heading: {
				title: "Nagłówek",
				level0: "Paragraf",
				level1: "Nagłówek 1",
				level2: "Nagłówek 2",
				level3: "Nagłówek 3",
				level4: "Nagłówek 4",
				level5: "Nagłówek 5",
				level6: "Nagłówek 6",
			},
			help: "Pomoc",
			horizontal_rule: "Linia pozioma",
			code: {
				// DONE
				title: "Kod jednoliniowy",
				description: "Pojedyncza linia kodu do użycia w bloku tekstu",
			},
			image: { title: "Image" },
			indent: "Zwiększ wcięcie",
			italic: "Kursywa", // DONE
			keyboard: "Klawiatura", // DONE
			link: {
				title: "Link",
			},
			math_display: "Wieloliniowe wyrażenie matematyczne",
			math_inline: "Jednoliniowe wyrażenie matematyczne",
			math_panel: {
				title: "Blok matematyczny",
				description:
					"Wstaw blok dla twierdzenia, definicjii, przykładu bądź uwagi.",
				definition: "Definicja",
				theorem: "Twierdzenie",
				lemma: "Lemat",
				example: "Przykład",
				remark: "Uwaga",
				proof: "Dowód",
			},
			metaTagLink: shortcut("Meta tag"),
			moreFormatting: "Więcej formatowania",
			ordered_list: {
				title: "Lista numerowana",
				decimal: "Liczbowe",
				"lower-alpha": "Małe łacińskie",
				"lower-greek": "Małe greckie",
				"lower-roman": "Małe rzymskie",
				"upper-alpha": "Duże łacińskie",
				"upper-roman": "Duże rzymskie",
			},
			outdent: "Zmniejsz wcięcie",
			panel: {
				title: "Panel",
				description: "Wstaw informację, notkę, sukces, ostrzeżenie lub błąd",
				info: "Informacja",
				note: "Notka",
				success: "Sukces",
				warning: "Ostrzeżenie",
				error: "Błąd",
				delete: "Usuń",
			},
			redo: "Powtórz", // DONE
			spoiler: "Spojler", // DONE
			subscript: "Indeks dolny", // DONE
			superscript: "Indeks górny", // DONE
			strikethrough: "Przekreślenie",
			table: {
				title: "Tabela",
			},
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
			text_align: {
				title: "Wyrównanie tekstu",
				left: "Wyrównaj do lewej",
				center: "Wyśrodkuj",
				right: "Wyrównaj do prawej",
				justify: "Wyjustuj",
			},
			text_color: "Kolor czcionki",
			underline: "Podkreślenie", // DONE
			undo: "Cofnij", // DONE
			unordered_list: {
				title: "Lista wypunktowana",
				disc: "Koło",
				circle: "Okrąg",
				square: "Kwadrat",
			},
			video: {
				title: "Wideo",
			},
		},
		image_modal: {
			header: "Obraz",
			release: "Upuść aby dodać,",
			drag: "Przeciągnij i upuść,",
			paste_image: "wklej obraz, ",
			paste_link: "wklej adres URL obrazu,",
			or: "albo ",
			browse: "wybierz z dysku",
			supported_files: "Dozwolone formaty: JPEG, JPG, PNG",
			alt: "Nie znaleziono obrazu",
			add: "Dodaj obraz",
			cancel: "Anuluj",
			href_label: "Adres URL obrazu",
			status: {
				empty: "Wpisz poprawny adres URL obrazu",
				uploading: "Dodawanie...",
				success: "Obraz został poprawnie dodany!",
				error: "Nie udało się dodać obrazu. Spróbuj ponownie.",
				badLink: "Adres URL obrazu jest nieprawidłowy!",
				goodLink: "Adres URL obrazu jest poprawny!",
				unsupported: "Niedozwolony format pliku!",
			},
		},
		link_editor: {
			cancel_button: "Anuluj",
			href_label: "Link URL",
			save_button: "Zapisz",
			text_label: "tekst linku",
			validation_error: "Wpisany adres URL jest nieprawidłowy!",
			validation_info: "Wpisz poprawny adres URL",
			validation_success: "Wpisany adres URL jest prawidłowy!",
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
		palette: {
			color: "Kolor",
			correct: "Kolor jest prawidłowy!",
			info: "Wpisz poprawny kolor CSS",
			invalid: "Kolor jest nieprawidłowy!",
			presets: "Presety",
		},
		placeholders: {
			empty_editor: "Zadaj swoje pytanie...",
			caption: "Podpis",
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
		labels: {
			align_section: "Wyrównanie",
			font_size: {
				custom: "Dowolny",
				presets: "Siatka",
			},
			capitalization_section: "Format",
			indent_section: "Wcięcie",
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
