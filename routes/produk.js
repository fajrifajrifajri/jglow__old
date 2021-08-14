const router = require('express').Router();
let Produk = require('../models/produk.model');

router.route('/').get((req, res) => {
	Produk.find()
		.then(produk => res.json(produk))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', (req, res) => {
	console.log(req.body)
	
	const nama_produk = req.body.namaProduk;
	const harga = req.body.harga;
	const stok = req.body.stok;
	const kategori_id = req.body.kategoriId;

	const newProduk = new Produk({
		nama_produk,
		harga,
		stok,
		kategori_id,
	});
	
	newProduk.save()
		.then(() => res.json('Produk ditambahkan!'))
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