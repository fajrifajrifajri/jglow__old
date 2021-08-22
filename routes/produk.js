const router = require('express').Router();
const path = require("path");
let Produk = require('../models/produk.model');
let ProdukKategori = require('../models/produkKategori.model');
const multer = require("multer");
const multerS3 = require("multer-S3");
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
		cb(null,"Gambar Produk/IMAGE-" + uniqueSuffix + path.extname(file.originalname));
    }
  })
});

router.route('/').get((req, res) => {
	Produk.find()
		.then(produk => res.json(produk))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/kategori').get((req, res) => {
	ProdukKategori.find()
		.then(produkKategori => res.json(produkKategori))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', uploadFile.single('gambarProduk'), (req, res) => {
	console.log("Request body ---", req.body)
	
	console.log("Request file ---", req.file);//Here you get file.
	
	const nama_produk = req.body.namaProduk;
	const harga = req.body.harga;
	const stok = req.body.stok;
	const kategori_id = req.body.kategoriId;
	const foto = req.file.key;

	const newProduk = new Produk({
		nama_produk,
		harga,
		stok,
		kategori_id,
		foto
	});
	
	newProduk.save()
		.then(() => res.json('Produk ditambahkan!'))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add-kategori', (req, res) => {
	console.log(req.body)
	
	const nama_kategori = req.body.namaKategori;

	const newProdukKategori = new ProdukKategori({
		nama_kategori
	});
	
	newProdukKategori.save()
		.then(d => res.json({id: d._id}))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
	Produk.findById(req.params.id)
	.then(produk => res.json(produk))
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
	Produk.findByIdAndDelete(req.params.id)
	.then(() => res.json('Produk dihapus.'))
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
	Produk.findById(req.params.id)
	.then(produk => {
		produk.nama_produk = req.body.namaProduk;
		produk.harga = Number(req.body.harga);
		produk.stok = Number(req.body.stok);
		produk.kategori_id = req.body.kategori_id;
		
	produk.save()
		.then(() => res.json('Produk telah diupdate!'))
		.catch(err => res.status(400).json('Error: ' + err));
	})
});

module.exports = router;