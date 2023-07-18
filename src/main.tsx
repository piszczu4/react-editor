import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import "@stackoverflow/stacks-editor/dist/styles.css";
import "@stackoverflow/stacks/dist/css/stacks.css";
import "@stackoverflow/stacks/dist/js/stacks.js";
import "@stackoverflow/stacks";
import "./main.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<div>
			<App />
		</div>
		<div
			data-controller="s-modal"
			data-s-modal-return-element="#js-return-focus"
		>
			<button
				type="button"
				className="s-btn"
				id="js-return-focus"
				data-action="s-modal#show"
			>
				Show modal
			</button>
			<aside
				className="s-modal"
				data-s-modal-target="modal"
				id="modal-base"
				role="dialog"
				aria-labelledby="modal-title"
				aria-describedby="modal-description"
				aria-hidden="true"
			>
				<div className="s-modal--dialog" role="document">
					<h1 className="s-modal--header" id="modal-title">
						Title
					</h1>
					<p className="s-modal--body" id="modal-description">
						Some Text
					</p>
					<div className="d-flex gx8 s-modal--footer">
						<button className="flex--item s-btn s-btn__primary" type="button">
							…
						</button>
						<button
							className="flex--item s-btn"
							type="button"
							data-action="s-modal#hide"
						>
							…
						</button>
					</div>
					<button
						className="s-modal--close s-btn s-btn__muted"
						type="button"
						data-action="s-modal#hide"
					>
						@Svg.ClearSm
					</button>
				</div>
			</aside>
		</div>
	</React.StrictMode>
);
