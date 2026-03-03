const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Public routes
router.get('/', menuController.getAllMenuItems);
router.get('/category/:category', menuController.getMenuByCategory);
router.get('/item/:id', menuController.getMenuItem);
router.get('/featured', menuController.getFeaturedItems);

module.exports = router;