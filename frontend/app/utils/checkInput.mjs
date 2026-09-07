import { newElement } from "../../src/modules/dom.mjs";
import { buttonSubmit } from "../virtualObj/buttonSubmit.mjs";

export const checkInput = (e) => {
  var submitButton = document.getElementById("submit");
  var inputZone = document.getElementById("input");
  if (
    e.target.value.trim().length > 2 &&
    e.target.value.trim().length <= 8 &&
    document.querySelector(".selected") &&
    !submitButton
  ) {
    newElement(buttonSubmit, "input", "id");
  } else if (
    (e.target.value.trim().length < 2 || e.target.value.trim().length > 8) &&
    submitButton
  ) {
    inputZone.removeChild(submitButton);
  }
};
