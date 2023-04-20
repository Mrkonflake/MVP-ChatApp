const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.qzzab70.mongodb.net/?retryWrites=true&w=majority`)
// const testSchema = new mongoose.Schema({
//   title: String,
//   author: String,
//   favorite: Boolean
// })

// const TestModel = mongoose.model('test', testSchema);

// let test = new TestModel({
//   title: 'this is just a test',
//   author: 'Brengeley',
//   favorite: true
// })

// test.save()
// TestModel.find({}).then(data => console.log(data))

const messageSchema = new mongoose.Schema({
  username: String,
  message: String,
  created_at: {
    type: Date,
    default: Date.now
}
})
const messageModel = mongoose.model('messages', messageSchema);

module.exports = messageModel;