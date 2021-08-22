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
	
	const nama = req.body.nama;
	const tanggalLahir = Date.parse(req.body.tanggalLahir);
	const selectedKelamin = req.body.selectedKelamin;
	const alamat = req.body.alamat;
	const noTelp = req.body.noTelp;
	const jenisKulit = req.body.jenisKulit;
	const kulitSensitif = req.body.kulitSensitif;
	const mudahIritasi = req.body.mudahIritasi;
	const hamilDanMenyusui = req.body.hamilDanMenyusui;
	const riwayatSkincare = req.body.riwayatSkincare;
	const kondisiKeluhan = req.body.kondisiKeluhan;
	const penggunaanKe = req.body.penggunaanKe;
	const fotoAgent = req.files.fotoAgent[0].key;
	const fotoKulitWajahDepan = req.files.fotoKulitWajahDepan[0].key;
	const fotoKulitWajahKiri = req.files.fotoKulitWajahKiri[0].key;
	const fotoKulitWajahKanan = req.files.fotoKulitWajahKanan[0].key;
	const noAgent = req.body.noAgent;
	
	console.log(fotoAgent);

	const newKonsultasi = new Konsultasi({
		nama,
		tanggalLahir,
		selectedKelamin,
		alamat,
		noTelp,
		jenisKulit,
		kulitSensitif,
		mudahIritasi,
		hamilDanMenyusui,
		riwayatSkincare,
		kondisiKeluhan,
		penggunaanKe,
		noAgent,
		fotoAgent,
		fotoKulitWajahDepan,
		fotoKulitWajahKiri,
		fotoKulitWajahKanan,
	});
	
	//console.log(newKonsultasi);
	
	newKonsultasi.save()
		.then(() => res.json('Konsultasi ditambahkan!'))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
	Konsultasi.findById(req.params.id)
	.then(konsultasi => res.json(konsultasi))
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
	Konsultasi.findByIdAndDelete(req.params.id)
	.then(() => res.json('Konsultasi dihapus.'))
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
	Konsultasi.findById(req.params.id)
	.then(konsultasi => {
		konsultasi.nama = req.body.nama;
		konsultasi.tanggalLahir = Date.parse(req.body.tanggalLahir);
		konsultasi.alamat = req.body.alamat;
		konsultasi.noTelp = Number(req.body.noTelp);
		konsultasi.noAgent = Number(req.body.noAgent);
		konsultasi.spesifikasiKulit = req.body.spesifikasiKulit;
		konsultasi.kondisi = req.body.kondisi;
		konsultasi.fotoAgent = req.body.fotoAgent;
		konsultasi.fotoKulitWajahDepan = req.body.fotoKulitWajahDepan;
		konsultasi.fotoKulitWajahKiri = req.body.fotoKulitWajahKiri;
		konsultasi.fotoKulitWajahKanan = req.body.fotoKulitWajahKanan;
		
	konsultasi.save()
		.then(() => res.json('Konsultasi telah diupdate!'))
		.catch(err => res.status(400).json('Error: ' + err));
	})
});

module.exports = router;