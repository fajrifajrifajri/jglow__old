const router = require('express').Router();
const path = require("path");
let Konsultasi = require('../models/konsultasi.model');
const multer = require("multer");
const fs = require('fs-extra');

router.route('/').get((req, res) => {
	Konsultasi.find()
		.then(konsultasi => res.json(konsultasi))
		.catch(err => res.status(400).json('Error: ' + err));
});

// File Foto
const storage = multer.diskStorage({
// destination: "../public/",
   destination: function (req, file, cb) {
	let path = "../public/";
	fs.mkdirsSync(path);
	},
	filename: function(req, file, cb){
      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
   }
});

const uploadFoto = multer({
   storage: storage,
   limits:{fileSize: 1000000}
})

router.post('/add', uploadFoto.fields([{ name: 'fotoAgent', maxCount: 1 }, { name: 'fotoKulit', maxCount:1 }]), (req, res) => {
	   
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
	const fotoAgent = req.files.fotoAgent[0].filename;
	const fotoKulit = req.files.fotoKulit[0].filename;
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
		fotoKulit,
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
		konsultasi.fotoKulit = req.body.fotoKulit;
		
	konsultasi.save()
		.then(() => res.json('Konsultasi telah diupdate!'))
		.catch(err => res.status(400).json('Error: ' + err));
	})
});

module.exports = router;