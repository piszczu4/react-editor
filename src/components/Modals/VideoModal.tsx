import { useState } from "react";

import { useRef } from "react";
import { _t } from "../../helpers/strings";
import CloseIcon from "../Icons/CloseIcon";
import { Modal } from "../Modal";

import { Editor } from "@tiptap/react";
import { validateVideoLink } from "../../utils";

type VideoModalProps = {
	isOpen: boolean;
	hide: () => void;
	destroy: () => void;
	editor?: Editor;
};

enum Status {
	GOOD_LINK = "GOOD_LINK",
	BAD_LINK = "BAD_LINK",
	EMPTY = "EMPTY",
}

export function VideoModal({ isOpen, hide, destroy, editor }: VideoModalProps) {
	let [videoUrl, setVideoUrl] = useState<string>("");
	let [src, setSrc] = useState<string>("");
	let [status, setStatus] = useState<Status>(Status.EMPTY);
	let [isDisabled, setIsDisabled] = useState(true);

	let linkInputRef = useRef<any>(null);

	// Validation
	function setAndValidateUrl(url: string): void {
		setVideoUrl(url);
		let result = validateVideoLink(url);

		if (!result.ok) {
			url === "" ? setStatus(Status.EMPTY) : setStatus(Status.BAD_LINK);
			setIsDisabled(true);
		} else {
			setSrc(result.src!);
			setStatus(Status.GOOD_LINK);
			setIsDisabled(false);
		}
	}

	let onSubmit = () => {
		let video = {
			src: src,
			width: "640",
			height: "360",
		};
		destroy();
		editor?.chain().setVideoFigure(video).run();
	};

	let getMessage = () => {
		let text;
		if (status === Status.EMPTY) {
			text = _t("video_modal.status.empty");
		} else if (status === Status.BAD_LINK) {
			text = _t("video_modal.status.bad_link");
		} else if (status === Status.GOOD_LINK) {
			text = _t("video_modal.status.good_link");
		}

		return text;
	};

	return (
		<Modal isOpen={isOpen} onOutsideClick={() => hide()}>
			<div id="mw-video-modal">
				<div className="mw-modal--header">
					<h1>{_t("video_modal.header")}</h1>
				</div>

				<div id="mw-modal--body">
					<div
						className={`${
							videoUrl === "" ? "" : isDisabled ? "has-error" : "has-success"
						}`}
					>
						<label htmlFor="link-editor-href-input" className="s-label mb4">
							{_t("video_modal.url_label")}
						</label>
						<input
							ref={linkInputRef}
							value={videoUrl}
							onInput={(e) =>
								setAndValidateUrl((e.target as HTMLInputElement).value)
							}
							id="link-editor-href-input"
							className="s-input"
							type="text"
							name="href"
							aria-describedby="link-editor-href-error"
						/>
						<p id="video-href-message" className="s-input-message mt4">
							{getMessage()}
						</p>
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
							{_t("video_modal.add")}
						</button>
						<button
							className="s-btn ws-nowrap js-cancel-button"
							type="button"
							onClick={() => destroy()}
						>
							{_t("video_modal.cancel")}
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
