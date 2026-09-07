export const genInfoBandObj = (number) => {
  return {
    tag: "div",
    attrs: {
      id: "counter",
    },
    children: [
      {
        tag: "span",
        children: [
          "Nbr of players : ",
          {
            tag: "i",
            attrs: {
              id: "nbr",
            },
            children: [`${number}`],
          },
        ],
      },
      {
        tag: "strong",
        attrs: {
          id: "secs",
        },
        children: ["0s..."],
      },
    ],
  };
};
