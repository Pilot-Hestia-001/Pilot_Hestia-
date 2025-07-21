const db = require('../db');

class RewardModel {
  // Get all active rewards for a specific vendor
  static async getVendorRewards(vendor_id) {
    return db('rewards').where({ vendor_id, active: true });
  }

  static async getAllRewards() {
    return db('rewards').where({ active: true });
  }  

  // Create a new reward
  static async createReward(reward) {
    return db('rewards').insert(reward).returning('*');
  }

  static async getById(id){
    return db('rewards').where( {id} ).first()
  }

  // Redeem a reward
  static async redeemReward({ user_id, reward_id, cost}) {

    return await db.transaction(async trx => {
      const reward = await trx('rewards').where({ id: reward_id }).first();
      if (!reward) throw new Error('Reward not found');
      if (!reward.vendor_id) throw new Error('Vendor ID missing from reward');
      if (reward.quantity <= 0) throw new Error('Reward out of stock');
  
      const userPoints = await trx('points').where({ user_id }).first();
      const balance = userPoints?.balance ?? 0;
      if (balance < cost) throw new Error('Insufficient balance');
  
      // Deduct points
      await trx('points')
        .where({ user_id })
        .decrement('balance', cost);
  
      // Ledger entry
      await trx('ledger').insert({
        user_id,
        vendor_id: reward.vendor_id,
        amount: -cost,
        type: 'spend',
        description: `Redeemed: ${reward.title}`
      });
  
      // Decrease reward quantity
      await trx('rewards')
        .where({ id: reward_id })
        .decrement('quantity', 1);
  
      return reward;
    });
  }
}

module.exports = RewardModel;
