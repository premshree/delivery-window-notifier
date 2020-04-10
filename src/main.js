const config = {
  "Amazon Whole Foods": ".ufss-available",
};

let getRefreshRate = () => {
  let min = 10;
  let max = 30;
  let random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random * 1000;
}

const checkAvailability = () => {
  for (key in config) {
    let found = document.querySelector(config[key]);
    if (found) {
      chrome.runtime.sendMessage("", {
        type: "notification",
        options: {
          title: "Delivery Window Notifier",
          message: `OMG!!! Found delivery window for ${key}!`,
          iconUrl: "img/groceries-128x128.png",
          type: "basic",
        },
      });
      return true;
    }
  }
};

window.addEventListener("load", () => {
  let found = checkAvailability();
  setInterval(() => {
    if (!found) location.reload();
  }, getRefreshRate());
});
