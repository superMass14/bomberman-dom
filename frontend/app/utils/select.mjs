import { newElement } from "../../src/modules/dom.mjs";
import { buttonSubmit } from "../virtualObj/buttonSubmit.mjs";

export const select = (e) => {
  const selectedCharacter = e.target.id,
    playerIcons = document.querySelectorAll("img");
  playerIcons.forEach((img) => {
    img.parentElement.classList.remove("selected");
    if (
      img.id === selectedCharacter &&
      !img.parentElement.classList.contains("selected") &&
      !img.parentElement.classList.contains("chosen")
    ) {
      img.parentElement.classList.add("selected");
    }
  });
  var submitButton = document.getElementById("submit");
  var username = document.getElementById("username");
  if (
    document.querySelector(".selected") &&
    !submitButton &&
    username.value.trim().length > 2 && username.value.trim().length < 8
  ) {
    newElement(buttonSubmit, "input", "id");
  }
};
