const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

// All admin routes require authentication
router.use(auth);

router.post('/menu-items', adminController.createMenuItem);
router.patch('/menu-items/:id', adminController.updateMenuItem);
router.delete('/menu-items/:id', adminController.deleteMenuItem);
router.get('/dashboard/stats', adminController.getDashboardStats);

module.exports = router;