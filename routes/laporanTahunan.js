const router = require('express').Router();
const Konsultasi = require('../models/konsultasi.model');
const Order = require('../models/order.model');
const dayjs = require('dayjs')
const week = dayjs().startOf('week');
const startOfWeek = week.$d;

router.route('/konsultasi').get((req, res) => {
	Konsultasi.aggregate([
		// Greater than start of the week (Sunday)
		{ $match: { createdAt: { $gt: startOfWeek } } }
	]).then(laporanHarian => res.json(laporanHarian))
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/order').get((req, res) => {
	Order.aggregate([
		// Greater than start of the week (Sunday)
		{ $match: { createdAt: { $gt: startOfWeek } } }
	]).then(laporanHarian => res.json(laporanHarian))
	.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;