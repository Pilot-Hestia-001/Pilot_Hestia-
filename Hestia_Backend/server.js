const express = require('express');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const streamifier = require('streamifier');

const app = express();
const PORT = process.env.PORT || 8080;
const upload = multer();

app.use(express.json()); 
app.use(cors({
    origin: '*'
  }));

//test route
app.get('/test', (req, res) => {
  res.send('Backend is running!');
});

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

  return res.status(401).json({ valid: false, message: 'Invalid passcode' });
});


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
app.use('/api/vendor', vendorRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
