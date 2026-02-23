"use strict";

// Splash Screen Logic - First visit only
(function () {
	const splashScreen = document.getElementById("splash-screen");
	const SPLASH_KEY = "loveheart2_splash_shown";

	// Check if splash has been shown before
	if (localStorage.getItem(SPLASH_KEY)) {
		// Hide splash immediately if already shown
		if (splashScreen) {
			splashScreen.style.display = "none";
		}
	} else {
		// First visit - show splash then fade out
		// Mark as shown and fade out after animation
		setTimeout(() => {
			localStorage.setItem(SPLASH_KEY, "true");
			if (splashScreen) {
				splashScreen.classList.add("hidden");
			}

			// Remove from DOM after transition
			setTimeout(() => {
				if (splashScreen) {
					splashScreen.style.display = "none";
				}
			}, 800);
		}, 2500); // Show for 2.5 seconds
	}
})();

/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("sj-form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("sj-address");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("sj-search-engine");
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("sj-error");
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("sj-error-code");

const { ScramjetController } = $scramjetLoadController();

const scramjet = new ScramjetController({
	files: {
		wasm: "/scram/scramjet.wasm.wasm",
		all: "/scram/scramjet.all.js",
		sync: "/scram/scramjet.sync.js",
	},
});

scramjet.init();

const connection = new BareMux.BareMuxConnection("/baremux/worker.js");

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	try {
		await registerSW();
	} catch (err) {
		error.textContent = "Failed to register service worker.";
		errorCode.textContent = err.toString();
		throw err;
	}

	const url = search(address.value, searchEngine.value);

	let wispUrl =
		(location.protocol === "https:" ? "wss" : "ws") +
		"://" +
		location.host +
		"/wisp/";
	if ((await connection.getTransport()) !== "/libcurl/index.mjs") {
		await connection.setTransport("/libcurl/index.mjs", [
			{ websocket: wispUrl },
		]);
	}
	const frame = scramjet.createFrame();
	frame.frame.id = "sj-frame";
	document.body.appendChild(frame.frame);
	frame.go(url);
});

// Mobile navigation functionality
const backBtn = document.getElementById('back-btn');
const forwardBtn = document.getElementById('forward-btn');
const refreshBtn = document.getElementById('refresh-btn');

backBtn.addEventListener('click', () => {
	const frame = document.getElementById('sj-frame');
	if (frame && frame.contentWindow && frame.contentWindow.history) {
		frame.contentWindow.history.back();
	}
});

forwardBtn.addEventListener('click', () => {
	const frame = document.getElementById('sj-frame');
	if (frame && frame.contentWindow && frame.contentWindow.history) {
		frame.contentWindow.history.forward();
	}
});

refreshBtn.addEventListener('click', () => {
	const frame = document.getElementById('sj-frame');
	if (frame && frame.contentWindow) {
		frame.contentWindow.location.reload();
	}
});

// Add keypress listener for Enter key on input
address.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		form.dispatchEvent(new Event('submit'));
	}
});
