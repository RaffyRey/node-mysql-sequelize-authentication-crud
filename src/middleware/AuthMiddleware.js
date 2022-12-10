const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const AuthMiddleware = asyncHandler(async (req, res, next) => {
	let token;

	if (req.headers.authorization?.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1];

			const verify = jwt.verify(token, process.env.SECRET_KEY);

			req.user = verify;
			next();
		} catch (error) {
			return res.status(401).json({
				mggs: error,
			});
		}
	}

	if (!token)
		return res.status(401).json({ mssg: 'Not Authorized, no token provided' });
});

module.exports = AuthMiddleware;
