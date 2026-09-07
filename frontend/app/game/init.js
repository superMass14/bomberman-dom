import { newElement } from "../../src/modules/dom.mjs";
import { userInfoUI } from "../virtualObj/userInfoUI.mjs";
import { Block } from "./block.js";
import { Bomb } from "./bomb.js";
import { Cell } from "./cell.js";
import { Player } from "./player.js";
// import data from "./data.js";
import { Wall } from "./wall.js";
import { BonusBomb } from "./bonusBomb.js";
import { BonusSpeed } from "./bonusSpeed.js";
import { BonusFlame } from "./bonusFlame.js";

export class Game {
  constructor() {
    this.widthPercentage = 70;
    this.heightPercentage = 70;
    this.cellsNumber = 14;
    this.bombs = [];
    this.userColor = this.getUserColor();
    this.addInfoTab();
    this.addMapContainer();
    this.element = this.createGameElement();
    this.cells = this.createCellsElemets();
    this.obstacles = [];
    this.players = [];
  }

  addInfoTab() {
    let myUserInfoUI;

    const infoUser = localStorage.getItem("info");
    let colors = [];

    if (infoUser !== null) {
      const info = JSON.parse(infoUser);

      info.PlayerList.forEach((player) => {
        colors.push({ color: player[0], username: player[1] });
        myUserInfoUI = userInfoUI(colors);
      });
      console.log("Couleurs de l'objet infoUser.PlayerList :", colors);
    } else {
      console.log("Aucune info utilisateur.");
    }

    let element = newElement(myUserInfoUI, "gameElement", "id");
    element.style.width = `${this.heightPercentage - 2}vh`;
    element.style.height = "auto";
    console.log("created el => ", element);
  }

  addInstructions() {}

  addPlayers(value) {
    // value exemple: [{x:1,y:4,color:'red'}...]
    for (const player of value) {
      let newPlayer = new Player(
        this,
        player.x,
        player.y,
        player.color,
        player.username
      );
      this.players.push(newPlayer);
      this.obstacles.push(newPlayer);
    }
  }

  getUserColor() {
    let data = localStorage.getItem("info");
    if (data) {
      data = JSON.parse(data);
      return data.color;
    }
  }

  createObstaclesElements(data) {
    let obstacles = [];
    data.forEach((obstacle) => {
      let { x, y, type } = obstacle;
      if (type === "WALL") {
        obstacles.push(new Wall(this, x, y));
      } else if (type === "BLOCK") {
        obstacles.push(new Block(this, x, y));
      } else if (type === "BONUS_BOMB") {
        obstacles.push(new BonusBomb(this, x, y));
        obstacles.push(new Wall(this, x, y));
      } else if (type === "BONUS_SPEED") {
        obstacles.push(new BonusSpeed(this, x, y));
        obstacles.push(new Wall(this, x, y));
      } else if (type === "BONUS_FLAME") {
        obstacles.push(new BonusFlame(this, x, y));
        obstacles.push(new Wall(this, x, y));
      }
    });
    this.obstacles = obstacles;
  }

  addMapContainer() {
    let element = newElement(
      {
        tag: "div",
        attrs: {
          class: "map-container",
        },
        children: [
          {
            tag: "div",
            attrs: {
              id: "map",
            },
            children: [],
          },
        ],
      },
      "gameElement",
      "id"
    );
    element.style.width = `${this.heightPercentage}vh`;
    element.style.height = `${this.heightPercentage}vh`;
    return element;
  }

  createCellsElemets() {
    let cells = [];
    for (let x = 0; x < this.cellsNumber; x++) {
      for (let y = 0; y < this.cellsNumber; y++) {
        cells.push(new Cell(this, x, y));
      }
    }
    return cells;
  }

  createGameElement() {
    let element = newElement(
      {
        tag: "div",
        attrs: {
          id: "gameConatainer",
          class: "game-container",
        },
        children: [],
      },
      "map",
      "id"
    );
    return element;
  }

  createBomb({ x, y }, color) {
    let bomb = new Bomb(this, x, y, color);
    if (bomb.element) {
      this.bombs.push(bomb);
      this.obstacles.push(bomb);
    }
  }
}

export let game = null;
export function initGame() {
  game = new Game();
  //onscreen resize
  window.addEventListener("resize", () => {
    game.players.forEach((player) => {
      player.createElement();
      player.positionElement();
    });
    game.obstacles.forEach((obstacle) => {
      obstacle.createElement();
      obstacle.positionElement();
    });
    game.cells.forEach((obstacle) => {
      obstacle.createElement();
      obstacle.positionElement();
    });
  });
}
