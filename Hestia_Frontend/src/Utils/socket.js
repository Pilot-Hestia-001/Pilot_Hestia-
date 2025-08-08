import { io } from 'socket.io-client';

const socket = io("https://pilot-hestia-backend.onrender.com", {
  auth: {
    token: localStorage.getItem('token'), // or however you store it
  },
  transports: ["websocket"]
});

export default socket;
