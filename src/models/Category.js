const mongoose = require('mongoose');

const { Schema } = mongoose;

const mySchema = new Schema({
  name: String,
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Category = mongoose.model('Category', mySchema);
module.exports = Category;
