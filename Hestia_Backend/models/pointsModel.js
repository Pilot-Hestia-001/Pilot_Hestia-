const db = require('../db');

class Points{
      static async getByUserId(userId) {
        const record = await db('points').where({ user_id: userId }).first()
        return record?.balance || 0
      }

      static async getAllpoints(){
        let sum = 0
        try{
          const allPoints = await db("points"); 

          if (!Array.isArray(allPoints) || allPoints.length === 0) {
            console.error("No points fetched or result was invalid");
            return 0;
          }
      
          for (const point of allPoints) {
            sum += point.balance; 
          }
          
          return sum;
        } catch(e){
          console.log("error with fetching or calculating points")
        }
      }
    
      static async createForUser(userId) {
        return db('points').insert({ user_id: userId }).returning('*');
      }
    
      static async updateBalance(userId, amount) {
        return db('points')
          .where({ user_id: userId })
          .increment('balance', amount)
          .returning('*');
      }
}

module.exports = Points;