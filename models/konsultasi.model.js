const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const konsultasiSchema = new Schema({
	nama: { type: String, required: true },
	tanggalLahir: { type: Date, required: true },
	selectedKelamin: { type: String, required: true },
	alamat: { type: String, required: true },
	noTelp: { type: String, required: true },
	jenisKulit: { type: String, required: true },
	kulitSensitif: { type: String, required: true },
	mudahIritasi: { type: String, required: true },
	hamilDanMenyusui: { type: String, required: true },
	riwayatSkincare: { type: String, required: true },
	kondisiKeluhan: { type: String, required: true },
	penggunaanKe: { type: String, required: true },
	fotoAgent: { type: String, required: true },
	fotoKulitWajahDepan: { type: String, required: true },
	fotoKulitWajahKiri: { type: String, required: true },
	fotoKulitWajahKanan: { type: String, required: true },
	noAgent: { type: String, required: true },
},  
	{
		timestamps: true,
	}
);

const Konsultasi = mongoose.model('Konsultasi', konsultasiSchema);

module.exports = Konsultasi;