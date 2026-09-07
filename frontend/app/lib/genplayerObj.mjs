export const genPlayerObj = (color, username) => {
  return {
    tag: "span",
    attrs: {
      class: `player-selected ${color}-avatar`,
    },
    children: [
      {
        tag: "strong",
        children: [username],
      },
    ],
  };
};
