<<<<<<< HEAD
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const logRoutes = require("./middleware/logRouteMiddleware");
=======
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const streamifier = require('streamifier');
const { connectedUsers, connectedVendors, pendingReceipts} = require('./connections');
const joinedReceiptRooms = new Map();
const nodemailer = require('nodemailer');
>>>>>>> main

const app = express();
const PORT = process.env.PORT || 8080;
const upload = multer();

const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['https://pilot-hestia-frontend.onrender.com', "http://localhost:5173"], // Adjust as needed
    methods: ['GET', 'POST']
  }
});

module.exports = io;

// const { initSocket } = require('./socketHelper');
// initSocket(io);



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

let raffleParticipants = [];

io.on('connection', (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on('register_user', ({ userId }) => {
   
    connectedUsers.set(userId, socket.id);
    console.log("registered user", userId, "socket number", socket.id)
  });

  socket.on('register_vendor', ({ vendorId }) => {
    console.log("registered")
    connectedVendors.set(vendorId, socket.id);
    socket.emit("registered_vendor", {vendorId})
  });

  socket.on("join_goal_room", ({ userId }) => {
    const registeredUserSocketId = connectedUsers.get(userId);
    
    if (registeredUserSocketId !== socket.id) {
      console.warn(`Unauthorized user join attempt for user ${userId}`);
      return;
    }

      const roomName = `goal_room`;
      socket.join(roomName);
      console.log(`User ${userId} joined room ${roomName}`);


      socket.emit("joined_goal_room", { roomName });
    });

    socket.on("leave_vendor_room", ({ vendorId }) => {
      const roomName = `vendor_${vendorId}`;
      socket.leave(roomName);
      console.log(`Vendor ${vendorId} left room ${roomName}`);
    });

    socket.on('request_join_receipt_room', ({ room, role }) => {
      if (!room || !role) return;
    
      socket.join(room);
      console.log(`${role} joined room: ${room}`);
    
      if (!joinedReceiptRooms.has(room)) {
        joinedReceiptRooms.set(room, new Set());
      }
    
      const participants = joinedReceiptRooms.get(room);
      participants.add(role);
    
      if (participants.size === 2 && participants.has('user') && participants.has('vendor')) {
        console.log(`Both user and vendor are now in ${room}. Sending receipt...`);
        io.to(room).emit('show_receipt', pendingReceipts.get(room));

        const socketsInRoom = io.sockets.adapter.rooms.get(room);
        if (socketsInRoom) {
          for (const socketId of socketsInRoom) {
            const s = io.sockets.sockets.get(socketId);
            if (s){
              s.leave(room);
              console.log("both parties have left the room")
          }
        }
      
        // Optionally, clean up your map
        joinedReceiptRooms.delete(room);
        pendingReceipts.delete(room);
      }
    }
    });

    socket.on("join_raffle_room", ({ user_id, name, role }) => {
      socket.join("raffle_room");

      if (!raffleParticipants.some(p => p.user_id === user_id) && role !== "admin") {
        raffleParticipants.push({ user_id, name });
      }
   
      io.to("raffle_room").emit("raffle_participants", {raffleParticipants});
      console.log("user " + user_id + " joined raffle room" )
    });
  
    socket.on("start_raffle", () => {
      if (raffleParticipants.length === 0) return;
  
      const winnerIdx = Math.floor(Math.random() * raffleParticipants.length);
      const winner = raffleParticipants[winnerIdx].name
      console.log(winnerIdx)
      // Tell everyone who won
      io.to("raffle_room").emit("raffle_winner", {winner, winnerIdx});
    });

    socket.on("leave_raffle_room", ({ user_id }) => {
      const roomName = "raffle_room";
      socket.leave(roomName);

      raffleParticipants = raffleParticipants.filter(p => p.user_id !== user_id);

      // Broadcast updated list
      io.to(roomName).emit("raffle_participants", { raffleParticipants });
      console.log(`User ${user_id} left ${roomName}`);
    });

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


<<<<<<< HEAD
app.use(logRoutes);
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
=======
app.use(express.json()); 
app.use(cors({
    origin: ['https://pilot-hestia-frontend.onrender.com', "http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }));
>>>>>>> main

//test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

<<<<<<< HEAD
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const rewardRoutes = require("./routes/rewardsRoutes");
app.use("/api/rewards", rewardRoutes);
=======
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
>>>>>>> main

const activtiyRoutes = require("./routes/activityRoutes");
app.use("/api/activities", activtiyRoutes);

<<<<<<< HEAD
const pointsRoutes = require("./routes/pointsRoutes");
app.use("/api/points", pointsRoutes);
=======
const pointsRoutes = require('./routes/pointsRoutes');
app.use('/api/points', pointsRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes)
>>>>>>> main

const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

<<<<<<< HEAD
const vendorRoutes = require("./routes/vendorRoutes");
app.use("/api/vendor", vendorRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
=======
const vendorRoutes = require('./routes/vendorRoutes');
const { join } = require('path');
app.use('/api/vendor', vendorRoutes);


app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }
  
  try {
    // create a transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // replace with your SMTP host
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER, // your email
        pass: process.env.SMTP_PASS // your email password or app password
      }
    });

    // send the email
    await transporter.sendMail({
      from: `"${firstName} ${lastName}" <${email}>`, // sender
      to: "elijah@projecthestia.org", // where you want to receive it
      subject: `Contact Form Message from ${firstName} ${lastName}`,
      text: message,
      html: `<p>${message}</p><p><strong>Sender's Email:</strong> ${email}</p>`
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send message" });
  }
});

app.use(express.static(path.join(__dirname, 'dist')));
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
>>>>>>> main
});



