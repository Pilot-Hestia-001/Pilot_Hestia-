import { io } from 'socket.io-client';

const socket = io("http://localhost:8080", {
  auth: {
    token: localStorage.getItem('token'), // or however you store it
  },
  transports: ["websocket"]
});

export default socket;
