const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a menu item name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [500, 'Description cannot be more than 500 characters']
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: [0, 'Price cannot be negative']
    },
    category: {
      type: String,
      enum: ['Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Wine Pairings'],
      required: true
    },
    allergens: [
      {
        type: String
      }
    ],
    ingredients: [
      {
        type: String
      }
    ],
    isVegan: {
      type: Boolean,
      default: false
    },
    isGlutenFree: {
      type: Boolean,
      default: false
    },
    image: {
      url: String,
      publicId: String
    },
    preparationTime: {
      type: Number,
      default: 15
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    popularity: {
      type: Number,
      default: 0
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('MenuItem', menuItemSchema);