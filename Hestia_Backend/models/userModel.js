const db = require("../db");
const QRCode = require("qrcode");
const { v4: uuidv4 } = require("uuid");

class UserModel {
  static async create({ first_name, last_name, email, password }) {
    try {
      const qr_code = uuidv4();

      // Optional: create QR image data URL
      const qr_url = await QRCode.toDataURL(qr_code);
      if (!qr_url) {
        console.error("Unable to generate QRCode");
      }

      return await db("users")
        .insert({ first_name, last_name, email, password, qr_code, qr_url })
        .returning("*");
    } catch {
      console.error("Unable to create user.");
    }
  }

  static async findByEmail(email) {
    try {
      const user = await db("users").where({ email }).first();
      return user;
    } catch {
      console.error("unable to find by email");
    }
  }

  static async findById(id) {
    try {
      if (!id) {
        console.error("Invalid Id");
      }

      return await db("users").where({ id }).first();
    } catch {
      console.error("unable to find my id");
    }
  }

  static async findByQRCode(qr_code) {
    return await db("users").where({ qr_code }).first();
  }

  static async saveResetToken(id, hashedToken, expires) {
    return await db("users")
      .where({ id })
      .insert({ reset_token: hashedToken, reset_token_expires: expires });
  }

  static async updatePassword(id, password) {
    await db("users").where({ id }).update({ password: password });
  }
}

module.exports = UserModel;
