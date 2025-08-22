const { connectedUsers, connectedVendors} = require('./connections');
let ioInstance;

const initSocket = (io) => {
  ioInstance = io;
  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);
  });
};

const emitToUser = (userId, event, data) => {
  const socketId = connectedUsers.get(userId);
  if (socketId && ioInstance) ioInstance.to(socketId).emit(event, data);
};

const emitToVendor = (vendorId, event, data) => {
  const socketId = connectedVendors.get(vendorId);
  if (socketId && ioInstance) ioInstance.to(socketId).emit(event, data);
};

module.exports = { initSocket, emitToUser, emitToVendor };
