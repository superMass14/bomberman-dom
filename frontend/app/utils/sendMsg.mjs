import { mySocket } from "../main.mjs";

export const sendMsg = (e) => {
  var text = e.target.previousSibling ? e.target.previousSibling : e.target;
  if (text.value.trim().length > 0) {
    var userData = JSON.parse(localStorage.getItem("info"));
    mySocket.sendData(
      JSON.stringify({
        Type: "newMessage",
        Payload: {
          Message: text.value,
          Username: userData.username,
          Color: userData.color,
        },
      })
    );
    text.value = "";
  } else {
    console.error("invalid message format");
  }
};

export const sendMsg_onKeydown = (e) => {
  if (e.key != "Enter") return ;
  var text = e.target;
  if (text.value.trim().length > 0) {
    var userData = JSON.parse(localStorage.getItem("info"));
    mySocket.sendData(
      JSON.stringify({
        Type: "newMessage",
        Payload: {
          Message: text.value,
          Username: userData.username,
          Color: userData.color,
        },
      })
    );
    text.value = "";
  } else {
    console.error("invalid message format");
  }
};
