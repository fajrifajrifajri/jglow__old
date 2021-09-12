const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const produkSchema = new Schema({
		nama_produk: { type: String, required: true },
		harga: { type: String, required: true },
		stok: { type: String, required: true },
		kategori_id: { type: Schema.ObjectId, required: true, ref: 'ProdukKategori' },
		foto: { type: String, required: true },
	}, 
	{ 
		timestamps: { 
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
);

const Produk = mongoose.model('Produk', produkSchema);

module.exports = Produk;