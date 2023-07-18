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

		{/* <aside
			className="s-modal"
			id="launch-modal-base"
			role="dialog"
			aria-labelledby="launch-modal-base-title"
			aria-describedby="launch-modal-base-description"
			aria-hidden="true"
			data-controller="s-modal"
			data-s-modal-target="modal"
			data-s-modal-return-element=".js-modal-open[data-target='#launch-modal-base']"
		>
			<div className="s-modal--dialog" role="document">
				<h1 className="s-modal--header" id="launch-modal-base-title">
					siema
				</h1>
				<p className="s-modal--body" id="launch-modal-base-description">
					Nullam ornare lectus vitae lacus sagittis, at sodales leo viverra.
					Suspendisse nec nulla dignissim elit varius tempus. Cras viverra neque
					at imperdiet vehicula. Curabitur condimentum id dolor vitae ultrices.
					Pellentesque scelerisque nunc sit amet leo fringilla bibendum. Etiam
					feugiat imperdiet mi, eu blandit arcu cursus a. Pellentesque cursus
					massa id dolor ullamcorper, at condimentum nunc ultrices.
				</p>
				<div className="d-flex gx8 s-modal--footer">
					<button className="flex--item s-btn s-btn__primary" type="button">
						Save changes
					</button>
					<button
						className="flex--item s-btn"
						type="button"
						data-action="s-modal#hide"
					>
						Cancel
					</button>
				</div>

				<button
					className="s-modal--close s-btn s-btn__muted js-modal-close"
					type="button"
					aria-label="Close"
					data-action="s-modal#hide"
				>
					<svg
						aria-hidden="true"
						className="svg-icon iconClearSm"
						width="14"
						height="14"
						viewBox="0 0 14 14"
					>
						<path d="M12 3.41 10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7 12 3.41Z"></path>
					</svg>
				</button>
			</div>
		</aside> */}

		{/* <button
			data-controller="s-modal"
			className="flex--item s-btn s-btn__filled js-modal-open"
			data-toggle="s-modal"
			data-target="#launch-modal-base"
		>
			Launch example modal
		</button> */}
	</React.StrictMode>
);
