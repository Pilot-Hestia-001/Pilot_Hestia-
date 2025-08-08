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

const getRewardById = async (req, res) =>{
  const {id} = req.params
  try{
    const reward = await RewardModel.getById(id);
    res.json(reward)
  } catch(e) {
    console.error('Error fetching rewards:', err);
    res.status(404).json({ message: 'Failed to fetch rewards' });
  }
}

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

  const updateSize = async (req, res) => {
    const { reward_id, sizeKey, value } = req.body;
    
    try {
      // Use the TEXT/JSON method (or switch to updateSizeJsonb if you're using JSONB)
      const updatedSizes = await RewardModel.updateSize(reward_id, sizeKey, value);
  
      res.status(200).json({
        message: `Size ${sizeKey} updated to ${value}`,
        sizes: updatedSizes,
      });
    } catch (e) {
      console.error('Error updating size:', e);
      res.status(500).json({ message: 'Failed to update size' });
    }
  };
  
 const createReward = async (req, res) => {
    try {
      console.log(req.body.vendor_id)
      const rewardData = {
        vendor_id: req.body.vendor_id, // assuming vendor is authenticated
        title: req.body.title,
        cost: req.body.cost,
        quantity: req.body.quantity,
        UsdPrice: req.body.UsdPrice,
        active: true,
        img: req.body.img,
        sizes: {
          xs: true,
          s: true,
          m: true,
          l: true,
          xl: true,
          xxl: true
        }
      };
  
      const newReward = await RewardModel.createReward(rewardData);
      res.status(201).json(newReward[0]);
    } catch (err) {
      console.error('Error creating reward:', err);
      res.status(500).json({ message: 'Failed to create reward' });
    }
  };

  module.exports = { getVendorRewards, createReward, getAllRewards, getRewardById, updateSize};