const MenuItem = require('../models/MenuItem');

// Create menu item
exports.createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, allergens, ingredients, isVegan, isGlutenFree, preparationTime } = req.body;

    const menuItem = await MenuItem.create({
      name,
      description,
      price,
      category,
      allergens,
      ingredients,
      isVegan,
      isGlutenFree,
      preparationTime,
      image: {
        url: req.body.imageUrl || '',
        publicId: req.body.imagePublicId || ''
      }
    });

    res.status(201).json({
      success: true,
      message: 'Menu item created successfully',
      data: menuItem
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update menu item
exports.updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const menuItem = await MenuItem.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Menu item updated successfully',
      data: menuItem
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await MenuItem.findByIdAndDelete(id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    // Delete image from Cloudinary if it exists
    if (menuItem.image.publicId) {
      const cloudinary = require('../config/cloudinary');
      await cloudinary.uploader.destroy(menuItem.image.publicId);
    }

    res.status(200).json({
      success: true,
      message: 'Menu item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get statistics (admin dashboard)
exports.getDashboardStats = async (req, res) => {
  try {
    const totalMenuItems = await MenuItem.countDocuments();
    const availableItems = await MenuItem.countDocuments({ isAvailable: true });
    const itemsByCategory = await MenuItem.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    const stats = {
      totalMenuItems,
      availableItems,
      itemsByCategory
    };

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};