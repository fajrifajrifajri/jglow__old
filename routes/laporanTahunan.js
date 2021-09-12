const router = require('express').Router();
const Konsultasi = require('../models/konsultasi.model');
const Order = require('../models/order.model');
const dayjs = require('dayjs')
const startOfMonth = dayjs().startOf('month').$d;

router.route('/konsultasi').get((req, res) => {
	Konsultasi.aggregate([
		// Greater than start of the week (Sunday)
		{ $match: { created_at: { $gt: startOfMonth } } }
	]).then(laporanHarian => res.json(laporanHarian))
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/order').get((req, res) => {
	Order.aggregate([
		// Greater than start of the week (Sunday)
		{ $match: { created_at: { $gt: startOfMonth } } },
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
	]).then(laporanHarian => res.json(laporanHarian))
	.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;