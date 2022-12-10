const {
	getUserPostsController,
	getUserPostController,
	createUserPostController,
} = require('../../controllers/post/postControllers');
const AuthMiddleware = require('../../middleware/AuthMiddleware');
const postRouter = require('express').Router();

postRouter.get('/', AuthMiddleware, getUserPostsController);
postRouter.get('/:post_id', AuthMiddleware, getUserPostController);
postRouter.post('/create', AuthMiddleware, createUserPostController);

module.exports = postRouter;
