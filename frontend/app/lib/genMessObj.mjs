export const genMessObj = (color, username, content, from = "chat") => {
  return {
    tag: "div",
    attrs: {
      class: `message ${from}`,
    },
    children: [
      {
        tag: "img",
        attrs: {
          src: `/frontend/public/assets/${color}-avatar.svg`,
          class: `pp`,
          alt: "pp",
        },
      },
      {
        tag: "span",
        attrs: {
          class: `name`,
        },
        children: [username],
      },
      {
        tag: "span",
        attrs: {
          class: `message-content`,
        },
        children: [content],
      },
    ],
  };
};
