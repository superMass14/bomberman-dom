export const virtualObj = {
    tag: "div",
    attrs: {
      id: "container",
    },
    children: [
      {
        tag: "button",
        attrs: {
          id: "start",
        },
        event: {
          script: () => {
            console.log("clicked");
          },
          type: "click",
        },
      },
    ],
  };
