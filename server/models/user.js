const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	username: {
		type: String,
		required: [true, 'Username must not be blank!'],
		unique: [true, 'This username is taken!'],
	},
	password: {
		type: String,
		required: [true, 'Password must not be blank!'],
	},
});

module.exports = mongoose.model('User', userSchema);
