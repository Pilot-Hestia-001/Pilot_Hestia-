const UserModel = require('../models/userModel');
const LedgerModel = require('../models/ledgerModel')
const RedemptionModel = require('../models/RedemptionModel')
require('dotenv').config();

const getTotalUsers = async(req, res) => {
   const userTotal = await UserModel.getTotalUsers()
   res.json({message: "These are the total users", totalUsers: userTotal})
}

const getAllEarnedPoints = async (req, res) => {
    try{
      const earnedPoints = await LedgerModel.getTotalEarned();
      if (earnedPoints === null) return res.status(404).json({ message: 'Points record not found' });
     
      res.json(earnedPoints);
    } catch(err) {
      console.error('Error getting points:', err);
      res.status(500).json({ message: 'Server error retrieving points' })
    }
  }

const getAllSpentPoints = async (req, res) => {
    try{
      const spentPoints = await LedgerModel.getTotalSpent();
      if (spentPoints === null) return res.status(404).json({ message: 'Points record not found' });
     
      res.json(spentPoints);
    } catch(err) {
      console.error('Error getting points:', err);
      res.status(500).json({ message: 'Server error retrieving points' })
    }
  }

  const getAllUnusedPoints = async (req, res) => {
    try{
      const spentPoints = await LedgerModel.getTotalSpent();
      const earnedPoints = await LedgerModel.getTotalEarned();

      if (spentPoints === null) return res.status(404).json({ message: 'Points record not found' });
      if (earnedPoints === null) return res.status(404).json({ message: 'Points record not found' });

      const unusedPoints = Number(earnedPoints) + Number(spentPoints);
      
      res.json(unusedPoints);
    } catch(err) {
      console.error('Error getting points:', err);
      res.status(500).json({ message: 'Server error retrieving points' })
    }
  }

  const getVendorRedemptionStats = async(req, res) => {
    try{
       const vendorStats = await RedemptionModel.getVendorRedemptionStats();
       if (vendorStats === null) return res.status(404).json({ message: 'No vendor stats present' });

       res.json(vendorStats)
    } catch(err) {
      console.error('Error getting stats:', err);
      res.status(500).json({ message: 'Server error retrieving stats' })
    }
  }

module.exports = {
    getTotalUsers,
    getAllSpentPoints,
    getAllEarnedPoints,
    getAllUnusedPoints,
    getVendorRedemptionStats
}