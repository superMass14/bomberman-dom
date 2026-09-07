import { newElement } from "../../src/modules/dom.mjs";
import { genMessObj } from "./genMessObj.mjs";

export const addMess = (username = "", color = "", message = "") => {
  const userData = JSON.parse(localStorage.getItem("info")),
    from = userData.color == color ? "" : "chat";
  newElement(genMessObj(color, username, message, from), "screen", "id");
  if (from != "chat") {
    const screen = document.getElementById("screen");
    screen.scrollTop = screen.scrollHeight;
  }
  // console.log("✔ message added successfully");
};
