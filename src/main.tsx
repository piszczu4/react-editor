import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./styles/editor.scss";

import "@benrbray/prosemirror-math/style/math.css";
import "katex/dist/katex.min.css";

import "./styles/stacks.scss";
// import "uno.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<div>
			<App />
		</div>
	</React.StrictMode>
);
