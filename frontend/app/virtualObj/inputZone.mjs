import { checkInput } from "../utils/checkInput.mjs";
export const inputZone = {
  tag: "div",
  attrs: {
    id: "input",
  },
  children: [
    {
      tag: "input",
      attrs: {
        id: "username",
        type: "text",
        placeholder: "Enter your username",
      },
      event: { script: checkInput, type: "input" },
    },
  ],
};
