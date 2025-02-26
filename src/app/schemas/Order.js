import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
	{
		user: {
			id: {
				type: String,
				required: true,
			},
			name: {
				type: String,
				required: true,
			},
		},

		products: [
			{
				id: {
					type: Number,
					requerid: true,
				},
				name: {
					type: String,
					requerid: true,
				},
				price: {
					type: Number,
					requerid: true,
				},
				category: {
					type: String,
					requerid: true,
				},
				url: {
					type: String,
					requerid: true,
				},
				quantity: {
					type: String,
					requerid: true,
				},
			},
		],

		status: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('Order', OrderSchema);
