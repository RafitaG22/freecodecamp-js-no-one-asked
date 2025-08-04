//* IMPORT MODULES
import { isSameAdvice, getFavorites } from "./favorites.js";

//* UI.JS SCRIPT
const message = document.querySelector(".main__advice");
const getAdviceButton = document.querySelector(".main__button--get-advice");
const addToFavoritesButton = document.querySelector(
  ".main__button--add-to-favorites"
);
const seeFavoritesButton = document.querySelector(
  ".main__button--see-favorites"
);
const announcement = document.querySelector(".main__announcement");
const loadingMessages = [
  "Thinking of something no one asked for...",
  "Solving Einstein's theory of relativity",
  "Fetching wisdom no one requested...",
  "Contacting the advice oracle...",
  "Consulting the universe...",
  "Digging up unsolicited wisdom...",
  "Loading brilliance...",
  "Thinking harder than usual...",
  "Arguing with the API...",
  "Conjuring wisdom...",
  "Asking a stranger on the internet...",
  "Texting my therapist...",
  "Calling grandma for advice...",
  "Interviewing fortune cookies...",
  "Consulting magic 8-ball...",
  "Letting the cat decide...",
  "Meditating... kinda...",
  "Loading common sense...",
  "Searching Reddit threads...",
  "Just keep loading, just keep loading...",
  "With great power comes great patience...",
  "Houston, we have a slow connection...",
  "To infinity and waffles...",
  "You shall not pass until it's loaded...",
  "One does not simply load quickly...",
  "This is fine...",
  "Hakuna matata, it means no worries...",
  "Ohana means family...",
  "Advice is coming...",
  "Hadouken...",
  "Inserting coin...",
  "Pressing F, paying respect...",
  "Why are you still here...",
];

function getRandomIndex(arrayLength) {
  return Math.floor(Math.random() * arrayLength);
}

export function showLoadingMessage() {
  message.innerHTML = `<span class="italic loading">${
    loadingMessages[getRandomIndex(loadingMessages.length)]
  }</span>`;
}

export function showAdvice(advice) {
  message.textContent = `❝${advice}❞`;
}

export function showErrorMessage(error) {
  message.textContent =
    "Oops! Couldn't fetch your advice at the moment. Please try again later.";
  console.error("Fetch error:", error);
}

export function disableGetAdviceButton() {
  getAdviceButton.disabled = true;
}

export function enableGetAdviceButton() {
  getAdviceButton.disabled = false;
}

export function changeGetAdviceButtonText() {
  getAdviceButton.textContent = "Another Advice";
}

export function changeAddToFavoritesButtonText() {
  addToFavoritesButton.innerHTML = `<span class="main__heart-icon">❤</span> Added to Favorites`;
  addToFavoritesButton.setAttribute("aria-pressed", "true");
}

export function resetAddToFavoritesButtonText() {
  addToFavoritesButton.innerHTML = `<span class="main__heart-icon">♡</span> Add to Favorites`;
  addToFavoritesButton.setAttribute("aria-pressed", "false");
}

export function preloadAddToFavoritesButtonText() {
  if (isSameAdvice(getFavorites())) {
    addToFavoritesButton.innerHTML = `<span class="main__heart-icon">❤</span> Added to Favorites`;
    addToFavoritesButton.setAttribute("aria-pressed", "true");
  }
}

export function disableAddToFavoritesButton() {
  addToFavoritesButton.disabled = true;
}

export function enableAddToFavoritesButton() {
  addToFavoritesButton.disabled = false;
}

export function disableSeeFavoritesButton() {
  seeFavoritesButton.disabled = true;
}

export function enableSeeFavoritesButton() {
  seeFavoritesButton.disabled = false;
}

export function updateCopyIcon(copyIconElement) {
  copyIconElement.innerHTML = `
  <path
    d="m438-240 226-226-58-58-169 169-84-84-57 57 142 142ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"
  />    
  `;
}

export function resetCopyIcons(copyIconElements) {
  copyIconElements.forEach((copyIconElement) => {
    copyIconElement.innerHTML = `
    <path
      d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"
    />
    `;
  });
}

export function updateCopyButton(copyButtonElement) {
  copyButtonElement.setAttribute("aria-pressed", "true");
  copyButtonElement.setAttribute("aria-label", "Copied to clipboard!");
  copyButtonElement.setAttribute("title", "Copied!");
}

export function resetCopyButtons(copyButtonElements) {
  copyButtonElements.forEach((copyButtonElement) => {
    copyButtonElement.setAttribute("aria-pressed", "false");
    copyButtonElement.setAttribute("aria-label", "Copy advice to clipboard");
    copyButtonElement.setAttribute("title", "Copy");
  });
}

export function pulseAdvice(adviceElement) {
  adviceElement.classList.add("pulse");
  adviceElement.addEventListener("animationend", () => {
    adviceElement.classList.remove("pulse");
  });
}

export function removeList(listContainerElement, listElement) {
  listElement.classList.add("fade-out");

  listElement.addEventListener("animationend", () => {
    listContainerElement.removeChild(listElement);
  });
}

export function updateMessageAnnouncement(messageString) {
  announcement.textContent = "";
  setTimeout(() => {
    announcement.textContent = messageString;
  }, 100);
}
