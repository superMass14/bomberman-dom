export const gameOverPage = {
  tag: "div",
  attrs: {
    id: "game-over-page",
  },
  children: [
    {
      tag: "div",
      attrs: {
        id: "game-over-box",
      },
      children: [
        {
          tag: "img",
          attrs: {
            class: "win-image",
            src: "/frontend/public/assets/golden-trophy.png",
            alt: "Game Over",
          },
        },
        {
          tag: "h2",
          attrs: {
            id: "winner-title",
          },
          children: ["User1 wins the match"],
        },
        {
          tag: "button",
          children: ["Go back"],
          attrs: {
            id: "go-back",
          },
          event: {
            script: () => {
              window.location.reload();
            },
            type: "click",
          },
        },
      ],
    },
  ],
};
