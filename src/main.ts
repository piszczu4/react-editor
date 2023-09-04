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
