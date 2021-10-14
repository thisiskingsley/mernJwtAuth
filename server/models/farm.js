const mongoose = require('mongoose');
const Product = require('./product');
const { Schema } = mongoose;

const farmSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Farm must have a name!'],
	},
	city: {
		type: String,
	},
	email: {
		type: String,
		required: [true, 'Email required'],
	},
	products: [
		//An array of associated Products from the product.js model
		{
			type: Schema.Types.ObjectId,
			ref: 'Product',
		},
	],
});

//This middleware is for deleting the products that are associated to the Farm we are also deleting AFTER (.post) we hit our "Delete Route" set up in server.js.
//We're able to use this middleware, because we used the .findByIdAndDelete() method in the "Delete Route."
farmSchema.post('findOneAndDelete', async function (farm) {
	//if there are products in the deleted farm
	if (farm.products.length) {
		//delete all products where there _id is "in" ($in) the products array for the farm that we just deleted.
		const res = await Product.deleteMany({ _id: { $in: farm.products } });
	}
});

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;
