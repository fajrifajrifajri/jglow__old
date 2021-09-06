const router = require('express').Router();
const path = require("path");
let Konsultasi = require('../models/konsultasi.model');
const multer = require("multer");
const multerS3 = require("multer-s3");
// const fs = require('fs-extra');
// AWS
const aws = require('aws-sdk');

// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint('sgp1.digitaloceanspaces.com/');
const s3 = new aws.S3({
	endpoint: spacesEndpoint
});

// Change bucket property to your Space name
const uploadFile = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'jglow',
    acl: 'public-read',
    key: function (request, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
		cb(null,"Foto/IMAGE-" + uniqueSuffix + path.extname(file.originalname));
    }
  })
});

/*
// File Foto
const storage = multer.diskStorage({
	destination: "./client/public/",
	
	
	// destination: function (req, file, cb) {
	//	let path = "./client/public/";
	//	fs.mkdirsSync(path);
	//}, 
	//

	filename: function(req, file, cb){
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
		cb(null,"IMAGE-" + uniqueSuffix + path.extname(file.originalname));
   }
});

const uploadFoto = multer({
   storage: storage,
   limits:{fileSize: 1000000}
})
*/

router.route('/').get((req, res) => {
	Konsultasi.find()
		.then(konsultasi => res.json(konsultasi))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', uploadFile.fields([{ name: 'fotoAgent', maxCount: 1 }, { name: 'fotoKulitWajahDepan', maxCount:1 }, { name: 'fotoKulitWajahKiri', maxCount:1 }, { name: 'fotoKulitWajahKanan', maxCount:1 }]), (req, res) => {
	   
	//console.log("Request ---", req.body);
	console.log("Request file ---", req.files);//Here you get file.
	
	console.log("Request body ---", req.body);
	
	const nama_depan = req.body.namaDepan;
	const nama_belakang = req.body.namaBelakang;
	const tanggal_lahir = Date.parse(req.body.tanggalLahir);
	const selected_kelamin = req.body.selectedKelamin;
	const alamat = req.body.alamat;
	const no_telp = req.body.noTelp;
	const jenis_kulit = req.body.jenisKulit;
	const kulit_sensitif = req.body.kulitSensitif;
	const mudah_iritasi = req.body.mudahIritasi;
	const hamil_dan_menyusui = req.body.hamilDanMenyusui;
	const riwayat_skincare = req.body.riwayatSkincare;
	const kondisi_keluhan = req.body.kondisiKeluhan;
	const penggunaan_ke = req.body.penggunaanKe;
	const kode_agent = req.body.kodeAgent;
	const foto_agent = req.files.fotoAgent[0].key;
	const foto_kulit_wajah_depan = req.files.fotoKulitWajahDepan[0].key;
	const foto_kulit_wajah_kiri = req.files.fotoKulitWajahKiri[0].key;
	const foto_kulit_wajah_kanan = req.files.fotoKulitWajahKanan[0].key;
	
	console.log(foto_agent);

	const newKonsultasi = new Konsultasi({
		nama_depan,
		nama_belakang,
		tanggal_lahir,
		selected_kelamin,
		alamat,
		no_telp,
		jenis_kulit,
		kulit_sensitif,
		mudah_iritasi,
		hamil_dan_menyusui,
		riwayat_skincare,
		kondisi_keluhan,
		penggunaan_ke,
		kode_agent,
		foto_agent,
		foto_kulit_wajah_depan,
		foto_kulit_wajah_kiri,
		foto_kulit_wajah_kanan,
	});
	
	newKonsultasi.save()
		.then(() => res.json('Konsultasi ditambahkan!'))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
	console.log(req.params.id);
	Konsultasi.findById(req.params.id)
	.then(konsultasi => {
		res.json(konsultasi); 
		console.log(konsultasi)
	})
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/agent/:kodeAgent').get((req, res) => {
	console.log(req.params.kodeAgent);
	Konsultasi.find( { kode_agent: req.params.kodeAgent } )
	.then(konsultasi => {
		res.json(konsultasi); 
		console.log(konsultasi)
	})
	.catch(err => res.status(400).json('Error: ' + err));
});

router.post('/update/:id', uploadFile.fields([{ name: 'fotoAgent', maxCount: 1 }, { name: 'fotoKulitWajahDepan', maxCount:1 }, { name: 'fotoKulitWajahKiri', maxCount:1 }, { name: 'fotoKulitWajahKanan', maxCount:1 }]), (req, res) => {
	Konsultasi.findById(req.params.id)
	.then(konsultasi => {
		console.log("Request file ---", req.files);
		
		konsultasi.nama_depan = req.body.namaDepan;
		konsultasi.nama_belakang = req.body.namaBelakang;
		konsultasi.tanggal_lahir = Date.parse(req.body.tanggalLahir);
		konsultasi.selected_kelamin = req.body.selectedKelamin;
		konsultasi.alamat = req.body.alamat;
		konsultasi.no_telp = req.body.noTelp;
		konsultasi.jenis_kulit = req.body.jenisKulit;
		konsultasi.kulit_sensitif = req.body.kulitSensitif;
		konsultasi.mudah_iritasi = req.body.mudahIritasi;
		konsultasi.hamil_dan_menyusui = req.body.hamilDanMenyusui;
		konsultasi.riwayat_skincare = req.body.riwayatSkincare;
		konsultasi.kondisi_keluhan = req.body.kondisiKeluhan;
		konsultasi.penggunaan_ke = req.body.penggunaanKe;
		konsultasi.kode_agent = req.body.kodeAgent;
		konsultasi.foto_agent = req.files.fotoAgent[0].key;
		konsultasi.foto_kulit_wajah_depan = req.files.fotoKulitWajahDepan[0].key;
		konsultasi.foto_kulit_wajah_kiri = req.files.fotoKulitWajahKiri[0].key;
		konsultasi.foto_kulit_wajah_kanan = req.files.fotoKulitWajahKanan[0].key;
		
	konsultasi.save()
		.then(() => res.json('Konsultasi telah diupdate!'))
		.catch(err => res.status(400).json('Error: ' + err));
	})
});

router.route('/:id').delete((req, res) => {
	Konsultasi.findByIdAndDelete(req.params.id)
	.then(() => res.json('Konsultasi dihapus.'))
	.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;