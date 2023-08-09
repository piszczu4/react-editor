import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./index.css";
import "./main.js";

import "@benrbray/prosemirror-math/style/math.css";
import "katex/dist/katex.min.css";

import "@stackoverflow/stacks-editor/dist/styles.css";
import "@stackoverflow/stacks/dist/css/stacks.css";
import "@stackoverflow/stacks/dist/js/stacks.js";
import "@stackoverflow/stacks";

import Tippy from "@tippyjs/react";
import { ImageIcon } from "./components/index.ts";
import InfoIcon from "./components/Icons/InfoIcon.tsx";
// import "uno.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<div>
			<App />
		</div>

		{/* <input defaultValue={"empty..."} />

		<Tippy
			className="mw-popover"
			trigger="click"
			animation="shift-toward-subtle"
			hideOnClick={false}
			content={
				<span>
					<button>
						<InfoIcon />
					</button>
				</span>
			}
			interactive={true}
			placement={"bottom"}
			onClickOutside={(instance) => {
				instance.hide();
			}}
		>
			<div
				className="mw-panel--icon"
				contentEditable={false}
				style={{ width: "200px", height: "200px", backgroundColor: "red" }}
			></div>
		</Tippy> */}
	</React.StrictMode>
);
