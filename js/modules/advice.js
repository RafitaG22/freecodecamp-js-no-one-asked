//* IMPORT MODULES
import { fetchAdvice } from "./api.js";
import {
  showLoadingMessage,
  showAdvice,
  showErrorMessage,
  disableGetAdviceButton,
  enableGetAdviceButton,
  changeGetAdviceButtonText,
  resetAddToFavoritesButtonText,
  disableAddToFavoritesButton,
  enableAddToFavoritesButton,
  preloadAddToFavoritesButtonText,
  disableSeeFavoritesButton,
  enableSeeFavoritesButton,
  updateMessageAnnouncement,
} from "./ui.js";

//* ADVICE.JS SCRIPT
async function generateAdvice() {
  showLoadingMessage();
  disableGetAdviceButton();
  resetAddToFavoritesButtonText();
  disableAddToFavoritesButton();
  disableSeeFavoritesButton();

  try {
    const adviceMessage = await fetchAdvice();
    showAdvice(adviceMessage);
    preloadAddToFavoritesButtonText();
    updateMessageAnnouncement("Advice generated.");
  } catch (error) {
    showErrorMessage(error);
    updateMessageAnnouncement("Failed to load advice. Please try again.");
  } finally {
    enableGetAdviceButton();
    changeGetAdviceButtonText();
    enableAddToFavoritesButton();
    enableSeeFavoritesButton();
  }
}

export function initGetRandomAdvice() {
  document
    .querySelector(".main__button--get-advice")
    .addEventListener("click", generateAdvice);
}
