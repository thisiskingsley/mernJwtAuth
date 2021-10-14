const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const Product = require('./models/product');
const Farm = require('./models/farm');
const User = require('./models/user');

require('dotenv').config();

const db = process.env.MONGO_URI;

mongoose
	.connect(db, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log(err));

// prettier-ignore

//Body-Parser Middleware (for parsing <form> data from a POST request.)
//(May not need it in React)
app.use(express.urlencoded({extended: true}));
//Body-Parser (for parsing JSON data from a POST request)
app.use(express.json());
//Middleware that allows access to XMLHttpRequests,
//that is otherwise blocked by CORS(Cross-Origin Resource Sharing) policy.
app.use(
	cors({
		// below saves cookies to browser on localhost, make sure to add deployed website to this.
		origin: [/^http:\/\/localhost/],
		credentials: true,
	})
);
//Cookie-Parser
app.use(cookieParser());

//Middleware that checks to see if a user is logged in by
//checking for their token in the cookie
const auth = (req, res, next) => {
	// Read the token from the cookie
	const token = req.cookies.token;
	if (!token) return res.status(401).json({ msg: 'AUTHORIZATION DENIED' });
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded; // decoded is a token payload object: {id: , iat: , exp: }
		next();
	} catch (err) {
		console.log('error:', err);
		//Incase of expired jwt or invalid token kill the token and clear the cookie
		res.clearCookie('token');
		return res.status(400).send(err.message);
	}
};

//==================================================================
//FARM ROUTES:
//==================================================================

//INDEX ROUTE
app.get('/farms', async (req, res) => {
	const farms = await Farm.find({});
	res.send(farms);
});

//CREATE ROUTE
app.post('/farms', async (req, res) => {
	//Created a new farm
	const { name, city, email } = req.body;

	const newFarm = new Farm({
		name,
		city,
		email,
	});

	await newFarm.save();
	res.send(newFarm);
});

//SHOW ROUTE
app.get('/farms/:id', async (req, res) => {
	const { id } = req.params;
	const foundFarm = await Farm.findById(id).populate('products');
	res.send(foundFarm);
});

//CREATE ROUTE FOR ASSOCIATED PRODUCT
app.post('/farms/:id/products/', async (req, res) => {
	//Find specific farm
	const { id } = req.params;
	const foundFarm = await Farm.findById(id);
	//Created a new product for a specific farm
	const { productName, price, category } = req.body;

	const newProduct = new Product({
		name: productName,
		price,
		category,
	});

	//Push that new product into that specific Farm model's "products" array (models/farm.js)
	foundFarm.products.push(newProduct);
	//Associate that specific Farm to that new Product model's "farm" field (models/product.js)
	newProduct.farm = foundFarm;
	//save the updated information.
	await foundFarm.save();
	await newProduct.save();
	res.send(foundFarm);
});

//DELETE ROUTE
app.delete('/farms/:id', async (req, res) => {
	const deletedFarm = await Farm.findByIdAndDelete(req.params.id);
	res.send(deletedFarm);
});

//==================================================================
//PRODUCT ROUTES:
//==================================================================

//INDEX ROUTE
app.get('/products', async (req, res) => {
	const products = await Product.find({});
	res.send(products);
});

//SHOW ROUTE
app.get('/products/:id', async (req, res) => {
	const { id } = req.params;
	const foundProduct = await Product.findById(id).populate('farm', 'name');
	res.send(foundProduct);
});

//CREATE ROUTE
app.post('/products', async (req, res) => {
	//Created a new product
	const { productName, price, category } = req.body;

	const newProduct = new Product({
		name: productName,
		price,
		category,
	});
	await newProduct.save();
	res.send(newProduct);
});

//UPDATE ROUTE
app.put('/products/:id', async (req, res) => {
	const { id } = req.params;
	const { productName, price, category } = req.body;

	const body = {
		name: productName,
		price,
		category,
	};

	const updatedProduct = await Product.findByIdAndUpdate(id, body, {
		new: true,
		runValidators: true,
	});

	res.send(updatedProduct);
});

//DELETE ROUTE
app.delete('/products/:id', async (req, res) => {
	const { id } = req.params;
	const deletedProduct = await Product.findByIdAndDelete(id);
	res.send(deletedProduct);
});

