//* IMPORT MODULES
import { getFavorites, saveFavorites } from "./favorites.js";
import {
  updateCopyIcon,
  resetCopyIcons,
  updateCopyButton,
  resetCopyButtons,
  removeList,
  pulseAdvice,
  resetAddToFavoritesButtonText,
  updateMessageAnnouncement,
} from "./ui.js";

//* DIALOG.JS SCRIPT
const seeFavoritesButton = document.querySelector(
  ".main__button--see-favorites"
);
const seeFavoritesDialog = document.querySelector(".main__dialog");
const favoritesContainer = document.querySelector(".main__favorites");

function openSeeFavorites() {
  seeFavoritesDialog.showModal();
}

function generateFavoritesList() {
  const favorites = getFavorites();

  favoritesContainer.innerHTML = "";

  favorites.forEach((favorite) => {
    const favoritesList = document.createElement("li");
    const tweetContent = encodeURIComponent(
      `${favorite} #NoOneAsked \n\nGet more at https://no-one-asked-fcc-jiro.netlify.app/`
    );
    const favoritesHTMLContent = `
    <p class="main__list-content">${favorite}</p>

    <div class="main__list-buttons">
      <a
        href="https://twitter.com/intent/tweet?text=${tweetContent}"
        target="_blank"
        class="main__list-button main__list-button--twitter"
        aria-label="Share advice to twitter."
        title="Tweet"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="24"
          height="24"
          viewBox="0 0 50 50"
          fill="currentColor"
          class="main__twitter-icon"
          aria-hidden="true"
        >
          <path
            d="M 11 4 C 7.1456661 4 4 7.1456661 4 11 L 4 39 C 4 42.854334 7.1456661 46 11 46 L 39 46 C 42.854334 46 46 42.854334 46 39 L 46 11 C 46 7.1456661 42.854334 4 39 4 L 11 4 z M 11 6 L 39 6 C 41.773666 6 44 8.2263339 44 11 L 44 39 C 44 41.773666 41.773666 44 39 44 L 11 44 C 8.2263339 44 6 41.773666 6 39 L 6 11 C 6 8.2263339 8.2263339 6 11 6 z M 13.085938 13 L 22.308594 26.103516 L 13 37 L 15.5 37 L 23.4375 27.707031 L 29.976562 37 L 37.914062 37 L 27.789062 22.613281 L 36 13 L 33.5 13 L 26.660156 21.009766 L 21.023438 13 L 13.085938 13 z M 16.914062 15 L 19.978516 15 L 34.085938 35 L 31.021484 35 L 16.914062 15 z"
          ></path>
        </svg>
      </a>

      <button
        type="button"
        class="main__list-button main__list-button--copy"
        aria-label="Copy advice to clipboard"
        aria-pressed="false"
        title="Copy"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentColor"
          class="main__copy-icon"
          aria-hidden="true"
        >
          <path
            d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"
          />
        </svg>
      </button>

      <button
        type="button"
        class="main__list-button main__list-button--delete"
        aria-label="Remove current advice from favorites"
        title="Remove"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentColor"
          class="main__delete-icon"
          aria-hidden="true"
        >
          <path
            d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
          />
        </svg>
      </button>
    </div>
    `;

    favoritesList.classList.add("main__list");

    favoritesList.innerHTML = favoritesHTMLContent;

    favoritesContainer.insertBefore(
      favoritesList,
      favoritesContainer.firstChild
    );
  });
}

async function copyAdvice(adviceString) {
  try {
    await navigator.clipboard.writeText(adviceString);
  } catch (error) {
    throw new Error(`Copying not successful: ${error}`);
  }
}

function initCopyAdviceButton() {
  const lists = document.querySelectorAll(".main__list");
  const copyButtons = document.querySelectorAll(".main__list-button--copy");
  const copyIcons = document.querySelectorAll(".main__copy-icon");

  lists.forEach((list) => {
    const copyButton = list.querySelector(".main__list-button--copy");
    const copyIcon = list.querySelector(".main__copy-icon");
    const adviceElement = list.querySelector(".main__list-content");
    const adviceMessage = list.querySelector(".main__list-content").textContent;

    copyButton.addEventListener("click", async () => {
      await copyAdvice(adviceMessage);
      resetCopyButtons(copyButtons);
      resetCopyIcons(copyIcons);
      updateCopyButton(copyButton);
      updateCopyIcon(copyIcon);
      pulseAdvice(adviceElement);
    });
  });
}

function removeAdviceFromFavorites(adviceString) {
  const favorites = getFavorites();

  favorites.splice(favorites.indexOf(adviceString), 1);
  saveFavorites(favorites);
}

function initRemoveAdviceButton() {
  const listContainer = document.querySelector(".main__favorites");
  const lists = document.querySelectorAll(".main__list");
  const currentAdvice = document.querySelector(".main__advice").textContent;

  lists.forEach((list) => {
    const removeButton = list.querySelector(".main__list-button--delete");
    const advice = list.querySelector(".main__list-content").textContent;

    removeButton.addEventListener(
      "click",
      () => {
        removeAdviceFromFavorites(advice);
        removeList(listContainer, list);
        updateMessageAnnouncement("Advice removed from favorites.");

        if (advice === currentAdvice) {
          resetAddToFavoritesButtonText();
        }
      },
      { once: true }
    );
  });
}

export function initSeeFavorites() {
  seeFavoritesButton.addEventListener("click", () => {
    openSeeFavorites();
    generateFavoritesList();
    initCopyAdviceButton();
    initRemoveAdviceButton();
  });
}
