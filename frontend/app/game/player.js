import { newElement } from "../../src/modules/dom.mjs";
import { mySocket } from "../main.mjs";
let state = false;

export class Player {
  constructor(props, x, y, color, username) {
    this.type = "PLAYER";
    this.username = username;
    this.color = color;
    this.container = props;
    this.position = { x: x || 0, y: y || 0 };
    this.transitionDuration = this.getTransitionDuation();
    this.cageSize = 0;
    this.element = this.createElement();
    this.positionElement();
    this.moveEnebled = true;
    this.bonusBombs = [];
    this.bonusSpeeds = [];
    this.bonusFlames = [];
    this.lifeCounter = 3;
    this.explositionDuration = this.getExplositionDuation();

    // Moove only your player with keys based on uuid
    if (color === this.container.userColor) {
      this.checkKeyListener();
    }
  }
  reduceLife() {
    console.log("reducing... ");
    if (!state) {
      state = true;
      this.lifeCounter -= 1;
      if (this.lifeCounter < 0) this.lifeCounter = 0;
      let counterDisplay = document.querySelector(`.lifeCount-${this.color}`);
      if (counterDisplay) counterDisplay.textContent = `${this.lifeCounter}`;
      if (this.lifeCounter == 0) {
        counterDisplay.parentElement.classList.add("dead");
        this.explose();
        // console.log("in reduce");
        this.gameOver();
      } else {
        console.log("impacted 💣 on: ", this.color);
        this.element.classList.add("impact");
        setTimeout(() => {
          if (this.element) this.element.classList.remove("impact");
        }, 1100);
      }
      setTimeout(() => {
        state = false;
      }, 1000);
    }
  }

  gameOver() {
    console.log("in GO");
    if (
      document.querySelectorAll(".game-player") &&
      document.querySelectorAll(".game-player").length == 1
    ) {
      console.log("in maps => ", document.querySelectorAll(".game-player"));
      let winner = document.querySelectorAll(".game-player");
      console.log(winner[0]);
      let winnerColor = winner[0].classList.item(1).split("-")[1];
      console.log("color is => ", winnerColor);
      this.sendMsgToSocket("gameOver", winnerColor);
    } else {
      console.log(
        "game pursues with => ",
        document.querySelectorAll(".game-player")
      );
    }
  }

  getExplositionDuation() {
    const element = document.documentElement; // Generally, the root element
    const styles = getComputedStyle(element);
    // Retrieve the value of the CSS variable
    const varStyle = styles.getPropertyValue("--player-explosition-transition");
    return parseInt(varStyle) || 1000; // 1s par defaut
  }
  createElement() {
    let element = this.element;
    if (!this.element) {
      element = newElement(
        {
          tag: "div",
          attrs: {
            // id: "player",
            class: "game-player player-" + this.color + "-down",
          },
          children: [],
        },
        "game-container",
        "class"
      );
    }

    let { width, height } = this.container?.element?.getBoundingClientRect();
    element.style.width = `${height / this.container.cellsNumber}px`;
    element.style.height = `${height / this.container.cellsNumber}px`;
    return element;
  }
  getTransitionDuation() {
    const element = document.documentElement; // Generally, the root element
    const styles = getComputedStyle(element);
    // Retrieve the value of the CSS variable
    const varStyle = styles.getPropertyValue("--moving-transition");
    return parseInt(varStyle) || 0;
  }
  positionElement() {
    let { top, left, width, height } =
      this.container?.element?.getBoundingClientRect();
    this.cageSize = height / this.container.cellsNumber;
    let { x, y } = this.position;
    this.element.style.left = `${left + x * this.cageSize}px`;
    this.element.style.top = `${top + y * this.cageSize}px`;
  }

