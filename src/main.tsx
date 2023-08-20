import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { TagSelector } from "./TagSelector/TagSelector.tsx";
import "./TagSelector/styles.scss";
import "./App.scss";
import "./styles/buttons.scss";
import "./styles/details.scss";
import "./styles/math.scss";
import "./styles/tippy.scss";
import "./styles/editor.scss";
import "./styles/stacks.scss";

import "tippy.js/animations/scale-extreme.css";
import "tippy.js/animations/shift-toward-subtle.css";
import "tippy.js/animations/shift-toward-subtle.css";

import "@benrbray/prosemirror-math/style/math.css";
import "katex/dist/katex.min.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<div>
			<App />
		</div>
	</React.StrictMode>
);
