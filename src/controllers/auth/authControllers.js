const User = require('../../models/user-model/userModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const generateToken = require('../../utils/generateToken');

// registser user controllers
const registerController = asyncHandler(async (req, res) => {
	const { lastname, firstname, username, email, password } = req.body;

	if (!lastname || !firstname || !username || !email || !password) {
		return res.status(400).json({
			mssg: 'Fill out all the required data!',
		});
	}

	// bcryptjs
	const salt = bcrypt.genSaltSync(8);
	const hashedPassword = bcrypt.hashSync(password, salt);

	// create user
	let user = {
		// role: role,
		lastname: lastname,
		firstname: firstname,
		username: username,
		email: email,
		password: hashedPassword,
	};

	const usernameExist = await User.findOne({ where: { username: username } });

	if (usernameExist === null) {
		User.create(user)
			.then((data) => {
				res.json(data);
			})
			.catch((err) => {
				res.status(500).json({
					mssg: err,
				});
			});
	} else {
		return res.status(401).json({
			mssg: 'Username already taken!',
		});
	}
});

// login controllers
const loginControllers = asyncHandler(async (req, res) => {
	let { username, password } = req.body;

	// check username
	const userExist = await User.findOne({
		where: { username: username },
	});

	if (userExist) {
		let password_valid = bcrypt.compareSync(password, userExist.password);

		if (password_valid) {
			let user = await User.findOne({
				where: { username: username },
			});

			const token = generateToken(user);
			return res.status(200).json({
				token: token,
			});
		} else {
			return res.status(400).json({ error: 'Password Incorrect' });
		}
	} else {
		return res.status(400).json({
			error: 'User not Found!',
		});
	}
});

const profileControllers = asyncHandler(async (req, res) => {
	let user = await User.findOne({
		where: { user_id: req.user.data?.user_id },
		attributes: { exclude: ['password'] },
	});

	if (user === null) {
		return res.status(404).json({ msg: 'User not found' });
	} else {
		return res.status(200).json(user);
	}
});

module.exports = {
	registerController,
	loginControllers,
	profileControllers,
};
