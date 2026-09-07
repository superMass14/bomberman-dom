import { select } from "../utils/select.mjs";

export const selectPlayer = {
  tag: "div",
  attrs: {
    id: "select",
  },
  children: [
    {
      tag: "ul",
      attrs: {
        id: "list",
      },
      children: [
        {
          tag: "li",
          attrs: {
            class: "icon blue",
          },
          children: [
            {
              tag: "img",
              attrs: {
                id: "blue",
                src: "/frontend/public/assets/blue icon.svg",
                alt: "blue bomberman",
              },
              event: { script: select, type: "click" },
            },
          ],
        },
        {
          tag: "li",
          attrs: {
            class: "icon green",
          },
          children: [
            {
              tag: "img",
              attrs: {
                id: "green",
                src: "/frontend/public/assets/green icon.svg",
                alt: "green bomberman",
              },
              event: { script: select, type: "click" },
            },
          ],
        },
        {
          tag: "li",
          attrs: {
            class: "icon red",
          },
          children: [
            {
              tag: "img",
              attrs: {
                id: "red",
                src: "/frontend/public/assets/red icon.svg",
                alt: "red bomberman",
              },
              event: { script: select, type: "click" },
            },
          ],
        },
        {
          tag: "li",
          attrs: {
            class: "icon white",
          },
          children: [
            {
              tag: "img",
              attrs: {
                id: "white",
                src: "/frontend/public/assets/white icon.svg",
                alt: "white bomberman",
              },
              event: { script: select, type: "click" },
            },
          ],
        },
      ],
    },
  ],
};
