let db = require('../db.js');

module.exports = {
  getAll: async (callback) => {
    try {
      let find = await db.find({}).sort({created_at: -1}).limit(10);
      let reversed = [...find].reverse();
      callback(null, reversed);
    }
    catch (err) {
      callback(err);
    }
  },

  storeMessage:(obj, callback) => {
    console.log(obj, 'in the store message');
    obj.created_at = new Date();
    let storeObj = new db(obj);
    storeObj.save();
  },
};