// * THEME-TOGGLE SCRIPT
const iconLight = document.querySelector(".theme__icon--light");
const iconDark = document.querySelector(".theme__icon--dark");
const button = document.querySelector(".theme__button");
const html = document.documentElement;
const body = document.querySelector(".body");

function showIconLight() {
  iconLight.classList.remove("hidden");
}

function hideIconLight() {
  iconLight.classList.add("hidden");
}

function showIconDark() {
  iconDark.classList.remove("hidden");
}

function hideIconDark() {
  iconDark.classList.add("hidden");
}

function addActiveTheme() {
  button.classList.add("active");
}

function removeActiveTheme() {
  button.classList.remove("active");
}

function addDarkTheme() {
  html.classList.add("dark");
}

function toggleDarkTheme() {
  html.classList.toggle("dark");
}

function savedTheme() {
  return localStorage.getItem("theme");
}

function prefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function updateAriaPressedToTrue() {
  button.setAttribute("aria-pressed", "true");
}

function updateAriaPressedToFalse() {
  button.setAttribute("aria-pressed", "false");
}

function changeBodyBackgroundImageToLight() {
  body.style.backgroundImage = `url("../assets/img/circles-bg-light.svg")`;
}

function changeBodyBackgroundImageToDark() {
  body.style.backgroundImage = `url("../assets/img/circles-bg.svg")`;
}

preLoadDarkTheme();
function preLoadDarkTheme() {
  if (savedTheme() === "dark" || (savedTheme() === null && prefersDark())) {
    addDarkTheme();
    addActiveTheme();
    hideIconLight();
    showIconDark();
    updateAriaPressedToTrue();
    changeBodyBackgroundImageToDark();
  }
}

function isDarkTheme() {
  return html.classList.contains("dark");
}

function savePreferredTheme() {
  localStorage.setItem("theme", isDarkTheme() ? "dark" : "light");
}

export function initThemeToggle() {
  toggleTheme();
  function toggleTheme() {
    button.addEventListener("click", () => {
      toggleDarkTheme();

      if (isDarkTheme()) {
        addActiveTheme();
        hideIconLight();
        showIconDark();
        updateAriaPressedToTrue();
        changeBodyBackgroundImageToDark();
      } else {
        removeActiveTheme();
        showIconLight();
        hideIconDark();
        updateAriaPressedToFalse();
        changeBodyBackgroundImageToLight();
      }

      savePreferredTheme();
    });
  }
}
