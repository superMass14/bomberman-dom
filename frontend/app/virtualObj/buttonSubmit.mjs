import { submitSelect } from "../utils/submitSelect.mjs";

export const buttonSubmit = {
  tag: "button",
  attrs: {
    id: "submit",
    class: "active",
  },
  event: { script: submitSelect, type: "click" },
  children: ["▶"],
};
