const express = require('express');
const router = express.Router();
const {getUserPoints, createUserPoints, getAllpoints} = require('../controllers/pointsController')
const protect = require('../middleware/authMiddleware');

router.get('/', protect, getUserPoints);
router.get('/getAll', getAllpoints)
router.post('/create', protect, createUserPoints);


module.exports = router;
