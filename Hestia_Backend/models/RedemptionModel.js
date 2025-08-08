const db = require('../db');


class RedemptionModel {
  // Create a redemption entry (optional, you may handle everything in reward_codes)
  static async create({ user_id, vendor_id, reward_id, code, discount, size }) {
    const [redemption] = await db('reward_redemptions')
      .insert({
        user_id,
        vendor_id,
        reward_id,
        code,
        status: 'pending',
        discount,
        size
      })
      .returning('*');
    return redemption;
  }

  // Find a redemption record by code
  static async findByCode(code) {
    return await db('reward_redemptions')
      .where({ code })
      .first();
  }

  static async getRedemptionInfo(code) {
    return await db('reward_redemptions as rr')
      .join('users as u', 'rr.user_id', 'u.id')
      .join('vendors as v', 'rr.vendor_id', 'v.id')
      .join('rewards as r', 'rr.reward_id', 'r.id')
      .select(
        'rr.order_number',
        'rr.discount',
        'r.cost',
        'r.title',
        'u.email',
        'u.first_name as user_first_name',
        'u.last_name as user_last_name',
        'v.business_name',
        'v.first_name as vendor_first_name',
        'v.last_name as vendor_last_name',
        'u.id as user_id',
        'v.id as vendor_id',
        'r.id as reward_id'
      )
      .where('rr.code', code)
      .first();
  }

  // Vendor validates and confirms redemption
  static async redeem(code) {
    console.log(code)
   const exists = await db('reward_redemptions').where({ code }).first();
   if (!exists) return null; // or throw an error

    await db('reward_redemptions')
      .where({ code })
      .update({
        status: 'redeemed',
        redeemed_at: db.fn.now(),
    })

    return await this.getRedemptionInfo(code);
  }

  // Cancel a redemption (if needed)
  static async cancel(code) {
    return await db('reward_redemptions')
      .where({ code })
      .update({
        status: 'cancelled',
      });
  }

  // Get all redemptions by vendor
  static async getByVendor(vendor_id) {
    return await db('reward_redemptions')
      .where({ vendor_id })
      .orderBy('created_at', 'desc');
  }

  // Get all redemptions by user
  static async getByUser(user_id) {
    return await db('reward_redemptions')
      .where({ user_id })
      .orderBy('created_at', 'desc');
  }
}

module.exports = RedemptionModel;
