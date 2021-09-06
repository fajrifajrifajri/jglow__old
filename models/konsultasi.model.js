const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const konsultasiSchema = new Schema({
	nama_depan: { type: String, required: true },
	nama_belakang: { type: String },
	tanggal_lahir: { type: Date, required: true },
	selected_kelamin: { type: String, required: true },
	alamat: { type: String, required: true },
	no_telp: { type: String, required: true },
	jenis_kulit: { type: String, required: true },
	kulit_sensitif: { type: String, required: true },
	mudah_iritasi: { type: String, required: true },
	hamil_dan_menyusui: { type: String, required: true },
	riwayat_skincare: { type: String, required: true },
	kondisi_keluhan: { type: String, required: true },
	penggunaan_ke: { type: String, required: true },
	kode_agent: { type: String, required: true },
	foto_agent: { type: String },
	foto_kulit_wajah_depan: { type: String},
	foto_kulit_wajah_kiri: { type: String },
	foto_kulit_wajah_kanan: { type: String },
},  
	{
		timestamps: true,
	}
);

const Konsultasi = mongoose.model('Konsultasi', konsultasiSchema);

module.exports = Konsultasi;