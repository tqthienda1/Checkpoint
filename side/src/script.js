var socket = new WebSocket("ws://192.168.4.1:81/");
const btnStart = document.getElementById("btn-start");
const btn1 = document.getElementById("btn-1");
const btn2 = document.getElementById("btn-2");
const btn3 = document.getElementById("btn-3");
const btn4 = document.getElementById("btn-4");
const btn5 = document.getElementById("btn-5");
const btn6 = document.getElementById("btn-6");
const btn7 = document.getElementById("btn-7");
const btn8 = document.getElementById("btn-8");
const btn9 = document.getElementById("btn-9");

function sendData(data) {
  alert("Reset thành công.");
  socket.send(data.toString());
}

socket.onopen = function (e) {
  console.log("[socket] socket.onopen");
  btnStart.addEventListener("click", sendData.bind(this, 0));
  btn1.addEventListener("click", sendData.bind(this, 1));
  btn2.addEventListener("click", sendData.bind(this, 2));
  btn3.addEventListener("click", sendData.bind(this, 3));
  btn4.addEventListener("click", sendData.bind(this, 4));
  btn5.addEventListener("click", sendData.bind(this, 5));
  btn6.addEventListener("click", sendData.bind(this, 6));
  btn7.addEventListener("click", sendData.bind(this, 7));
  btn8.addEventListener("click", sendData.bind(this, 8));
  btn9.addEventListener("click", sendData.bind(this, 9));
};
socket.onerror = function (e) {
  console.log("[socket] socket.onerror");
};
socket.onmessage = function (e) {
  console.log("[socket] " + e.data);
};
