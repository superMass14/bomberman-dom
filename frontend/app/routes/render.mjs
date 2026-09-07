import { newElement, prependElement } from "../../src/modules/dom.mjs";
import { hdleEvent } from "../../src/modules/event.mjs";
import { initGame } from "../game/init.js";
import { genInfoBandObj } from "../lib/genInfoBandObj.mjs";
import { genMessObj } from "../lib/genMessObj.mjs";
import { genPlayerObj } from "../lib/genplayerObj.mjs";
import { EnterGame } from "../utils/enterGame.mjs";
import { playerDisplayObj, roomObj } from "../virtualObj/WRoomObj.mjs";
import { instructionTable } from "../virtualObj/instruction.mjs";
import { setTimer } from "../utils/timer.mjs";
import { inputZone } from "../virtualObj/inputZone.mjs";
import { selectPlayer } from "../virtualObj/selectPlayer.mjs";
import { virtualObj } from "../virtualObj/virtualObj.mjs";
export class Render {
  constructor() {}
  renderHome() {
    newElement(virtualObj);
    hdleEvent("click", document.getElementById("start"), EnterGame);
    localStorage.clear();
  }

  renderSelect() {
    const container = document.getElementById("container");
    const startButton = document.getElementById("start");
    if (startButton) {
      container.removeChild(startButton);
    }
    const infoSelect = JSON.parse(localStorage.getItem("infoSelect"));
    selectPlayer.children[0].children.map((li) => {
      if (infoSelect.value?.includes(li.attrs.class.split(" ")[1])) {
        li.attrs.class += " chosen";
      }
    });
    newElement(inputZone, "container", "id");
    newElement(selectPlayer, "container", "id");
  }

  renderWaiting() {
    localStorage.removeItem("infoSelect");
    const container = document.getElementById("container");
    container.innerHTML = "";
    container.id = "container2";
    const info = JSON.parse(localStorage.getItem("info"));
    newElement(roomObj, "container2", "id");
    newElement(playerDisplayObj, "container2", "id");
    prependElement(genInfoBandObj(info.PlayerList.length), "container2", "id");
    for (const player of info.PlayerList) {
      newElement(genPlayerObj(player[0], player[1]), "players", "class");
    }
    if (info.MessageList) {
      for (const mess of info.MessageList) {
        newElement(genMessObj(mess[0], mess[1], mess[2]), "screen", "id");
      }
    }
  }

  renderGame() {
    const container = document.getElementById("container2");
    container.id = "container3";
    container.innerHTML = "";
    newElement(instructionTable, "container3", "id");
    newElement(
      { tag: "div", attrs: { id: "gameElement" } },
      "container3",
      "id"
    );
    initGame();
    setTimer();
  }
}
