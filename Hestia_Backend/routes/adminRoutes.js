const express = require('express');
const router = express.Router();
const {
    getTotalUsers, 
    getAllSpentPoints,
    getAllEarnedPoints,
    getAllUnusedPoints,
    getVendorRedemptionStats} = require("../controllers/adminController")

router.get('/allUsers', getTotalUsers)
router.get('/allSpent', getAllSpentPoints)
router.get('/allEarned', getAllEarnedPoints)
router.get('/allUnused', getAllUnusedPoints)
router.get('/stats', getVendorRedemptionStats)

module.exports = router;