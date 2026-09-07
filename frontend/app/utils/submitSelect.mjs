import { mySocket } from "../main.mjs";

export const submitSelect = () => {
  let username = document.getElementById("username").value,
    Selected = document.querySelectorAll(".selected")[0].children[0].id;
  if (username.length <= 8)
    mySocket.sendData(
      JSON.stringify({
        Type: "selectPlayer",
        Payload: {
          Username: username,
          Player: Selected,
        },
      })
    );
};
