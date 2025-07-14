const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  forgotPassword,
  updateVendorImage,
  getAllVendors,
  getVendorByName
} = require('../controllers/vendorController');
router.get('/all', getAllVendors);
router.get('/find/:name', getVendorByName);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.put('/:id/image', updateVendorImage);

module.exports = router;
