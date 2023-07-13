import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import "@stackoverflow/stacks-editor/dist/styles.css";
import "@stackoverflow/stacks/dist/css/stacks.css";
import "@stackoverflow/stacks";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