  checkKeyListener() {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case " ":
          // this.container.createBomb(this.position)
          this.sendMsgToSocket("bombPlace", "BOMB");
          break;
        case "ArrowUp":
          if (this.canMoove("UP")) this.sendMsgToSocket("playerMove", "UP");
          break;
        case "ArrowDown":
          if (this.canMoove("DOWN")) this.sendMsgToSocket("playerMove", "DOWN");
          break;
        case "ArrowLeft":
          if (this.canMoove("LEFT")) this.sendMsgToSocket("playerMove", "LEFT");
          break;
        case "ArrowRight":
          if (this.canMoove("RIGHT"))
            this.sendMsgToSocket("playerMove", "RIGHT");
          break;
        default:
          break;
      }
    });
  }
  checkHasBonus() {
    let bonus = this.container.obstacles.find(
      (obs) =>
        obs.position.x === this.position.x &&
        obs.position.y === this.position.y &&
        obs.type.startsWith("BONUS_")
    );
    if (bonus) {
      switch (
        bonus.type //khech remplace le push par incrementation
      ) {
        case "BONUS_BOMB":
          this.bonusBombs.push(bonus);
          bonus.remove();
          break;
        case "BONUS_SPEED":
          this.bonusSpeeds.push(bonus);
          bonus.remove();
          break;
        case "BONUS_FLAME":
          this.bonusFlames.push(bonus);
          bonus.remove();
          break;
        default:
          console.log("Type de bonus inconnu");
          break;
      }
    }
  }
  getSpeed() {
    let speedLen = this.bonusSpeeds.length + 1;
    speedLen = speedLen > 3 ? 3 : speedLen;
    this.transitionDuration = 50 + this.transitionDuration / speedLen;
    return this.transitionDuration + "ms";
  }
  move(direction) {
    this.element.style.transition = this.getSpeed();
    switch (direction) {
      case "UP":
        this.moveUp("up");
        break;
      case "DOWN":
        this.moveDown("down");
        break;
      case "LEFT":
        this.moveLeft("left");
        break;
      case "RIGHT":
        this.moveRight("right");
        break;

      default:
        break;
    }
    this.moveEnebled = false;
    setTimeout(() => {
      this.moveEnebled = true;
    }, this.transitionDuration);
    this.checkHasBonus();
  }
  moveRight(position) {
    this.position.x += 1;
    this.positionElement();
    addAndRemove(
      this.element,
      `move-${this.color}-to-right`,
      this.color,
      position
    );
    // this.element.classList.add(`move-${this.color}-to-right`)
  }
  moveLeft(position) {
    this.position.x -= 1;
    this.positionElement();
    //this.element.classList.add(`move-${this.color}-to-left`)
    addAndRemove(
      this.element,
      `move-${this.color}-to-left`,
      this.color,
      position
    );
  }
  moveUp(position) {
    this.position.y -= 1;
    this.positionElement();
    //this.element.classList.add(`move-${this.color}-to-front`)
    addAndRemove(
      this.element,
      `move-${this.color}-to-back`,
      this.color,
      position
    );
  }
  moveDown(position) {
    this.position.y += 1;
    this.positionElement();
    //this.element.classList.add(`move-${this.color}-to-back`)
    addAndRemove(
      this.element,
      `move-${this.color}-to-front`,
      this.color,
      position
    );
  }
  canMoove(direction) {
    if (!this.moveEnebled) return false;

    //swich direction
    let { x, y } = this.position;
    let colleded;
    switch (direction) {
      case "RIGHT":
        colleded = this.container.obstacles.find(
          (obs) =>
            obs.position.x === x + 1 &&
            obs.position.y === y &&
            !obs.type.startsWith("BONUS_")
        );
        return x < this.container.cellsNumber - 1 && !colleded;
      case "LEFT":
        colleded = this.container.obstacles.find(
          (obs) =>
            obs.position.x === x - 1 &&
            obs.position.y === y &&
            !obs.type.startsWith("BONUS_")
        );
        return this.position.x > 0 && !colleded;
      case "UP":
        colleded = this.container.obstacles.find(
          (obs) =>
            obs.position.x === x &&
            obs.position.y === y - 1 &&
            !obs.type.startsWith("BONUS_")
        );
        return this.position.y > 0 && !colleded;
      case "DOWN":
        colleded = this.container.obstacles.find(
          (obs) =>
            obs.position.x === x &&
            obs.position.y === y + 1 &&
            !obs.type.startsWith("BONUS_")
        );
        return this.position.y < this.container.cellsNumber - 1 && !colleded;
      default:
        break;
    }
  }
  sendMsgToSocket(type, value) {
    if (this.element)
      mySocket.sendData(
        JSON.stringify({
          Type: type,
          Payload: {
            Color: this.container.userColor,
            Value: value,
          },
        })
      );
  }
  explose() {
    this.element.classList.replace("game-player", `${this.color}-death`);

    setTimeout(() => {
      // this.element.classList.replace(`${this.color}-death`, "game-player");
      this.remove();
    }, this.explositionDuration);
  }
  remove() {
    this.container.players = this.container.players.filter(
      (player) => player !== this
    );
    this.container.obstacles = this.container.obstacles.filter(
      (obs) => obs !== this
    );
    this.element = this.element.remove();
  }
}

function addAndRemove(el, className, color, position) {
  let prevClass = el.classList.item(el.classList.length - 1);
  el.classList.replace(prevClass, className);

  setTimeout(function () {
    el.classList.replace(className, `player-${color}-${position}`);
  }, 500);
}
