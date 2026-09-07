import { sendMsg, sendMsg_onKeydown } from "../utils/sendMsg.mjs";

export const roomObj = {
    tag: "div",
    attrs: {
      id: "message-box",
    },
    children: [
      {
        tag: "div",
        attrs: {
          id: "screen",
        },
      },
      {
        tag: "div",
        attrs: {
          id: "typeMess",
        },
        children: [
          {
            tag: "input",
            attrs: {
              id: "messageText",
              name: "messageText",
              type: "text",
              placeholder: "Say hi...",
            },
            event: {script: sendMsg_onKeydown, type: "keydown"}
          },
          {
            tag: "button",
            attrs: {
              id: "sendMess",
            },
            event: { script: sendMsg, type: "click" },
            children: ["send"],
          },
        ],
      },
    ],
  },
  playerDisplayObj = {
    tag: "div",
    attrs: {
      class: "players",
    },
  };
