const express = require('express');
const router = express.Router();
const {getVendorRewards, createReward, getRewardById } = require('../controllers/rewardsController');
const { redeemCode, getCouponByUser } = require('../controllers/redemptionController')
const { purchaseReward } = require('../controllers/purchaseReward')
const protect = require('../middleware/authMiddleware');

router.get('/coupon', protect, getCouponByUser )
router.get('/id/:id', getRewardById)
router.get('/:vendor_id', getVendorRewards);
router.put('/redeem', redeemCode)
router.put('/purchase', protect, purchaseReward)
router.post('/create', createReward);


module.exports = router;