const RedemptionModel = require('../models/RedemptionModel');
const RewardCodeModel = require('../models/RewardCodeModel');
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
    console.log(redemption)
   
    // You can calculate discount/savings here if needed

    res.json({
      message: 'Reward redeemed successfully',
      redemption
    });

  } catch (err) {
    console.error('Redemption error:', err);
    res.status(500).json({ message: 'Server error during redemption' });
  }
};

const getCouponByUser = async (req, res) => {
  const user_id = req.user; // Assuming user is extracted from auth middleware
  console.log("user " + user_id)
  try {
    const coupons = await db('reward_redemptions as rr')
      .join('users as u', 'rr.user_id', 'u.id')
      .join('vendors as v', 'rr.vendor_id', 'v.id')
      .join('rewards as r', 'rr.reward_id', 'r.id')
      .select(
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
