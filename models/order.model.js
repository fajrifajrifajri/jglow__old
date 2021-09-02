const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
	nama: { type: String, required: true },
	alamat: { type: String, required: true },
	noTelp: { type: String, required: true },
	noAgent: { type: String, required: true },
	// orderProduct: [{ type: Schema.ObjectId, required: true, ref: 'Produk' }], (isMulti)
	orderProduct: { type: Schema.ObjectId, required: true, ref: 'Produk' },
	jumlahOrder: { type: Number, required: true },
	optionPengiriman: { type: String, required: true },
}, 
	{
		timestamps: true,
	}
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;