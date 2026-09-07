let hour = 0;
let min = 0;
let sec = 0;
let ms = 0;

const formatTime = (hours, minutes, seconds) => {
  return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};

export const setTimer = () => {
  requestAnimationFrame(setTimer);
  let time = document.querySelector(".clock");
  ms++;
  if (ms > 59) sec++, (ms = 0);
  if (sec > 59) min++, (sec = 0);
  if (min > 59) {
    hour++;
    min = 0;
    time.style.fontSize = "1.8vw";
    time.style.margin = "0% 40%";
  }
  time.innerHTML = formatTime(hour, min, sec);
};


