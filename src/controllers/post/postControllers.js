const Post = require('../../models/post-model/postModel');
const asyncHandler = require('express-async-handler');

// get all user post
const getUserPostsController = asyncHandler(async (req, res) => {
	let user_posts = await Post.findAll({
		where: { user_id: req.user.data?.user_id },
	});

	let post_length = user_posts.length;

	if (post_length === 0) {
		return res.status(400).json({
			mssg: 'No posts available!',
		});
	} else {
		return res.status(200).json({
			user_posts,
		});
	}
});

// get single post
const getUserPostController = asyncHandler(async (req, res) => {
	let getUserPost = await Post.findOne({
		where: { user_id: req.user.data?.user_id, post_id: req.params.post_id },
	});

	if (getUserPost === null) {
		return res.status(400).json({
			mssg: 'No posts available!',
		});
	} else {
		return res.status(200).json({
			getUserPost,
		});
	}
});

// create a post
const createUserPostController = asyncHandler(async (req, res) => {
	const { title, detail } = req.body;

	if (!title || !detail) {
		return res.status(400).json({
			mssg: 'Fill all the required fields',
		});
	}

	let post = {
		user_id: req.user.data?.user_id,
		title: title,
		detail: detail,
	};

	Post.create(post)
		.then((data) => {
			return res.status(200).json(data);
		})
		.catch((err) => {
			return res.status(500).json({
				mssg: err,
			});
		});
});

module.exports = {
	getUserPostsController,
	getUserPostController,
	createUserPostController,
};
