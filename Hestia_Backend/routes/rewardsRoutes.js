const express = require('express');
const router = express.Router();
const {getVendorRewards, createReward, getRewardById, updateSize} = require('../controllers/rewardsController');
const { redeemCode, getCouponByUser} = require('../controllers/redemptionController')
const { getCouponsByVendor } = require("../controllers/vendorController")
const { purchaseReward } = require('../controllers/purchaseReward')
const protect = require('../middleware/authMiddleware');

router.get('/coupon', protect, getCouponByUser);
router.get('/vendor/coupon', protect, getCouponsByVendor)
router.get('/id/:id', getRewardById);
router.get('/:vendor_id', getVendorRewards);
router.put('/update/size', updateSize) 
router.put('/redeem', redeemCode);
router.put('/purchase', protect, purchaseReward);
router.post('/create', createReward);

module.exports = router;