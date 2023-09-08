import hljs from "highlight.js";

export function handleSpoilers() {
	let preview = document.querySelector(".preview")!;
	if (!preview) return false;
	let spoilers = preview.querySelectorAll("spoiler.spoiler");

	spoilers.forEach((spoiler) => {
		spoiler.addEventListener("click", () => {
			if (!spoiler.classList.contains("is-visible")) {
				spoiler.classList.add("is-visible");
			}
		});
	});
}

export function handleTaskItems() {
	let preview = document.querySelector(".preview")!;
	if (!preview) return false;
	let items = preview.querySelectorAll(
		'[data-type="taskList"] input[type="checkbox"]'
	);

	items.forEach((item) => {
		item.addEventListener("click", (e) => {
			e.preventDefault();
			return false;
		});
	});
}

export function handleCodeBlocks() {
	let preview = document.querySelector(".preview")!;
	if (!preview) return false;
	let items = preview.querySelectorAll("pre code");

	items.forEach((block: any) => {
		hljs.highlightElement(block);
	});

	// document.addEventListener("DOMContentLoaded", (event) => {
	// 	document.querySelectorAll("pre code").forEach((block: any) => {
	// 		hljs.highlightElement(block);
	// 	});
	// });
}
