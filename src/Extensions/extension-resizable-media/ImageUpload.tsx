import {
	Plugin,
	EditorState,
	Transaction,
	TextSelection,
	PluginView,
} from "@tiptap/pm/state";
import ReactDOM from "react-dom";
import { NodeSpec, Schema } from "@tiptap/pm/model";
import { Decoration, DecorationSet, EditorView } from "@tiptap/pm/view";

import { stackOverflowValidateLink as validateLink } from "../extension-link/utils";
import {
	useState,
	useRef,
	useEffect,
	ChangeEvent,
	DragEventHandler,
} from "react";

import { hideModal, showModal } from "@stackoverflow/stacks";

import { _t } from "../../helpers/strings";
import { Editor } from "@tiptap/react";

import { SpotImagePlaceholder } from "./assets";
import { default as CloseIcon } from "../../assets/close-icon.svg";
import { ImagesIcon } from "../../components";
// export function openImageUpload(
// 	state: EditorState,
// 	dispatch: (tr: Transaction) => void,
// 	view: EditorView
// ): boolean {
// 	if (!imageUploaderEnabled(view.state)) {
// 		return false;
// 	}

// 	if (!dispatch) return true;

// 	showImageUploader(view);
// 	return true;
// }

type ImageButtonProps = {
	view: EditorView;
	editor: Editor;
};

export function ImageButton({ view, editor }: ImageButtonProps) {
	let [isModalVisible, setIsModalVisible] = useState(false);
	return (
		<>
			<button
				onClick={() => {
					setIsModalVisible(true);
					showModal(document.querySelector("#modal-base") as HTMLElement);
				}}
			>
				Image
			</button>
			{}
			{isModalVisible && (
				<ImageUploadModal
					view={view}
					onClose={() => setIsModalVisible(false)}
					uploadOptions={{ handler: defaultImageUploadHandler }}
					editor={editor}
				/>
			)}
		</>
	);
}

/**
 * Async image upload callback that is passed the uploaded file and returns a resolvable path to the image
 * @param {File} file The uploaded image file or user entered image url
 * @returns {string} The resolvable path to where the file was uploaded
 */
type ImageUploadHandlerCallback = (file: File) => Promise<string>;

/**
 * Image upload options
 */
export interface ImageUploadOptions {
	/**
	 * A function handling file uploads. Will receive the file to upload
	 * as the `file` parameter and needs to return a resolved promise with the URL of the uploaded file
	 */
	handler?: ImageUploadHandlerCallback;
	/**
	 * The html to insert into the image uploader to designate the image storage provider
	 * NOTE: this is injected as-is and can potentially be a XSS hazard!
	 */
	brandingHtml?: string;
	/**
	 * The html to insert into the image uploader to alert users of the uploaded image content policy
	 * NOTE: this is injected as-is and can potentially be a XSS hazard!
	 */
	contentPolicyHtml?: string;
	/**
	 * If provided, will insert the html into a warning notice at the top of the image uploader
	 * NOTE: this is injected as-is and can potentially be a XSS hazard!
	 */
	warningNoticeHtml?: string;
	/**
	 * If true, wraps all images in links that point to the uploaded image url
	 */
	wrapImagesInLinks?: boolean;
	/**
	 * If true, all uploaded images will embedded as links to the image, rather than the image itself
	 * NOTE: this is only supported for images that are uploaded via the image uploader
	 */
	embedImagesAsLinks?: boolean;
	/**
	 * If true, allow users to add images via an external url
	 */
	allowExternalUrls?: boolean;
}

/**
 * Default image upload callback that posts to `/image/upload`,
 * expecting a json response like `{ UploadedImage: "https://www.example.com/path/to/file" }`
 * and returns `UploadedImage`'s value
 * @param file The file to upload
 */
export async function defaultImageUploadHandler(file: File): Promise<string> {
	const formData = new FormData();
	// formData.append("file", file);
	formData.append("key", "422a4e8bc4b4a8a67ee14c6ad3c0d69e");
	formData.append("image", file);

	const response = await fetch("https://api.imgbb.com/1/upload", {
		method: "POST",
		cache: "no-cache",
		body: formData,
	});

	if (!response.ok) {
		throw Error(
			`Failed to upload image: ${response.status} - ${response.statusText}`
		);
	}

	const json = await response.json(); //as { UploadedImage: string };
	return json.data.url;
}

