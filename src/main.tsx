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

// import "uno.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<div>
			<App />
		</div>
	</React.StrictMode>
);