//==================================================================
//USER ROUTES:
//==================================================================
// @route: GET
// @description: fetch all users
// @access: Public
app.get('/users', async (req, res) => {
	const foundUsers = await User.find({});
	const userNames = [];
	foundUsers.forEach(user => userNames.push(user.username));
	res.send(userNames);
});

// @route: POST
// @description: Create a new user
// @access: Public
app.post('/users', async (req, res) => {
	const { username, password } = req.body;

	//Simple validation
	if (!username || !password) {
		return res.status(400).json({ msg: 'PLEASE ENTER ALL FIELDS' });
	}

	//Check for existing user.
	const foundUser = await User.findOne({ username });
	if (foundUser) return res.status(400).json({ msg: 'USER ALREADY EXISTS' });

	try {
		//Create new user and hash password.
		const hash = await bcrypt.hash(password, 12);
		const newUser = new User({
			username,
			password: hash,
		});
		await newUser.save();
		//Create a token for new user.
		const token = await jwt.sign(
			{ id: newUser._id }, //the payload (which is the user id)
			process.env.JWT_SECRET, //the secret
			{
				expiresIn: 3600, // Expiration option expressed in seconds (1 hour)
			}
		);
		//Store token in a cookie (safer than on local storage)
		res.cookie('token', token, {
			httpOnly: true, //this cookie cannot be accessed through client-side scripting. Just extra security.
			// secure: true, //this cookie can only be configured over HTTPS(secure) vs HTTP.
			expires: Date.now() + 1000 * 60 * 60, // this cookie expires in 1 hour (3,600,000 milliseconds)
			maxAge: 1000 * 60 * 60, //this cookie can only be 1 hour old. (takes priority over expires)
		});

		res.json(newUser.username);
	} catch (err) {
		console.log(err);
	}
});

// @route: POST
// @description: User Login Authentication
// @access: Public
app.post('/auth', async (req, res) => {
	const { username, password } = req.body;

	//Simple validation
	if (!username || !password) {
		return res.status(400).json({ msg: 'PLEASE ENTER ALL FIELDS' });
	}

	//Check if user exists
	const foundUser = await User.findOne({ username });
	if (!foundUser) return res.status(400).json({ msg: 'USER DOES NOT EXIST' });

	try {
		const matchedPassword = await bcrypt.compare(password, foundUser.password);
		if (matchedPassword) {
			//Create a token for new user.
			const token = await jwt.sign(
				{ id: foundUser._id }, //the payload (which is the user id)
				process.env.JWT_SECRET, //the secret
				{
					expiresIn: 3600, // Expiration option expressed in seconds (1 hour)
				}
			);
			//Store token in a cookie (safer than on local storage)
			res.cookie('token', token, {
				httpOnly: true, //this cookie cannot be accessed through client-side scripting. Just extra security.
				// secure: true, //this cookie can only be configured over HTTPS(secure) vs HTTP.
				expires: Date.now() + 1000 * 60 * 60, // this cookie expires in 1 hour (3,600,000 milliseconds)
				maxAge: 1000 * 60 * 60, //this cookie can only be 1 hour old. (takes priority over expires)
			});

			res.json(foundUser.username);
		} else {
			// throw new Error('Invalid Credentials');
			return res.status(401).json({ msg: 'INVALID CREDENTIALS' });
		}
	} catch (err) {
		console.log(err);
		res.redirect('/');
	}
});

// @route: GET api/auth/user
// @desc: Get specific user data (for LOAD_USER: with every request we make, we want to try to load the user)
// @access: Private
app.get('/auth/user', auth, async (req, res) => {
	User.findById(req.user.id).then(user => res.json(user.username));
});

// @route: POST
// @description: Log out User
// @access: Public
app.post('/logout', (req, res) => {
	try {
		res.clearCookie('token'); // clears cookie named token
		res.json({ msg: 'Successfully logged out!' });
	} catch (err) {
		console.log(err);
	}
});

//==================================================================
//RUN SERVER:
//==================================================================
const port = process.env.PORT || 3001;

app.listen(port, () => {
	console.log(`APP IS LISTENING ON PORT ${port}`);
});
