const clockContainer = document.querySelector(".js-clock"),
      dateTitle = clockContainer.querySelector("h1"),
      clockTitle = clockContainer.querySelector("h2");

function getTime(){
  const date = new Date();
  const months = date.getMonth();
  const dates = date.getDate();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  dateTitle.innerText = `${months+1}월 ${dates}일`;
  clockTitle.innerText = `${
    hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds}`;

}

function init(){
  getTime();
  setInterval(getTime, 1000);
}

init();
