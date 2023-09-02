export function handleSpoilers() {
	let spoilers = document.querySelectorAll("spoiler.spoiler");

	spoilers.forEach((spoiler) => {
		spoiler.addEventListener("click", () => {
			console.log("Hi");
			if (!spoiler.classList.contains("is-visible")) {
				spoiler.classList.add("is-visible");
			}
		});
	});
}
