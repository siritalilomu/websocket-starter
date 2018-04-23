var myName       = window.prompt("Hi. What's your name?");
var messageInput = document.querySelector("#message-input");
var messageLog   = document.querySelector("#message-log");
var sendButton   = document.querySelector("#send-button");

var logMessage = function (message) {
  var el = document.createElement("div");
  el.innerHTML = message;
  messageLog.appendChild(el);
};

sendButton.onclick = function () {
  var message = messageInput.value;
  console.log('message', message)
  socket.send(myName + " Says: " + message);
  logMessage(message);
};

// Making a websocket My ip ws: is using the websocket protocol
// var socket = new WebSocket('ws://144.38.142.209:8080');

var HOST = location.origin.replace(/^http/, 'ws')
var socket = new WebSocket(HOST);
var el = document.getElementById('server-time');

// ws.onmessage = function (event) {
//   el.innerHTML = 'Server time: ' + event.data;
// };

// Making an event with a function it is known as event handler
//  events also give you a event object function (event)
socket.onopen = function (event) {
    alert('you are now connected to the server, be careful out there.');
    console.log(myName, 'has joined the game');
    socket.send(myName, 'has joined');
};

socket.onmessage = function (event) {
    console.log("Message Recived", event)
    logMessage(event.data);
};