const RedemptionModel = require('../models/RedemptionModel');
const RewardCodeModel = require('../models/RewardCodeModel');
const io = require('../server');
const { connectedUsers, connectedVendors, pendingReceipts } = require('../connections');
const db = require('../db');

const redeemCode = async (req, res) => {
  const { code } = req.body;
  try {
    const codeEntry = await RewardCodeModel.findByCode(code);
    if (!codeEntry || codeEntry.used) {
      return res.status(400).json({ message: 'Invalid or already used code' });
    }

    await RewardCodeModel.markAsUsed(codeEntry.id);
    const redemption = await RedemptionModel.redeem(codeEntry.code);
   
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

module.exports = {redeemCode, getCouponByUser};
