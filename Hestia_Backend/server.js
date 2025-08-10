const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const streamifier = require('streamifier');
const { connectedUsers, connectedVendors, pendingReceipts} = require('./connections');
const joinedReceiptRooms = new Map();

const app = express();
const PORT = process.env.PORT || 8080;
const upload = multer();

const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['https://pilot-hestia-frontend.onrender.com', "http://localhost:8080"], // Adjust as needed
    methods: ['GET', 'POST']
  }
});

module.exports = io;

const jwt = require('jsonwebtoken');

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error: no token provided'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded; // Attach decoded payload to socket
    next();
  } catch (err) {
    return next(new Error('Authentication error: invalid token'));
  }
});

io.on('connection', (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on('register_user', ({ userId }) => {
   
    connectedUsers.set(userId, socket.id);
    console.log("registered user", userId, "socket number", socket.id)
  });

  socket.on('register_vendor', ({ vendorId }) => {
    connectedVendors.set(vendorId, socket.id);
    socket.emit("registered_vendor", {vendorId})
  });

  socket.on("join_vendor_room", ({ vendorId }) => {
    const registeredVendorSocketId = connectedVendors.get(vendorId);
    
    if (registeredVendorSocketId !== socket.id) {
      console.warn(`Unauthorized vendor join attempt for vendor ${vendorId}`);
      return;
    }

      const roomName = `vendor_${vendorId}`;
      socket.join(roomName);
      console.log(`Vendor ${vendorId} joined room ${roomName}`);
      socket.emit("joined_vendor_room", { roomName });
    });

    socket.on("leave_vendor_room", ({ vendorId }) => {
      const roomName = `vendor_${vendorId}`;
      socket.leave(roomName);
      console.log(`Vendor ${vendorId} left room ${roomName}`);
    });

    socket.on('request_join_receipt_room', (data) => {
      socket.join(data?.room);
      console.log(`${data?.role} joined room: ${data?.room}`);
  
      if (!joinedReceiptRooms.has(data?.room)) {
        joinedReceiptRooms.set(data?.room, new Set());
      }
    
      joinedReceiptRooms.get(data?.room).add(data?.role);
      socket.join(data?.room);
    
      console.log(`${data?.role} joined ${data?.room}`);
    
      setTimeout(() => {
        const roomSet = joinedReceiptRooms.get(data?.room);
        if (roomSet && roomSet.has('user') && roomSet.has('vendor')) {
          console.log(`Both parties joined ${data?.room}. Emitting show_receipt`);
          console.log(pendingReceipts.get(data?.room))
          io.to(data?.room).emit('show_receipt', pendingReceipts.get(data?.room));
        }
      }, 500);
    })

  socket.on('disconnect', () => {
    // Remove disconnected sockets from the maps
    for (const [key, value] of connectedUsers) {
      if (value === socket.id) connectedUsers.delete(key);
    }
    for (const [key, value] of connectedVendors) {
      if (value === socket.id) connectedVendors.delete(key);
    }
  });
});


app.use(express.json()); 
app.use(cors({
    origin: ['https://pilot-hestia-frontend.onrender.com', "http://localhost:8080"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }));

//test route
app.get('/test', (req, res) => {
  res.send('Backend is running!');
});

//Cloudinary 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.post('/api/upload', upload.single('image'), async(req, res) => {
  try {
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'your_folder_name' },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload(req);
    res.json({ imageUrl: result.secure_url });
  } catch (err) {
    console.error("Cloudinary upload failed", err);
    res.status(500).send("Upload failed");
  }
});

//Code Validation 
app.post('/api/validate', (req, res) => {
  const { passcode } = req.body;

  if (!passcode) {
    return res.status(400).json({ valid: false, message: 'No passcode provided' });
  }

  if (passcode === process.env.PASSCODE_MEMBER) {
    console.log("hit member check");
    return res.status(200).json({ valid: true, role: 'member' });
  }

  if (passcode === process.env.PASSCODE_ADMIN) {
    return res.status(200).json({ valid: true, role: 'admin' });
  }

  if (passcode === process.env.PASSCODE_VENDOR) {
    return res.status(200).json({ valid: true, role: 'vendor' });
  }

  return res.status(401).json({ valid: false, message: 'Invalid passcode' });
});

//Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const rewardRoutes = require('./routes/rewardsRoutes');
app.use('/api/rewards', rewardRoutes);

const activtiyRoutes =  require('./routes/activityRoutes');
app.use('/api/activities', activtiyRoutes);

const pointsRoutes = require('./routes/pointsRoutes');
app.use('/api/points', pointsRoutes);

const userRoutes =  require('./routes/userRoutes');
app.use('/api/user', userRoutes);

const vendorRoutes = require('./routes/vendorRoutes');
const { join } = require('path');
app.use('/api/vendor', vendorRoutes);

app.use(express.static(path.join(__dirname, 'build')));

// Handle React Router client-side routing (send index.html for all other routes)
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
