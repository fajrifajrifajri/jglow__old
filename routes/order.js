const router = require('express').Router();
let Order = require('../models/order.model');

router.route('/').get((req, res) => {
	Order.find()
		.then(order => res.json(order))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', (req, res) => {
	console.log(req.body)
	
	const nama = req.body.nama;
	const alamat = req.body.alamat;
	const noTelp = req.body.noTelp;
	const noAgent = req.body.noAgent;
	const orderProduct = req.body.orderProduct;
	const jumlahOrder = Number(req.body.jumlahOrder);
	const optionPengiriman = req.body.optionPengiriman;

	const newOrder = new Order({
		nama,
		alamat,
		noTelp,
		noAgent,
		orderProduct,
		jumlahOrder,
		optionPengiriman
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