const RewardModel = require('../models/rewardsModel');
const RewardCodeModel = require('../models/RewardCodeModel')
const RedemptionModel =  require("../models/RedemptionModel")
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const io = require('../server');

const purchaseReward = async (req, res) => {
  const user_id = req.user;
  const { reward_id, size, cost, discount } = req.body;

  try {
    
    const reward = await RewardModel.getById(reward_id);
    if (!reward) return res.status(404).json({ message: 'Reward not found' });


   if (!reward || reward.quantity <= 0 || reward.sizes[size] === false) return res.status(404).json({ message: 'Reward not available' });

   const redeem = await RewardModel.redeemReward({user_id, reward_id, cost});
   if (!redeem) return res.status(404).json({ message: 'Redemption failed' });


    const code = uuidv4().split('-')[0].toUpperCase();

    const coupon = await RewardCodeModel.create({user_id, reward_id, code});


    await RedemptionModel.create({
        user_id: user_id,
        reward_id: reward_id,
        vendor_id: reward.vendor_id,
        code: coupon.code,
        discount: discount,
        size: size
      });

    const coupons = await db('reward_redemptions as rr')
      .join('users as u', 'rr.user_id', 'u.id')
      .join('vendors as v', 'rr.vendor_id', 'v.id')
      .join('rewards as r', 'rr.reward_id', 'r.id')
      .select(
        'rr.status',
        'rr.order_number',
        'rr.discount',
        'rr.size',
        'u.first_name',
        'u.last_name',
        'u.id as user_id',
        'v.id as vendor_id',
        'r.id as reward_id',
        'r.title as reward_title',
        'r.cost',
      )
      .where('rr.reward_id', reward_id)
      .orderBy('rr.created_at', 'desc') // Or 'rr.id' if you don't have created_at
      .first();
      res.status(201).json({ message: 'Reward purchased', code: coupon.code, order_number: coupons.order_number});
      
      io.to(`vendor_${reward.vendor_id}`).emit("new_coupon", coupons);
    
  } catch (err) {
    console.error('Error purchasing reward:', err);
    res.status(500).json({ message: 'Could not purchase reward' });
  }
};

module.exports = {purchaseReward};