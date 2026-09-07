import { newElement } from "../src/modules/dom.mjs";
import { Router } from "../src/modules/route.mjs";
import { game } from "./game/init.js";
import { addMess } from "./lib/addMess.mjs";
import { genPlayerObj } from "./lib/genplayerObj.mjs";
import { updatePL } from "./lib/updatePlayerList.mjs";
import { Render } from "./routes/render.mjs";
import { Socket } from "./utils/socketObj.mjs";
import { errObj } from "./virtualObj/errObj.mjs";
import { gameOverPage } from "./virtualObj/gameover.mjs";

export const render = new Render(),
  routes = new Router({
    "/": render.renderHome,
    "/select": render.renderSelect,
    "/waiting": render.renderWaiting,
    "/game": render.renderGame,
  }),
  mySocket = new Socket();
mySocket.connectSocket();

const main = () => {
  var endpoint = window.location.href;
  if (!endpoint.includes("#")) {
    history.pushState({}, "", `${endpoint}#/`);
  } else {
    endpoint = endpoint.split("#")[0];
    history.pushState({}, "", `${endpoint}#/`);
  }
  routes.loadCurrentView();
  mySocket.network.onopen = () => {
    console.log("socket opened");
  };

  mySocket.network.onmessage = (event) => {
    const data = JSON.parse(event.data);
    switch (data.Type) {
      case "enterGame":
        if (data.Payload == "full") {
          const errDisplay = document.getElementById("err");
          if (!errDisplay) newElement(errObj, "container", "id");
        } else {
          localStorage.setItem(
            "infoSelect",
            JSON.stringify({
              value: data.PlayerList,
            })
          );
          routes.push("/select");
        }
        break;

      case "gameOver":
        gameOverPage.children[0].children[1].children[0] = `${data.username} wins the match`;
        newElement(gameOverPage, "container3", "id");
        break;

      case "disconnect":
        if (document.getElementById("container3")) {
          if (game) {
            // value exemple: [{x:1,y:4,color:'red'}...]
            let foundPlayer = game.players.filter((x) => x.color == data.color);
            console.log("found ", foundPlayer);
            if (foundPlayer) {
              foundPlayer[0].remove();
              let counterDisplay = document.querySelector(
                `.lifeCount-${foundPlayer[0].color}`
              );
              if (counterDisplay) {
                console.log("refresh page from => ", foundPlayer[0].color);
                counterDisplay.textContent = `0`;
                counterDisplay.parentElement.classList.add("dead");
              }
              game.players[0].gameOver();
            }
          }
        }
        break;

      case "selectPlayer":
        // console.log("in select with => ", data);
        if (data.gameStatus == "started") {
          const errDisplay = document.getElementById("err");
          if (!errDisplay) {
            errObj.children[0] = "game has started";
            newElement(errObj, "container", "id");
          }
          return;
        }
        localStorage.setItem(
          "info",
          JSON.stringify({
            username: data.Username,
            color: data.Player,
            PlayerList: data.PlayerList,
            MessageList: data.MessageList,
          })
        );
        routes.push("/waiting");

      case "waiting-timer":
        // console.log("in waiting timer");
        document.getElementById("secs").innerHTML = `${
          data.value ? data.value : 0
        }s...`;
        break;

      case "start-game-timer":
        const counter = document.getElementById("secs");
        counter.innerHTML = `${data.value}s...`;
        if (!counter.classList.contains("start-game")) {
          counter.classList.add("start-game");
        }
        if (data.value == 0) {
          routes.push("/game");
        }
        break;

      case "newPlayer":
        if (routes.getCurrentView() != "/waiting") {
          document
            .getElementsByClassName(`icon ${data.Player}`)[0]
            .classList.add("chosen");

          return;
        }
        if (data.Player.trim() != "")
          newElement(
            genPlayerObj(data.Player, data.Username),
            "players",
            "class"
          );
        document.getElementById("nbr").innerHTML = `${data.PlayerList.length} `;
        updatePL(data.PlayerList);
        break;

      case "newMessage":
        // console.log("new message !");
        addMess(data.Username, data.Color, data.Message);
        break;

      case "gameObstacles":
        setTimeout(() => {
          if (game) {
            // value exemple: [{x:1,y:4,type:'WALL'}...]
            game.createObstaclesElements(data.value);
          }
        }, 1000);
        break;

      case "addPlayers":
        setTimeout(() => {
          if (game) {
            // value exemple: [{x:1,y:4,color:'red'}...]
            game.addPlayers(data.value);
          }
        }, 1000);
        break;

      case "movePlayer":
        if (game) {
          // value exemple: {color:'red',direction:'UP'}
          game.players.forEach((player) => {
            if (player.color === data.color) {
              player.move(data.direction);
            }
          });
        }
        break;

      case "placeBomb":
        if (game) {
          // value exemple: {color:'red',direction:'UP'}
          game.players.forEach((player) => {
            if (player.color === data.color) {
              // player.move(data.direction)
              game.createBomb(player.position, player.color);
            }
          });
        }
        break;

      default:
        console.log("data.Type inconnue:", data.Type);
        break;
    }
  };
};

main();
