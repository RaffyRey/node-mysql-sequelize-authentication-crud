const {
	registerController,
	loginControllers,
	profileControllers,
} = require('../../controllers/auth/authControllers');
const AuthMiddleware = require('../../middleware/AuthMiddleware');

const router = require('express').Router();

// register
router.post('/register', registerController);
router.post('/login', loginControllers);
router.get('/profile', AuthMiddleware, profileControllers);

module.exports = router;
