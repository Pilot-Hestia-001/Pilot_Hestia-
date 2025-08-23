const RedemptionModel = require('../models/RedemptionModel');
const RewardCodeModel = require('../models/RewardCodeModel');
const nodemailer = require('nodemailer');
const { connectedUsers, connectedVendors, pendingReceipts } = require('../connections');
const io = require('../server');
const db = require('../db');

const redeemCode = async (req, res) => {
  const { code } = req.body;
  try {
    const codeEntry = await RewardCodeModel.findByCode(code);
    if (!codeEntry || codeEntry?.used) {
      return res.status(400).json({ message: 'Invalid or already used code' });
    }

    await RewardCodeModel.markAsUsed(codeEntry.id);
    const redemption = await RedemptionModel.redeem(codeEntry.code);

    if(!redemption) return res.status(500).json({ message: 'Something went wrong...' });
   
    res.json({message: "redeemed"})

    const orderNumber = redemption?.order_number;
    const receiptRoom = `receipt_${orderNumber}`;
    console.log(redemption)
    // Look up socket IDs from a map you maintain when sockets connect
 
    const userSocketId = connectedUsers.get(redemption?.user_id);
    const vendorSocketId = connectedVendors.get(redemption?.vendor_id);

    if (userSocketId) {
      io.to(userSocketId).emit('join_receipt_room', { room: receiptRoom});
    }
    if (vendorSocketId) {
      io.to(vendorSocketId).emit('join_receipt_room', { room: receiptRoom });
    }

    const finalPrice =  (redemption.cost * (1 - redemption.discount/100)) / 100
    const emberPrice =  redemption.cost - (finalPrice * 100)

    const receiptInfo = {
      order_number: redemption.order_number,
      user_name: `${redemption.user_first_name} ${redemption.user_last_name}`,
      vendor_name: `${redemption.vendor_first_name} ${redemption.vendor_last_name}`,
      business_name: redemption.business_name,
      reward_title: redemption.title,
      spent: emberPrice,
      remaining_USD: finalPrice
    }

    pendingReceipts.set(receiptRoom, receiptInfo);
    const userEmail = redemption.email
    sendReceiptEmail( userEmail, receiptInfo)

  } catch (err) {
    console.error('Redemption error:', err);
    res.status(500).json({ message: 'Server error during redemption' });
  }
};

const getCouponByUser = async (req, res) => {
  const user_id = req.user; // Assuming user is extracted from auth middlewar
  try {
    const coupons = await db('reward_redemptions as rr')
      .join('users as u', 'rr.user_id', 'u.id')
      .join('vendors as v', 'rr.vendor_id', 'v.id')
      .join('rewards as r', 'rr.reward_id', 'r.id')
      .select(
        'rr.order_number',
        'rr.status',
        'rr.code',
        'rr.discount',
        'u.first_name',
        'u.last_name',
        'v.id as vendor_id',
        'r.id as reward_id',
      )
      .where('rr.user_id', user_id);

    res.status(200).json(coupons);
  } catch (err) {
    console.error('Error fetching coupons:', err);
    res.status(500).json({ message: 'Failed to retrieve coupons' });
  }
}



const sendReceiptEmail = async (userEmail, receiptInfo) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or another service
      auth: {
        user: process.env.SMTP_USER, // your email
        pass: process.env.SMTP_PASS  // your email password or app password
      }
    });

    const mailOptions = {
      from: `"Hestia Events" <${process.env.SMTP_USER}>`,
      to: userEmail,
      subject: `Your Discount Receipt - Order ${receiptInfo.order_number}`,
      html: `
        <h2>Receipt</h2>
        <p><strong>Order:</strong> ${receiptInfo.order_number}</p>
        <p><strong>Customer:</strong> ${receiptInfo.user_name}</p>
        <p><strong>Vendor Business:</strong> ${receiptInfo.business_name}</p>
        <p><strong>Vendor Name:</strong> ${receiptInfo.vendor_name}</p>
        <p><strong>Title:</strong> ${receiptInfo.reward_title}</p>
        <p><strong>Embers Spent:</strong> ${receiptInfo.spent}</p>
        <p><strong>Remaining Price:</strong> $${receiptInfo.remaining_USD.toFixed(2)}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Receipt email sent to ${userEmail}`);
  } catch (err) {
    console.error('Error sending receipt email:', err);
  }
};

module.exports = {redeemCode, getCouponByUser};
