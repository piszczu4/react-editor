import { useState } from "react";

import { useRef } from "react";
import { ImagesIcon } from "..";
import { _t } from "../../helpers/strings";
import { Modal } from "../Modal";
import CloseIcon from "../Icons/CloseIcon";

import { Editor } from "@tiptap/react";
import { stackOverflowValidateLink as validateLink } from "../../extensions/extension-link/link-editor";

import { InfinitySpin } from "react-loader-spinner";

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

// enum ValidationResult {
// 	Ok,
// 	FileTooLarge,
// 	InvalidFileType,
// }

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

type ImageModalProps = {
	uploadOptions?: ImageUploadOptions;
	isOpen: boolean;
	hide: () => void;
	destroy: () => void;
	editor?: Editor;
};

export function ImageModal({ isOpen, hide, destroy, editor }: ImageModalProps) {
	let [imageUrl, setImageUrl] = useState<string>("");
	let [uploadStatus, setUploadStatus] = useState<string | null>("");
	let [isDisabled, setIsDisabled] = useState(true);
	let [isDragActive, setIsDragActive] = useState(false);

	// Validation
	function setAndValidateUrl(url: string): void {
		setImageUrl(url);

		if (!validateLink(url)) {
			setUploadStatus("badLink");
			setIsDisabled(true);
		} else {
			setUploadStatus("goodLink");
			setIsDisabled(false);
		}
	}

	function validateFile(file: File) {
		let fileType = file.type;
		let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
		if (validExtensions.includes(fileType)) {
			return true;
		}
		setUploadStatus("unsupportedFile");
		return false;
	}
	function startImageUpload(file: File): Promise<string | void> | undefined {
		if (!validateFile(file)) return;

		// if (!uploadOptions?.handler) {
		// 	// purposefully log an error to the dev console
		// 	// don't use our internal `log` implementation, it only logs on dev builds
		// 	// eslint-disable-next-line no-console
		// 	console.error(
		// 		"No upload handler registered. Ensure you set a proper handler on the editor's options.imageUploadHandler"
		// 	);
		// 	return;
		// }

		setUploadStatus("uploading");

		return defaultImageUploadHandler(file as File).then(
			(url) => {
				setAndValidateUrl(url);
				setUploadStatus("uploadSuccess");
			},
			() => {
				// ON ERROR
				// show error message
				setUploadStatus("uploadError");
			}
		);
	}

	function onFileSelection() {
		const file = browseInputRef.current?.files![0];
		if (!validateFile(file)) {
			return;
		}
		startImageUpload(file);
	}

	let onDragOver = (event: any) => {
		event.preventDefault();
		setIsDragActive(true);
	};

	let onDragLeave = () => {
		setIsDragActive(false);
	};

	let onDrop = (event: any) => {
		event.preventDefault();
		let file = event.dataTransfer.files[0];
		startImageUpload(file);
	};

	let onSubmit = () => {
		let image = {
			"media-type": "img" as "img",
			src: imageUrl,
			alt: "",
			title: "",
			caption: true,
		};
		destroy();
		editor?.chain().setMedia(image).run();
	};

	let browseInputRef = useRef<any>(null);
	let linkInputRef = useRef<any>(null);

	function onClickPasteUrl() {
		linkInputRef.current.focus();
	}

	let UploadNotice = () => {
		let text;
		let level;
		if (uploadStatus === "uploadSuccess") {
			text = "Image was successfully uploaded!";
			level = "success";
		} else if (uploadStatus === "uploadError") {
			text = "Failed to upload an image. Try again.";
			level = "danger";
		} else if (uploadStatus === "badLink") {
			text = "Image URL seems to be invalid!";
			level = "danger";
		} else if (uploadStatus === "goodLink") {
			return;
		} else if (uploadStatus === "unsupportedFile") {
			text = "Unsupported file type!";
			level = "danger";
		}

		return (
			<div className={`d-flex s-notice s-notice__${level} m8`} role="status">
				<div className="flex--item lh-lg">{text}</div>
			</div>
		);
	};

	return (
		<Modal isOpen={isOpen} onOutsideClick={() => hide()}>
			<div id="mw-image-modal">
				<div className="mw-modal--header">
					<h1>Image</h1>
				</div>

				<div id="mw-modal--body">
					<div className="upload-container">
						{uploadStatus === "uploading" ? (
							<div className="drag-area">
								<InfinitySpin width="200" color="#1683ff" />
								<h3>Uploading...</h3>
							</div>
						) : uploadStatus !== "uploadSuccess" &&
						  uploadStatus !== "goodLink" ? (
							<div
								className={
									`drag-area` + `${isDragActive ? " drag-active" : ""}`
								}
								onDragOver={onDragOver}
								onDragLeave={onDragLeave}
								onDrop={onDrop}
							>
								<div className="icon">
									<ImagesIcon />
								</div>

								<span className="drag-and-drop">
									{isDragActive ? "Release to Upload," : "Drag & Drop,"}
								</span>
								<span className="paste-image">paste an image, </span>
								<button onClick={onClickPasteUrl} className="paste-url">
									paste link,{" "}
								</button>
								<span className="browse">
									or{" "}
									<span
										onClick={() => browseInputRef.current.click()}
										className="browse-btn"
									>
										browse
									</span>
								</span>
								<input
									ref={browseInputRef}
									type="file"
									onChange={onFileSelection}
									hidden
								></input>
								<span className="support">Supports: JPEG, JPG, PNG</span>
							</div>
						) : (
							<div className="image-preview">
								<img src={imageUrl} alt="Image not found"></img>
							</div>
						)}
					</div>

					{uploadStatus && <UploadNotice />}

					<div>
						<label htmlFor="link-editor-href-input" className="s-label mb4">
							{_t("link_editor.href_label")}
						</label>
						<input
							ref={linkInputRef}
							value={imageUrl}
							placeholder="Paste image URL here"
							onInput={(e) =>
								setAndValidateUrl((e.target as HTMLInputElement).value)
							}
							id="link-editor-href-input"
							className="s-input"
							type="text"
							name="href"
							aria-describedby="link-editor-href-error"
						/>
						<p
							id="link-editor-href-error"
							className="s-input-message mt4 d-none js-link-editor-href-error"
						></p>
					</div>
				</div>

				<div className="mw-modal--footer d-flex py8 jc-space-between ai-center sm:fd-column sm:ai-start sm:g16">
					<div>
						<button
							className="s-btn s-btn__primary ws-nowrap mr8 js-add-image"
							type="button"
							onClick={onSubmit}
							disabled={isDisabled}
						>
							Add image
						</button>
						<button
							className="s-btn ws-nowrap js-cancel-button"
							type="button"
							onClick={() => destroy()}
						>
							Cancel
						</button>
					</div>
				</div>

				<button className="mw-btn mw-modal--close" onClick={() => destroy()}>
					<CloseIcon />
				</button>
			</div>
		</Modal>
	);
}
