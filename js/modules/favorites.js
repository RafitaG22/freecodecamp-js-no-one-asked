//* IMPORT MODULES
import {
  changeAddToFavoritesButtonText,
  resetAddToFavoritesButtonText,
} from "./ui.js";

//* FAVORITES.JS SCRIPT
const message = document.querySelector(".main__advice");
const button = document.querySelector(".main__button--add-to-favorites");

export function getFavorites() {
  return JSON.parse(localStorage.getItem("savedFavorites")) || [];
}

export function isSameAdvice(favoritesArray) {
  return favoritesArray.some((advice) => advice === message.textContent);
}

function removeAdvice(advice, favoritesArray) {
  favoritesArray.splice(favoritesArray.indexOf(advice), 1);
}

export function saveFavorites(favoritesArray) {
  localStorage.setItem("savedFavorites", JSON.stringify(favoritesArray));
}

function toggleAddToFavoritesAdvice() {
  const favorites = getFavorites();

  if (isSameAdvice(favorites)) {
    removeAdvice(message.textContent, favorites);
    resetAddToFavoritesButtonText();
  } else {
    favorites.push(message.textContent);
    changeAddToFavoritesButtonText();
  }

  saveFavorites(favorites);
}

function addToFavorites() {
  toggleAddToFavoritesAdvice();
}

export function initAddToFavorites() {
  button.addEventListener("click", addToFavorites);
}
