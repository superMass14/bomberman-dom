import { mySocket } from "../main.mjs";

export const EnterGame = () => {
  mySocket.sendData(
    JSON.stringify({
      type: "enterGame",
      Payload: {
        value: "player wants to join a party",
      },
    })
  );
  console.log("join request sent");
};
