// var suwakPozycja;
// var myszkaWDol;
// var startowaWysokoscKontenera;

// function touchMouseStart(e) {
// 	e.preventDefault();
// 	myszkaWDol = true;
// 	if (e.touches) suwakPozycja = e.touches[0].clientY;
// 	else suwakPozycja = e.clientY;

// 	startowaWysokoscKontenera =
// 		document.getElementById("editor-content").offsetHeight;

// 	console.log("suwak pozycja");
// 	console.log(suwakPozycja);
// 	console.log("startowa wysokosc kontenera");

// 	console.log(startowaWysokoscKontenera);
// }

// function touchMouseEnd(e) {
// 	e.preventDefault();
// 	myszkaWDol = false;

// 	startowaWysokoscKontenera =
// 		document.getElementById("editor-content").offsetHeight;

// 	console.log(startowaWysokoscKontenera);
// }

// function touchMouseMove(e) {
// 	e.preventDefault();
// 	if (!myszkaWDol) return;
// 	if (e.touches) var pozycja = e.touches[0].clientY;
// 	else var pozycja = e.clientY;

// 	console.log("pozycja");
// 	console.log(pozycja);

// 	var wysokosc = pozycja - suwakPozycja;

// 	console.log("wysokosc");
// 	console.log(wysokosc);

// 	document.getElementById("editor-content").style.height =
// 		startowaWysokoscKontenera + wysokosc + "px";
// }

// window.onload = function () {
// 	let slider = document.getElementById("editor-resize-container");
// 	slider.onpointerdown = (e) => {
// 		slider.setPointerCapture(e.pointerId);
// 	};
// 	slider.onpointerup = (e) => {
// 		slider.releasePointerCapture(e.pointerId);
// 	};

// 	document
// 		.getElementById("editor-resize-container")
// 		.addEventListener("touchstart", (e) => {
// 			touchMouseStart(e);
// 		});
// 	document
// 		.getElementById("editor-resize-container")
// 		.addEventListener("mousedown", (e) => {
// 			touchMouseStart(e);
// 		});
// 	document
// 		.getElementById("editor-resize-container")
// 		.addEventListener("touchend", (e) => {
// 			touchMouseEnd(e);
// 		});
// 	document
// 		.getElementById("editor-resize-container")
// 		.addEventListener("mouseup", (e) => {
// 			touchMouseEnd(e);
// 		});
// 	// document
// 	// 	.getElementById("editor-resize-container")
// 	// 	.addEventListener("mouseout", (e) => {
// 	// 		touchMouseEnd(e);
// 	// 	});
// 	document
// 		.getElementById("editor-resize-container")
// 		.addEventListener("click", function (e) {
// 			e.preventDefault();
// 		});
// 	document
// 		.getElementById("editor-resize-container")
// 		.addEventListener("touchcancel", (e) => {
// 			touchMouseEnd(e);
// 		});
// 	document
// 		.getElementById("editor-resize-container")
// 		.addEventListener("touchmove", (e) => {
// 			touchMouseMove(e);
// 		});
// 	document
// 		.getElementById("editor-resize-container")
// 		.addEventListener("mousemove", (e) => {
// 			touchMouseMove(e);
// 		});
// };
