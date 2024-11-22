// CODE REFACTORED WITH CHATGPT FOR READABLILITY
// CODE TAKEN FROM ONLINE https://github.com/bufferhead-code/nightowl 

// Constants for theme management
const STORAGE_KEY = "nightowl-color-scheme";
const THEME_LIGHT = "light";
const THEME_DARK = "dark";

// Global state
let storage = null;
let currentTheme = THEME_LIGHT;

// Initialize local storage
try {
    storage = localStorage;
} catch (error) {
    console.warn("LocalStorage not available:", error);
}

// Initialize theme styles
function initializeStyles() {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
        /* Prevent inconsistencies for positioning */
        .nightowl-light body {
            filter: invert(0%);
        }
        
        .nightowl-dark {
            /* Firefox fallback */
            background-color: #111;
        }

        .nightowl-dark body {
            filter: invert(100%) hue-rotate(180deg);
        }

        /* Do not invert media (revert the invert) */
        .nightowl-dark img,
        .nightowl-dark video,
        .nightowl-dark iframe,
        .nightowl-dark .nightowl-daylight {
            filter: invert(100%) hue-rotate(180deg);
        }

        /* Improve contrast on icons */
        .nightowl-dark .icon {
            filter: invert(15%) hue-rotate(180deg);
        }

        /* Re-enable code block backgrounds */
        .nightowl-dark pre {
            filter: invert(6%);
        }

        /* Improve contrast on list item markers */
        .nightowl-dark li::marker {
            color: #666;
        }
    `;
    document.head.appendChild(styleElement);
}


function enableDarkMode() {
    currentTheme = THEME_DARK;
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
        htmlElement.classList.remove("nightowl-light");
        htmlElement.classList.add("nightowl-dark");
    }
    saveThemePreference();
}

function enableLightMode() {
    currentTheme = THEME_LIGHT;
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
        htmlElement.classList.remove("nightowl-dark");
        htmlElement.classList.add("nightowl-light");
    }
    saveThemePreference();
}

function applyTheme() {
    currentTheme === THEME_DARK ? enableDarkMode() : enableLightMode();
}

function loadSavedTheme() {
    if (!storage) return;
    
    const savedTheme = storage.getItem(STORAGE_KEY);
    if (savedTheme) {
      currentTheme = savedTheme;
      applyTheme();
    }
}

function initializeTheme() {
    initializeStyles();
    loadSavedTheme();
}

function saveThemePreference() {
    if (!storage) return;
    storage.setItem(STORAGE_KEY, currentTheme);
}


window.addEventListener("load", initializeTheme);