enum ValidationResult {
	Ok,
	FileTooLarge,
	InvalidFileType,
}

let hide = () => {
	hideModal(document.querySelector("#modal-base") as HTMLElement);
	return true;
};

let show = () => {
	showModal(document.querySelector("#modal-base") as HTMLElement);
	return true;
};

type Props = {
	view: EditorView;
	uploadOptions: ImageUploadOptions;
	// validateLink: (str: string) => boolean;
	onClose: any;
	editor: Editor;
};

export function ImageUploadModal({
	view,
	uploadOptions,
	onClose,
	editor,
}: Props) {
	// let uploadOptions: ImageUploadOptions | null;
	let image: File | null;
	// let isVisible: boolean;
	// TODO do external image urls need to support a different link validator?
	// let validateLink: (str: string) => boolean;
	// let addTransactionDispatcher: addTransactionDispatcher;

	let uploadFieldRef = useRef<HTMLInputElement>(null);
	let externalUrlRef = useRef<HTMLInputElement>(null);
	let imagePreviewRef = useRef<HTMLDivElement>(null);
	let ctaContainerRef = useRef<HTMLDivElement>(null);
	let addImageButtonRef = useRef<HTMLButtonElement>(null);
	let cancelButtonRef = useRef<HTMLButtonElement>(null);
	let externalUrlInputContainerRef = useRef<HTMLDivElement>(null);
	let warningRef = useRef<HTMLDivElement>(null);
	let externalUrlTriggerRef = useRef<HTMLButtonElement>(null);
	let externalUrlTriggerContainerRef = useRef<HTMLElement>(null);

	let validationElementRef = useRef<HTMLElement>(null);
	let ref = useRef<HTMLDivElement>(null);

	let uploadField = (
		<input
			ref={uploadFieldRef}
			type="file"
			className="js-image-uploader-input v-visible-sr"
			accept="image/*"
			multiple={false}
			id="fileUpload"
			onChange={() => handleFileSelection(view)}
		></input>
	);

	let uploadContainer = (
		<div className="s-modal--dialog">
			<div ref={ref} className="mt6 bc-black-400 js-image-uploader">
				<h1>Image</h1>
				<div
					ref={warningRef}
					className="s-notice s-notice__warning m12 mb0 js-warning-notice-html d-none"
					role="status"
				></div>
				<div
					ref={ctaContainerRef}
					className="fs-body2 p12 pb0 js-cta-container"
				>
					<label
						htmlFor={uploadFieldRef.current?.id}
						className="d-inline-flex f:outline-ring s-link js-browse-button"
						aria-controls="image-preview"
					>
						Browse
						{uploadField}
					</label>
					, drag & drop
					<span
						ref={externalUrlTriggerContainerRef}
						className="js-external-url-trigger-container"
					>
						,{" "}
						<button
							ref={externalUrlTriggerRef}
							type="button"
							className="s-btn s-btn__link js-external-url-trigger"
						>
							enter a link
						</button>
					</span>
					, or paste an image{" "}
					<span className="fc-light fs-caption">Max size 2 MiB</span>
				</div>

				<div
					ref={externalUrlInputContainerRef}
					className="js-external-url-input-container p12 d-none"
				>
					<div className="d-flex fd-row ai-center sm:fd-column sm:ai-start">
						<label
							className="d-block s-label ws-nowrap mr4"
							htmlFor="external-url-input"
						>
							External url
						</label>
						<input
							ref={externalUrlRef}
							id="external-url-input"
							type="text"
							className="s-input js-external-url-input"
							placeholder="https://example.com/img.png"
						/>
					</div>
				</div>

				<div
					ref={imagePreviewRef}
					id="image-preview"
					className="js-image-preview wmx100 pt12 px12 d-none"
				></div>
				<aside
					ref={validationElementRef}
					className="s-notice s-notice__warning d-none m8 js-validation-message"
					role="status"
					aria-hidden="true"
				></aside>

				<div className="d-flex jc-space-between ai-center p12 sm:fd-column sm:ai-start sm:g16">
					<div>
						<button
							ref={addImageButtonRef}
							className="s-btn s-btn__primary ws-nowrap mr8 js-add-image"
							type="button"
							disabled
						>
							Add image
						</button>
						<button
							ref={cancelButtonRef}
							className="s-btn ws-nowrap js-cancel-button"
							type="button"
							onClick={onClose}
						>
							Cancel
						</button>
					</div>
					<div className="d-flex fd-column fs-caption fc-black-300 s-anchors s-anchors__muted">
						<div className="js-branding-html">
							{uploadOptions?.brandingHtml}
						</div>
						<div className="js-content-policy-html">
							{uploadOptions?.contentPolicyHtml}
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	let onDragOver = (event: any) => {
		event.preventDefault();
		dragAndDropRef.current.textContent = "Release to Upload";
		dragAreaRef.current.classList.add("active");
	};

	let onDragLeave = (event: any) => {
		dragAndDropRef.current.textContent = "Drag & Drop";
		dragAreaRef.current.classList.remove("active");
	};

	function displayFile(file: any) {
		let fileType = file.type;
		let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
		if (validExtensions.includes(fileType)) {
			console.log("Approved");
			let img = "";
			dragAreaRef.current.innerHTML = img;
		} else {
			// add warning info
			dragAreaRef.current.classList.remove("active");
		}
	}

	let onDrop = (event: any) => {
		event.preventDefault();
		let file;
		file = event.dataTransfer.files[0];
		console.log(file);
		displayFile(file);
	};

	let dragAreaRef = useRef<any>(null);
	let dragAndDropRef = useRef<any>(null);
	let browseInputRef = useRef<any>(null);

	let inputChange = () => {
		let file = browseInputRef.current.files[0];
		dragAreaRef.current.classList.add("active");
		displayFile(file);
	};

	let newModal = (
		<div className="s-modal--dialog">
			<div id="image-modal">
				<div className="upload-container">
					<h1>Image</h1>
					<div
						className="drag-area"
						ref={dragAreaRef}
						onDragOver={onDragOver}
						onDragLeave={onDragLeave}
						onDrop={onDrop}
					>
						<div className="icon">
							<ImagesIcon />
						</div>

						<span ref={dragAndDropRef} className="drag-and-drop">
							Drag & Drop{" "}
						</span>
						<span className="browse">
							or{" "}
							<span
								onClick={() => browseInputRef.current.click()}
								className="browse-btn"
							>
								browse
							</span>
						</span>
						<input ref={browseInputRef} type="file" hidden></input>
						<span className="support">Supports: JPEG, JPG, PNG</span>
					</div>
				</div>
			</div>
		</div>
	);

	useEffect(() => {
		// uploadFieldRef.current?.addEventListener("change", () => {
		// 	handleFileSelection(view);
		// });

		ref.current?.addEventListener("dragenter", highlightDropArea);
		ref.current?.addEventListener("dragover", highlightDropArea);

		// we need this handler on top of the plugin's handleDrop() to make
		// sure we're handling drop events on the upload container itself properly
		ref.current?.addEventListener("drop", (event: DragEvent) => {
			unhighlightDropArea(event);
			handleDrop(event, view);
		});

		// we need this handler on top of the plugin's handlePaste() to make
		// sure we're handling paste events on the upload container itself properly
		ref.current?.addEventListener("paste", (event: ClipboardEvent) => {
			handlePaste(event, view);
		});

		ref.current?.addEventListener("dragleave", (event: DragEvent) =>
			unhighlightDropArea(event)
		);

		cancelButtonRef.current?.addEventListener("click", () => {
			hide();
		});

		addImageButtonRef.current?.addEventListener("click", (e: Event) => {
			void handleUploadTrigger(e, image!, view);
			onClose();
		});

		if (uploadOptions?.warningNoticeHtml) {
			const warning = warningRef.current!;
			warning.classList.remove("d-none");

			// XSS "safe": this html is passed in via the editor options; it is not our job to sanitize it
			// eslint-disable-next-line no-unsanitized/property
			warning.innerHTML = uploadOptions?.warningNoticeHtml;
		}

		if (uploadOptions.allowExternalUrls) {
			externalUrlTriggerContainerRef.current?.classList.remove("d-none");
			externalUrlTriggerContainerRef.current?.addEventListener("click", () => {
				toggleExternalUrlInput(true);
			});

			externalUrlRef.current?.addEventListener("input", (e) => {
				validateExternalUrl((e.target as HTMLInputElement).value);
			});
		}

		return () => {
			uploadFieldRef.current?.removeEventListener("change", () => {
				handleFileSelection(view);
			});
		};
	});

	async function handleUploadTrigger(
		event: Event,
		file: File,
		view: EditorView
	): Promise<void> {
		const externalUrl = externalUrlRef.current?.value;
		const urlIsValue = externalUrl && validateLink(externalUrl);

		if (!file && !urlIsValue) {
			return;
		}

		let resume: (resume: boolean) => void;
		const resumePromise = new Promise((resolve) => {
			resume = (r) => resolve(r);
		});

		// const canceled = !dispatchEditorEvent(view.dom, "image-upload", {
		// 	file: file || externalUrl,
		// 	resume,
		// });
		let canceled = false;

		if (canceled) {
			const id = {};
			addImagePlaceholder(view, id);
			const resume = await resumePromise;
			removeImagePlaceholder(view, id);

			if (resume) {
				void startImageUpload(view, file || externalUrl);
			}
		} else {
			void startImageUpload(view, file || externalUrl);
		}

		resetUploader();
		hide();
	}

	let handlePaste = (event: ClipboardEvent, view: EditorView): void => {
		resetImagePreview();
		const files = event.clipboardData?.files;
		if (view.state.selection.$from.parent.inlineContent && files?.length) {
			void showImagePreview(files[0]);
		}
	};

	let highlightDropArea = (event: DragEvent): void => {
		ref.current?.classList.add("bs-ring");
		ref.current?.classList.add("bc-blue-300");
		event.preventDefault();
		event.stopPropagation();
	};

	let unhighlightDropArea = (event: DragEvent): void => {
		ref.current?.classList.remove("bs-ring");
		ref.current?.classList.remove("bc-blue-300");
		event.preventDefault();
		event.stopPropagation();
	};

	let resetImagePreview = (): void => {
		imagePreviewRef.current!.innerHTML = "";
		image = null;
		addImageButtonRef.current!.disabled = true;
	};

	let handleDrop = (event: DragEvent, view: EditorView): void => {
		resetImagePreview();
		const files = event.dataTransfer?.files;
		if (view.state.selection.$from.parent.inlineContent && files?.length) {
			void showImagePreview(files[0]);
		}
	};

	let showImagePreview = (file: File): Promise<void> => {
		const promise = new Promise<void>((resolve, reject) =>
			showImagePreviewAsync(file, resolve, reject)
		);

		return promise;
	};

	let showImagePreviewAsync = (
		file: File,
		resolve: () => void,
		reject: (error: string) => void
	) => {
		// const previewElement = imagePreviewRef.current!;

		hideValidationError();
		const validationResult = validateImage(file);
		switch (validationResult) {
			case ValidationResult.FileTooLarge:
				showValidationError(_t("image_upload.upload_error_file_too_big"));
				reject("file too large");
				return;
			case ValidationResult.InvalidFileType:
				showValidationError(_t("image_upload.upload_error_unsupported_format"));
				reject("invalid filetype");
				return;
		}

		resetImagePreview();
		console.log("Rendering");

		let reader = new FileReader();
		reader.onloadend = (readerEvent: ProgressEvent<FileReader>) => {
			if (readerEvent?.target?.result) {
				const previewElement = imagePreviewRef.current!;
				const addImageButton = addImageButtonRef.current;
				const _image = new Image();
				_image.className = "hmx1 w-auto";
				_image.title = file.name;
				_image.src = reader.result as string;
				_image.alt = _t("image_upload.uploaded_image_preview_alt");
				previewElement.appendChild(_image);
				previewElement.classList.remove("d-none");
				image = file;
				addImageButton!.disabled = false;
				resolve();
			}
		};
		reader.readAsDataURL(file);
	};

	let hideValidationError = (): void => {
		const validationElement = validationElementRef.current!;
		validationElement.classList.add("d-none");
		validationElement.classList.remove("s-notice__warning");
		validationElement.classList.remove("s-notice__danger");
		validationElement.innerHTML = "";
	};

	let showValidationError = (errorMessage: string, level = "warning"): void => {
		uploadFieldRef.current!.value = "";
		const validationElement = validationElementRef.current!;

		if (level === "warning") {
			validationElement.classList.remove("s-notice__danger");
			validationElement.classList.add("s-notice__warning");
		} else {
			validationElement.classList.remove("s-notice__warning");
			validationElement.classList.add("s-notice__danger");
		}

		validationElement.classList.remove("d-none");
		validationElement.textContent = errorMessage;
	};

	let validateImage = (image: File): ValidationResult => {
		const validTypes = ["image/jpeg", "image/png", "image/gif"];
		const sizeLimit = 0x200000; // 2 MiB

		if (validTypes.indexOf(image.type) === -1) {
			return ValidationResult.InvalidFileType;
		}

		if (image.size >= sizeLimit) {
			return ValidationResult.FileTooLarge;
		}

		return ValidationResult.Ok;
	};

	function handleFileSelection(view: EditorView): void {
		resetImagePreview();
		const files = uploadFieldRef.current?.files!;
		if (view.state.selection.$from.parent.inlineContent && files.length) {
			void showImagePreview(files[0]);
		}
	}

	function toggleExternalUrlInput(show: boolean): void {
		const cta = ctaContainerRef.current!;
		const container = externalUrlInputContainerRef.current!;

		cta.classList.toggle("d-none", show);
		container.classList.toggle("d-none", !show);

		externalUrlRef.current!.value = "";
	}

	function validateExternalUrl(url: string): void {
		resetImagePreview();
		const addImageButton = addImageButtonRef.current!;

		if (!validateLink(url)) {
			showValidationError(
				_t("image_upload.external_url_validation_error"),
				"danger"
			);
			addImageButton.disabled = true;
		} else {
			hideValidationError();
			addImageButton.disabled = false;
		}
	}

	function resetUploader(): void {
		resetImagePreview();
		toggleExternalUrlInput(false);
		hideValidationError();

		uploadFieldRef.current!.value = "";
	}

	function addImagePlaceholder(view: EditorView, id: unknown): void {
		const tr = view.state.tr;
		if (!tr.selection.empty) tr.deleteSelection();
		// this.key.setMeta(tr, {
		// 	add: { id, pos: tr.selection.from },
		// 	// explicitly clear out any pasted/dropped file on upload
		// 	file: null,
		// 	shouldShow: false,
		// });
		view.dispatch(tr);
	}

	function removeImagePlaceholder(
		view: EditorView,
		id: unknown,
		transaction?: Transaction
	): void {
		let tr = transaction || view.state.tr;
		// tr = this.key.setMeta(tr, {
		// 	remove: { id },
		// 	file: null,
		// 	shouldShow: false,
		// });

		view.dispatch(tr);
	}

	function startImageUpload(
		view: EditorView,
		file: File | string
	): Promise<void> | undefined {
		// A fresh object to act as the ID for this upload
		const id = {};
		// addImagePlaceholder(view, id);

		if (!uploadOptions?.handler) {
			// purposefully log an error to the dev console
			// don't use our internal `log` implementation, it only logs on dev builds
			// eslint-disable-next-line no-console
			console.error(
				"No upload handler registered. Ensure you set a proper handler on the editor's options.imageUploadHandler"
			);
			return;
		}

		return uploadOptions.handler(file as File).then(
			(url) => {
				// // ON SUCCESS
				// // find where we inserted our placeholder so the content insert knows where to go
				// const decos = this.key.getState(view.state).decorations;
				// const found = decos.find(null, null, (spec: NodeSpec) => spec.id == id);
				// const pos = found.length ? found[0].from : null;
				// // If the content around the placeholder has been deleted, drop the image
				// if (pos === null) return;
				// // get the transaction from the dispatcher
				// const tr = this.addTransactionDispatcher(view.state, url, pos);
				// removeImagePlaceholder(view, id, tr);
				view.focus();

				let image = {
					"media-type": "img" as "img",
					src: url,
					alt: "",
					title: "",
				};
				editor.commands.setMedia(image);
			},
			() => {
				// ON ERROR
				// reshow the image uploader along with an error message
				show();
				removeImagePlaceholder(view, id, view.state.tr);
				showValidationError(_t("image_upload.upload_error_generic"), "error");
			}
		);
	}

	return ReactDOM.createPortal(
		newModal,
		document.getElementById("link-editor")!
	);
	// TODO:
	// 1. escape HTML for brandingHTML, contentPolicyHtml
}

/**
 * Hides the image uploader
 * @param view The current editor view
 */
export function hideImageUploader(view: EditorView): void {
	hide();
}

/** Shows the image uploader
 * @param view The current editor view
 * @param file The file to upload
 */
export function showImageUploader(view: EditorView, file?: File): void {
	show();
}

/**
 * Checks if the image-upload functionality is enabled
 * @param state The current editor state
 */
export function imageUploaderEnabled(state: EditorState): boolean {
	return true;
}

/**
 * Creates a placeholder decoration to indicate to the user that the image is currently uploading;
 * Gets replaced with the actual image markup on upload completion
 */
function createPlaceholder(): any {
	let placeholder = (
		<div className="ws-normal d-block m8 js-image-upload-placeholder">
			<div className="py6 px6 bg-black-050 bar-sm gsx gs8 d-inline-flex ai-center fw-normal fs-body1">
				<span className="s-spinner s-spinner__sm flex--item">
					<span className="v-visible-sr">Loading…</span>
				</span>
				<span className="flex--item">Uploading image…</span>
			</div>
		</div>
	);

	return placeholder;
}

/** The state of the image uploader plugin */
type ImageUploadState = {
	add?: {
		id: unknown;
		pos: number;
	};
	decorations?: DecorationSet;
	file: File | null;
	remove?: {
		id: unknown;
	};
	shouldShow: boolean;
};

// /**
//  * Adds image uploading capabilities to the editor.
//  * With this plugin, you'll be able to show a popover that allows you to
//  * browse for files on your file system, or use drag & drop to select images
//  * to upload.
//  *
//  * On upload, this plugin will call the provided uploadHandler function .
//  * @see defaultImageUploadHandler for an example
//  *
//  * @param uploadHandler A function handling file uploads. Will receive the file to upload
//  * as the `file` parameter and needs to return a resolved promise with the URL of the uploaded file
//  * @param containerFn A function that returns the container to insert the plugin's UI into
//  * @param addTransactionDispatcher Dispatcher function that generates a transaction to dispatch to the view on image add
//  */
// function imageUploaderPlaceholderPlugin(
// 	uploadOptions: ImageUploadOptions,
// 	validateLink: CommonmarkParserFeatures["validateLink"],
// 	addTransactionDispatcher: addTransactionDispatcher
// ) {
// 	// if the required image upload options are missing, don't enable the plugin at all
// 	if (!uploadOptions?.handler) {
// 		return new Plugin({});
// 	}

// 	return new StatefulPlugin<ImageUploadState>({
// 		key: INTERFACE_KEY,
// 		state: {
// 			init() {
// 				return {
// 					decorations: DecorationSet.empty,
// 					file: null,
// 					shouldShow: false,
// 				};
// 			},
// 			apply(tr: Transaction, state: ImageUploadState) {
// 				let set = state.decorations || DecorationSet.empty;

// 				// Adjust decoration positions to changes made by the transaction
// 				set = set.map(tr.mapping, tr.doc);

// 				const metadata = this.getMeta(tr);

// 				const returnValue: ImageUploadState = {
// 					file: state.file,
// 					decorations: set,
// 					shouldShow: state.shouldShow,
// 				};

// 				// if no metadata was set, do not alter this state further
// 				if (!metadata) {
// 					return returnValue;
// 				}

// 				if ("file" in metadata) {
// 					returnValue.file = metadata.file;
// 				} else {
// 					returnValue.file = null;
// 				}

// 				if ("shouldShow" in metadata) {
// 					returnValue.shouldShow = metadata.shouldShow;
// 				}

// 				// See if the transaction adds or removes any placeholders
// 				if (metadata.add) {
// 					const deco = Decoration.widget(
// 						metadata.add.pos,
// 						createPlaceholder(),
// 						{
// 							id: metadata.add.id,
// 						}
// 					);
// 					returnValue.decorations = set.add(tr.doc, [deco]);
// 				} else if (metadata.remove) {
// 					returnValue.decorations = set.remove(
// 						set.find(
// 							null,
// 							null,
// 							(spec: NodeSpec) => spec.id == metadata.remove.id
// 						)
// 					);
// 				}

// 				return returnValue;
// 			},
// 		},
// 		props: {
// 			decorations(state) {
// 				return this.getState(state).decorations;
// 			},
// 			handleDrop(view: EditorView, event: DragEvent) {
// 				const files = event.dataTransfer.files;

// 				if (view.state.selection.$from.parent.inlineContent && files.length) {
// 					showImageUploader(view, files[0]);
// 					return true;
// 				}

// 				return false;
// 			},
// 			handlePaste(view: EditorView, event: ClipboardEvent) {
// 				const files = event.clipboardData.files;

// 				if (view.state.selection.$from.parent.inlineContent && files.length) {
// 					showImageUploader(view, files[0]);
// 					return true;
// 				}

// 				return false;
// 			},
// 		},
// 		view(editorView): PluginView {
// 			return new ImageUploader(
// 				editorView,
// 				uploadOptions,
// 				validateLink,
// 				addTransactionDispatcher
// 			);
// 		},
// 	});
// }

// /** Singleton instance of the plugin key for exported show/hide methods to reference */
// const INTERFACE_KEY = new ManagedInterfaceKey<ImageUploadState>(
// 	"image-uploader"
// );

// /**
//  * Adds image uploading capabilities to the editor.
//  * With this plugin, you'll be able to show a popover that allows you to
//  * browse for files on your file system, or use drag & drop to select images
//  * to upload.
//  *
//  * On upload, this plugin will call the provided uploadOptions.handler function
//  * @see defaultImageUploadHandler for an example
//  *
//  * @param uploadOptions The imageUpload options
//  * @param containerFn A function that returns the container to insert the plugin's UI into
//  */
// export function richTextImageUpload(
// 	uploadOptions: ImageUploadOptions,
// 	validateLink: CommonmarkParserFeatures["validateLink"],
// 	schema: Schema
// ): Plugin {
// 	return imageUploaderPlaceholderPlugin(
// 		uploadOptions,
// 		validateLink,
// 		(state, url, pos) => {
// 			const defaultAltText = _t("image_upload.default_image_alt_text");

// 			const marks =
// 				uploadOptions.wrapImagesInLinks || uploadOptions.embedImagesAsLinks
// 					? [schema.marks.link.create({ href: url })]
// 					: null;

// 			const imgNode = uploadOptions.embedImagesAsLinks
// 				? schema.text(defaultAltText, marks)
// 				: schema.nodes.image.create(
// 						{ src: url, alt: defaultAltText },
// 						null,
// 						marks
// 				  );

// 			return state.tr.replaceWith(pos, pos, imgNode);
// 		}
// 	);
// }

// //TODO markdown upload decoration doesn't really fit in visually, make it more... ascii art-ish?
// /**
//  * Adds image uploading capabilities to the editor.
//  * With this plugin, you'll be able to show a popover that allows you to
//  * browse for files on your file system, or use drag & drop to select images
//  * to upload.
//  *
//  * On upload, this plugin will call the provided uploadOptions.handler function
//  * @see defaultImageUploadHandler for an example
//  *
//  * @param uploadHandler The imageUpload options
//  * @param containerFn A function that returns the container to insert the plugin's UI into
//  */
// export function commonmarkImageUpload(
// 	uploadOptions: ImageUploadOptions,
// 	validateLink: CommonmarkParserFeatures["validateLink"]
// ): Plugin {
// 	return imageUploaderPlaceholderPlugin(
// 		uploadOptions,
// 		validateLink,
// 		(state, url, pos) => {
// 			const defaultAltText = _t("image_upload.default_image_alt_text");
// 			// construct the raw markdown
// 			let mdString = `![${defaultAltText}](${url})`;
// 			let selectionStart = pos + 2;
// 			let selectionEnd = selectionStart + defaultAltText.length;

// 			if (uploadOptions.embedImagesAsLinks) {
// 				// strip off the leading `!`
// 				mdString = mdString.slice(1);
// 				selectionStart -= 1;
// 				selectionEnd -= 1;
// 			} else if (uploadOptions.wrapImagesInLinks) {
// 				mdString = `[${mdString}](${url})`;
// 				selectionStart += 1;
// 				selectionEnd += 1;
// 			}

// 			// insert into the document
// 			const tr = state.tr.insertText(mdString, pos);

// 			// pre-select the alt text so the user can just start typing after insert
// 			// NOTE: these are not magic numbers, just hardcoded indexes for the above string
// 			tr.setSelection(
// 				TextSelection.create(state.apply(tr).doc, selectionStart, selectionEnd)
// 			);

// 			return tr;
// 		}
// 	);
// }
