const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/register', upload.single('image'), userController.register);
router.post('/login', userController.login);

router.get('/profile', auth, authController.getProfile);
router.put('/profile', auth, upload.single('image'), authController.updateProfile);
router.get('/:id', userController.getUserProfile);
router.get('/:id/articles', userController.getUserArticles);

module.exports = router; 