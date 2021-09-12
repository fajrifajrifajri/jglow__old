const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
		nama_depan: { type: String, required: true },
		nama_belakang: { type: String, required: true },
		alamat: { type: String, required: true },
		no_telp: { type: String, required: true },
		kode_agent: { type: String, required: true },
		// kode_produk: [{ type: Schema.ObjectId, required: true, ref: 'Produk' }], (isMulti)
		kode_produk: { type: Schema.ObjectId, ref: 'Produk' },
		jumlah_order: { type: Number },
		option_pengiriman: { type: String },
	}, 
	{ 
		timestamps: { 
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;