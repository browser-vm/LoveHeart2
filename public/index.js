"use strict";

// Settings Management
const SETTINGS_KEY = "loveheart2_settings";
const SHORTCUTS_KEY = "loveheart2_shortcuts";

// Default settings
const defaultSettings = {
	scanlines: true,
};

// Default shortcuts
const defaultShortcuts = [
	{ name: "Google", url: "https://www.google.com" },
	{ name: "Wikipedia", url: "https://www.wikipedia.org" },
	{ name: "GitHub", url: "https://github.com" },
];

// Load settings from localStorage
function loadSettings() {
	const saved = localStorage.getItem(SETTINGS_KEY);
	return saved ? JSON.parse(saved) : defaultSettings;
}

// Save settings to localStorage
function saveSettings(settings) {
	localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

// Load shortcuts from localStorage
function loadShortcuts() {
	const saved = localStorage.getItem(SHORTCUTS_KEY);
	return saved ? JSON.parse(saved) : defaultShortcuts;
}

// Save shortcuts to localStorage
function saveShortcuts(shortcuts) {
	localStorage.setItem(SHORTCUTS_KEY, JSON.stringify(shortcuts));
}

// Apply settings
function applySettings() {
	const settings = loadSettings();
	const scanlinesToggle = document.getElementById("scanlines-toggle");
	const scanlinesOverlay = document.querySelector(".scanlines");

	if (scanlinesToggle && scanlinesOverlay) {
		scanlinesToggle.checked = settings.scanlines;
		scanlinesOverlay.style.display = settings.scanlines ? "block" : "none";
	}
}

// Render shortcuts on homepage
function renderShortcuts() {
	const shortcuts = loadShortcuts();
	const shortcutsList = document.getElementById("shortcuts-list");

	if (shortcutsList) {
		shortcutsList.innerHTML = "";

		shortcuts.forEach((shortcut, index) => {
			const shortcutItem = document.createElement("div");
			shortcutItem.className = "shortcut-item";

			const shortcutLink = document.createElement("a");
			shortcutLink.href = "#";
			shortcutLink.textContent = shortcut.name;
			shortcutLink.addEventListener("click", (e) => {
				e.preventDefault();
				openShortcut(shortcut.url);
			});

			shortcutItem.appendChild(shortcutLink);
			shortcutsList.appendChild(shortcutItem);
		});
	}
}

// Render shortcuts in settings
function renderSettingsShortcuts() {
	const shortcuts = loadShortcuts();
	const shortcutsList = document.getElementById("settings-shortcuts-list");

	if (shortcutsList) {
		shortcutsList.innerHTML = "";

		shortcuts.forEach((shortcut, index) => {
			const shortcutItem = document.createElement("div");
			shortcutItem.className = "shortcut-item";

			const shortcutLink = document.createElement("a");
			shortcutLink.href = "#";
			shortcutLink.textContent = shortcut.name;
			shortcutLink.addEventListener("click", (e) => {
				e.preventDefault();
				openShortcut(shortcut.url);
			});

			const deleteBtn = document.createElement("button");
			deleteBtn.textContent = "×";
			deleteBtn.title = "Delete shortcut";
			deleteBtn.addEventListener("click", () => {
				deleteShortcut(index);
			});

			shortcutItem.appendChild(shortcutLink);
			shortcutItem.appendChild(deleteBtn);
			shortcutsList.appendChild(shortcutItem);
		});
	}
}

// Open shortcut
function openShortcut(url) {
	document.getElementById("sj-address").value = url;
	document.getElementById("sj-form").dispatchEvent(new Event("submit"));
}

// Add shortcut
function addShortcut(name, url) {
	if (!name || !url) return;

	const shortcuts = loadShortcuts();
	shortcuts.push({ name, url });
	saveShortcuts(shortcuts);
	renderShortcuts();
	renderSettingsShortcuts();
}

// Delete shortcut
function deleteShortcut(index) {
	const shortcuts = loadShortcuts();
	shortcuts.splice(index, 1);
	saveShortcuts(shortcuts);
	renderShortcuts();
	renderSettingsShortcuts();
}

// Initialize settings
function initSettings() {
	// Apply settings
	applySettings();

	// Render shortcuts
	renderShortcuts();
	renderSettingsShortcuts();

	// Setup settings button event listener
	const settingsBtn = document.getElementById("settings-btn");
	const settingsModal = document.getElementById("settings-modal");
	const closeSettingsBtn = document.getElementById("close-settings");

	if (settingsBtn && settingsModal) {
		settingsBtn.addEventListener("click", () => {
			settingsModal.classList.remove("hidden");
		});
	}

	if (closeSettingsBtn && settingsModal) {
		closeSettingsBtn.addEventListener("click", () => {
			settingsModal.classList.add("hidden");
		});
	}

	// Close modal when clicking outside
	if (settingsModal) {
		settingsModal.addEventListener("click", (e) => {
			if (e.target === settingsModal) {
				settingsModal.classList.add("hidden");
			}
		});
	}

	// Setup scanlines toggle
	const scanlinesToggle = document.getElementById("scanlines-toggle");
	if (scanlinesToggle) {
		scanlinesToggle.addEventListener("change", (e) => {
			const settings = loadSettings();
			settings.scanlines = e.target.checked;
			saveSettings(settings);
			applySettings();
		});
	}

	// Setup add shortcut form
	const addShortcutBtn = document.getElementById("add-shortcut");
	const shortcutNameInput = document.getElementById("shortcut-name");
	const shortcutUrlInput = document.getElementById("shortcut-url");

	if (addShortcutBtn) {
		addShortcutBtn.addEventListener("click", () => {
			const name = shortcutNameInput.value.trim();
			const url = shortcutUrlInput.value.trim();

			if (name && url) {
				addShortcut(name, url);
				shortcutNameInput.value = "";
				shortcutUrlInput.value = "";
			}
		});
	}

	// Add shortcut on Enter key
	if (shortcutNameInput) {
		shortcutNameInput.addEventListener("keypress", (e) => {
			if (e.key === "Enter") {
				document.getElementById("add-shortcut").click();
			}
		});
	}

	if (shortcutUrlInput) {
		shortcutUrlInput.addEventListener("keypress", (e) => {
			if (e.key === "Enter") {
				document.getElementById("add-shortcut").click();
			}
		});
	}
}

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
const backBtn = document.getElementById("back-btn");
const forwardBtn = document.getElementById("forward-btn");
const refreshBtn = document.getElementById("refresh-btn");

backBtn.addEventListener("click", () => {
	const frame = document.getElementById("sj-frame");
	if (frame && frame.contentWindow && frame.contentWindow.history) {
		frame.contentWindow.history.back();
	}
});

forwardBtn.addEventListener("click", () => {
	const frame = document.getElementById("sj-frame");
	if (frame && frame.contentWindow && frame.contentWindow.history) {
		frame.contentWindow.history.forward();
	}
});

refreshBtn.addEventListener("click", () => {
	const frame = document.getElementById("sj-frame");
	if (frame && frame.contentWindow) {
		frame.contentWindow.location.reload();
	}
});

// Add keypress listener for Enter key on input
address.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		form.dispatchEvent(new Event("submit"));
	}
});

// Initialize settings when DOM is ready
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initSettings);
} else {
	initSettings();
}
