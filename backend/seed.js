const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const seedMenuItems = async () => {
  await connectDB();

  const menuItems = [
    {
      name: 'Pan-Seared Scallops',
      description: 'Succulent diver scallops with cauliflower purée and brown butter',
      price: 32,
      category: 'Appetizers',
      ingredients: ['Scallops', 'Cauliflower', 'Brown Butter', 'Microgreens'],
      isVegan: false,
      isGlutenFree: true,
      preparationTime: 15,
      rating: 4.8
    },
    {
      name: 'Grass-Fed Beef Tenderloin',
      description: 'Premium beef tenderloin with foie gras and truffle sauce',
      price: 48,
      category: 'Main Course',
      ingredients: ['Beef Tenderloin', 'Foie Gras', 'Truffle', 'Burgundy Wine'],
      isVegan: false,
      isGlutenFree: true,
      preparationTime: 25,
      rating: 4.9
    },
    {
      name: 'Chocolate Soufflé',
      description: 'Light and fluffy dark chocolate soufflé with vanilla bean ice cream',
      price: 16,
      category: 'Desserts',
      ingredients: ['Dark Chocolate', 'Eggs', 'Butter', 'Vanilla'],
      isVegan: false,
      isGlutenFree: false,
      preparationTime: 20,
      rating: 4.7
    }
  ];

  await MenuItem.insertMany(menuItems);
  console.log('Menu items seeded successfully');
  process.exit(0);
};

seedMenuItems();