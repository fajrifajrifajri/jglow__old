const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const produkKategoriSchema = new Schema({
	nama_kategori: { type: String, required: true },
}, 
	{
		timestamps: true,
	}
);

const ProdukKategori = mongoose.model('ProdukKategori', produkKategoriSchema);

module.exports = ProdukKategori;