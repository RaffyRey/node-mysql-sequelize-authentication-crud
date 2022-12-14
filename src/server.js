require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const ErrorHandler = require('./middleware/ErrorHandler');
const router = require('./routes/auth/authRoutes');
const AppError = require('./middleware/AppError');
const sequelize = require('./config/db');
const postRouter = require('./routes/post/postRoutes');

// app
let app = express();

// port
let port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// routes
app.use('/v1/api/auth', router);
app.use('/v1/api/posts', postRouter);

// middleware for 400 bad request
app.all('*', (req, res, next) => {
	next(new AppError(`The URL ${req.originalUrl}, does not exist`, 404));
});

// middleware for 500 bad request
app.use(ErrorHandler);

// sequelize
sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch((error) => {
		console.error('Unable to connect to the database: ', error);
	});

// port listener
app.listen(port, () => console.log(`Listening to port ${port}`));
