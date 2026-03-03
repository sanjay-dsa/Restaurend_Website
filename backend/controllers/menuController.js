const MenuItem = require('../models/MenuItem');

// Get all menu items with optional filtering
exports.getAllMenuItems = async (req, res) => {
  try {
    const { category, isVegan, isGlutenFree, search } = req.query;
    let query = {};

    if (category) query.category = category;
    if (isVegan === 'true') query.isVegan = true;
    if (isGlutenFree === 'true') query.isGlutenFree = true;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const menuItems = await MenuItem.find(query).sort({ category: 1, popularity: -1 });
    
    res.status(200).json({
      success: true,
      count: menuItems.length,
      data: menuItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get menu items by category
exports.getMenuByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const menuItems = await MenuItem.find({ category, isAvailable: true }).sort({ popularity: -1 });

    res.status(200).json({
      success: true,
      data: menuItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single menu item
exports.getMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: menuItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get featured menu items (high rating & popularity)
exports.getFeaturedItems = async (req, res) => {
  try {
    const featuredItems = await MenuItem.find({ isAvailable: true })
      .sort({ rating: -1, popularity: -1 })
      .limit(6);

    res.status(200).json({
      success: true,
      data: featuredItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};