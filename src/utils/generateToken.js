const jwt = require('jsonwebtoken');
// generate token
const generateToken = (data) => {
	return jwt.sign({ data }, process.env.SECRET_KEY, {
		expiresIn: '30d',
	});
};

module.exports = generateToken;
