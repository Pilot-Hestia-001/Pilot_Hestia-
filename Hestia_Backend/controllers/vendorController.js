const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../db")
const crypto = require('crypto');
const VendorModel = require('../models/vendorModel');
require('dotenv').config();

const generateToken = (vendorId) => {
  return jwt.sign({ id: vendorId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const register = async (req, res) => {
  const { business_name, first_name, last_name, email, password } = req.body;

  try {
    const existingVendor = await VendorModel.findByEmail(email);
    if (existingVendor) {
      return res.status(400).json({ message: 'Vendor already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [newVendor] = await VendorModel.create({
      business_name,
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newVendor.id);
    res.status(201).json({ token });
  } catch (err) {
    console.error('Vendor Register Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllVendors = async (req, res) => {
  try {
    const allVendors =  await VendorModel.getAllVendors()
    res.json(allVendors)
  } catch(e) {
     console.error("problem with getting vendors")
  }
}

const getVendor = async (req, res) => {
  try{
    const vendor = await VendorModel.findById(req.user)

    res.json(vendor)
  } catch(e){
    console.error("")
  }
}

const getVendorById = async (req, res) => {
  const { vendor_id } = req.params
  const id = vendor_id

  try{
    const vendor = await VendorModel.findById(id)
    res.json(vendor)
  } catch(e){
    console.error("Issue retrieving vendor")
  }
}

const getVendorByName = async (req, res) =>{
  const { name } = req.params;
  
  try{
    const business_name = name;
    const vendor = await VendorModel.findByBusiness(business_name)
    res.json(vendor)
  } catch(e){
    console.error("couldn't fetch vendor")
  }
}

const updateVendorImage = async (req, res) => {
  const { id } = req.params;
  const { img } = req.body;

  try {
    if (!img) {
      return res.status(400).json({ error: 'Image URL or path is required' });
    }

    const updatedVendor = await VendorModel.addImgById({ id, img });

    if (!updatedVendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    res.json({
      message: 'Vendor image updated successfully',
      vendor: updatedVendor,
    });
  } catch (err) {
    console.error('Error updating vendor image:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(email, password)
    const vendor = await VendorModel.findByEmail(email);
    if (!vendor) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    
    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(vendor.id);
    res.json({ token });
  } catch (err) {
    console.error('Vendor Login Error:', err);
    res.status(500).json({ message: 'Something went wrong during login' });
  }
};

const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const vendor = await VendorModel.findByEmail(email);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const expires = new Date(Date.now() + 15 * 60 * 1000);

    await VendorModel.saveResetToken(vendor.id, hashedToken, expires);

    const resetUrl = `http://localhost:3000/reset-password?vendor=true&token=${resetToken}`;
    console.log(`Vendor Reset URL: ${resetUrl}`);

    res.json({ message: 'Reset link sent (check console)' });
  } catch (err) {
    console.error('Forgot Password Error:', err);
    res.status(500).json({ message: 'Error sending reset token' });
  }
};

const getCouponsByVendor = async (req, res) => {
  const vendor_id = req.user; // Assuming vendor ID comes from auth middleware
  // Or use: const vendor_id = req.params.vendor_id; if passed in URL
  try {
    const coupons = await db('reward_redemptions as rr')
      .join('users as u', 'rr.user_id', 'u.id')
      .join('vendors as v', 'rr.vendor_id', 'v.id')
      .join('rewards as r', 'rr.reward_id', 'r.id')
      .select(
        'rr.status',
        'rr.order_number',
        'rr.discount',
        'rr.code',
        'rr.size',
        'u.first_name',
        'u.last_name',
        'u.id as user_id',
        'v.id as vendor_id',
        'r.id as reward_id',
        'r.title as reward_title',
        'r.cost',
      )
      .where('rr.vendor_id', vendor_id)
      .andWhere('rr.status', 'pending');

    res.status(200).json(coupons);
  } catch (err) {
    console.error('Error fetching coupons by vendor:', err);
    res.status(500).json({ message: 'Failed to retrieve coupons for vendor' });
  }
};

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  updateVendorImage,
  getAllVendors,
  getVendorByName,
  getVendorById,
  getVendor,
  getCouponsByVendor
};
