const mongoose = require('mongoose');

const { Schema } = mongoose;

const mySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'Order'
  },
  rating: { type: Number, required: true },
  coments: String
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Evaluation = mongoose.model('Evaluation', mySchema);
module.exports = Evaluation;
