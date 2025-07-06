const db = require('../db');

class VendorModel {
  static async create({ business_name, first_name, last_name, email, password}) {
    return await db('vendors')
      .insert({ business_name, first_name, last_name, email, password })
      .returning('*');
  }

  static async addImgById({ id, img }) {
    return await db('vendors')
      .where({ id })
      .update({ img })
      .returning('*');
  }
  
  static async findByEmail(email) {
    const user = await db('vendors').where({ email }).first();
    return user;
  }

  static async findByBusiness(business_name) {
    const user = await db('vendors').where({ business_name }).first();
    return user;
  }

  static async findById(id) {
    return await db('vendor').where({ id }).first();
  }
  
  static async setResetToken(email, token, expiresAt) {
    return db('vendors')
      .where({ email })
      .update({
        reset_token: token,
        reset_token_expires: expiresAt
      });
  }

  static async getAllVendors(){
    try{
      return db('vendors');
    } catch(e) {
      console.log("error fetching vendors")
    }
  }

  static async findByResetToken(token) {
    return db('vendors')
      .where({ reset_token: token })
      .andWhere('reset_token_expires', '>', new Date())
      .first();
  }

  static async updatePassword(id, newPassword) {
    const hashed = await bcrypt.hash(newPassword, 10);
    return db('vendors')
      .where({ id })
      .update({ password: hashed, reset_token: null, reset_token_expires: null });
  }
}

module.exports = VendorModel;