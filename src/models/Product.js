const mongoose = require('mongoose');

const { Schema } = mongoose;

const mySchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  leadTime: Number,
  image: {
    type: Array,
    default: ['https://res.cloudinary.com/dobzwgcvl/image/upload/v1552593758/pro-geek-ecommerce/product-pictures/default.png']
  },
  description: String,
  material: String,
  height: String,
  manufacturer: String,
  rating: [Object],
  category: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }]
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Product = mongoose.model('Product', mySchema);
module.exports = Product;
