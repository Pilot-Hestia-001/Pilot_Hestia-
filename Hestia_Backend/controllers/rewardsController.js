const RewardModel = require('../models/rewardsModel');

const getVendorRewards = async (req, res) => {
    const vendorId = req.params.vendor_id || req.user.id; // adjust if vendor is authenticated
   
    try {
      const rewards = await RewardModel.getVendorRewards(vendorId);
      res.json(rewards);
    } catch (err) {
      console.error('Error fetching rewards:', err);
      res.status(500).json({ message: 'Failed to get vendor rewards' });
    }
  };

  const getAllRewards = async (req, res) => {
    try {
      const rewards = await RewardModel.getAllRewards();
      res.json(rewards);
    } catch (err) {
      console.error('Error fetching rewards:', err);
      res.status(500).json({ message: 'Failed to fetch rewards' });
    }
  };

  const updateVendorImage = async (req, res) => {
    const { id } = req.params;
    const { img } = req.body;
  
    try {
      if (!img) {
        return res.status(400).json({ error: 'Image URL or path is required' });
      }
  
      const updatedReward = await RewardModel.addImgById({ id, img });
  
      if (!updatedReward) {
        return res.status(404).json({ error: 'Vendor not found' });
      }
  
      res.json({
        message: 'Vendor image updated successfully',
        vendor: updatedReward,
      });
    } catch (err) {
      console.error('Error updating vendor image:', err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
 const createReward = async (req, res) => {
    try {
      console.log(req.body.vendor_id)
      const rewardData = {
        vendor_id: req.body.vendor_id, // assuming vendor is authenticated
        title: req.body.title,
        description: req.body.description,
        cost: req.body.cost,
        quantity: req.body.quantity,
        UsdPrice: req.body.UsdPrice,
        active: true,
        img: req.body.img,
      };
  
      const newReward = await RewardModel.createReward(rewardData);
      res.status(201).json(newReward[0]);
    } catch (err) {
      console.error('Error creating reward:', err);
      res.status(500).json({ message: 'Failed to create reward' });
    }
  };

  module.exports = { getVendorRewards, createReward, getAllRewards};