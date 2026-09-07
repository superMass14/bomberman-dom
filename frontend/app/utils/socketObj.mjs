export class Socket {
  constructor() {
    this.network = null;
  }
  sendData(data) {
    this.network.send(data);
  }
  connectSocket() {
    var socket = new WebSocket("ws://0.0.0.0:8080/socket");
    this.network = socket;
  }
}
