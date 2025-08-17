import { io } from 'socket.io-client';

const token = localStorage.getItem('token');

const socket = io(import.meta.env.VITE_API_URL , {
  auth: {
    token, // or however you store it
  },
  transports: ["websocket"]
});

export default socket;
