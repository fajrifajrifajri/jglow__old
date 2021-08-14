const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const produkSchema = new Schema({
	nama_produk: { type: String, required: true },
	harga: { type: String, required: true },
	stok: { type: String, required: true },
	kategori_id: { type: String, required: true },
}, 
	{
		timestamps: true,
	}
);

const Produk = mongoose.model('Produk', produkSchema);

module.exports = Produk;