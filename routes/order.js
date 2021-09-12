const router = require('express').Router();
let Order = require('../models/order.model');

router.route('/').get((req, res) => {
	Order.aggregate([
	{
		$lookup: {
		   from: 'produks',
		   localField: 'kode_produk',
		   foreignField: '_id',
		   as: 'produk'
		}
	},
	{
		$addFields: {
          "nama_produk": "$produk.nama_produk"
		}
	}
	])
		.then(order => res.json(order))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/agent/:kodeAgent').get((req, res) => {
	Order.aggregate([
	{
		$match: { 'kodeAgent': req.params.kodeAgent }
	},
	{
		$lookup: {
		   from: 'produks',
		   localField: 'kode_produk',
		   foreignField: '_id',
		   as: 'produk'
		}
	},
	{
		$addFields: {
          "nama_produk": "$produk.nama_produk"
		}
	}
	])
		.then(order => res.json(order))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', (req, res) => {
	console.log(req.body)
	
	const nama_depan = req.body.namaDepan;
	const nama_belakang = req.body.namaBelakang;
	const alamat = req.body.alamat;
	const no_telp = req.body.noTelp;
	const kode_agent = req.body.kodeAgent;
	// const kode_produk = req.body.orderProduct.value; (isMulti)
	const kode_produk = req.body.kodeProduk.value;
	const jumlah_order = Number(req.body.jumlahOrder);
	const option_pengiriman = req.body.optionPengiriman;

	const newOrder = new Order({
		nama_depan,
		nama_belakang,
		alamat,
		no_telp,
		kode_agent,
		kode_produk,
		jumlah_order,
		option_pengiriman
	});
	
	newOrder.save()
		.then(() => res.json('Order ditambahkan!'))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
	Order.findById(req.params.id)
	.then(order => res.json(order))
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
	Order.findByIdAndDelete(req.params.id)
	.then(() => res.json('Order dihapus.'))
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
	Order.findById(req.params.id)
	.then(order => {
		order.nama = req.body.nama;
		order.alamat = req.body.alamat;
		order.noTelp = Number(req.body.noTelp);
		order.noAgent = Number(req.body.noAgent);
		order.orderProduct = req.body.orderProduct;
		order.jumlahOrder =  Number(req.body.jumlahOrder);
		order.optionPengiriman = req.body.optionPengiriman;
		
	order.save()
		.then(() => res.json('Order telah diupdate!'))
		.catch(err => res.status(400).json('Error: ' + err));
	})
});

module.exports = router;