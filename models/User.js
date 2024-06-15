const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
});

module.exports = mongoose.model('User', userSchema);
