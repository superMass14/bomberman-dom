export const userInfoUI = (colors) => {
  const generateUserInfoUI = (colors) => {
    const userInfoElements = [];
    colors.forEach((player) => {
      const userInfoElement = {
        tag: "div",
        attrs: {
          class: "userInfoUIs",
        },
        children: [
          {
            tag: "p",
            attrs: {
              class: "player-avatar",
              style: `background-image: url('../public/assets/${player.color}-avatar.svg'); background-repeat: no-repeat;`,
            },
          },
          {
            tag: "div",
            attrs: {
              class: `lifeCount lifeCount-${player.color}`,
            },
            children: ["3"],
          },
          {
            tag: "p",
            attrs: {
              class: "names",
            },
            children: [player.username],
          },
        ],
      };
      userInfoElements.push(userInfoElement);
    });
    return userInfoElements;
  };

  return {
    tag: "div",
    attrs: {
      class: "infoUI",
    },
    children: [
      {
        tag: "div",
        attrs: {
          class: "timerUI",
        },
        children: [
          {
            tag: "p",
            attrs: {
              style:
                "background-image: url('../public/assets/alarme.png'); background-repeat: no-repeat;",
            },
          },
          {
            tag: "span",
            attrs: {
              class: "clock",
            },
          },
        ],
      },
      ...generateUserInfoUI(colors),
    ],
  };
};
