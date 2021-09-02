const router = require('express').Router();
const Order = require('../models/order.model');
const dayjs = require('dayjs')
const week = dayjs().startOf('week');
const startOfWeek = week.$d;
const lastWeek = week.subtract(1, 'week').$d;
const startOfMonth = dayjs().startOf('month').$d;

// Laporan "Penjualan semua produk minggu ini"
router.route('/minggu').get((req, res) => {
	Order.aggregate([
		// Greater than start of the week (Sunday)
		{ $match: { createdAt: { $gt: startOfWeek } } },
		// Relational database, looking for 'nama_produk'
		{ $lookup: {
			   from: 'produks',
			   localField: 'orderProduct',
			   foreignField: '_id',
			   as: 'produk'
			}
		},
		{ $project: {
			   orderProduct: "$produk.nama_produk",
			   hari: { $dayOfWeek: "$createdAt" }
			}
		},
		// Change '0' to Sunday, '1' to Monday, ...
		{ $project: {
			   orderProduct: "$orderProduct",
			   hariNumber: "$hari", // for sorting purpose
			   hari: { "$switch": {
					  "branches": [
						{
						  "case": { "$eq": ["$hari", 1] },
						  "then": "Minggu"
						},
						{
						  "case": { "$eq": ["$hari", 2] },
						  "then": "Senin"
						},
						{
						  "case": { "$eq": ["$hari", 3] },
						  "then": "Selasa"
						},
						{
						  "case": { "$eq": ["$hari", 4] },
						  "then": "Rabu"
						},
						{
						  "case": { "$eq": ["$hari", 5] },
						  "then": "Kamis"
						},
						{
						  "case": { "$eq": ["$hari", 6] },
						  "then": "Jumat"
						},
						{
						  "case": { "$eq": ["$hari", 7] },
						  "then": "Sabtu"
						}
					  ],
					  "default": "Unknown"
					}
			   }
			}
		},
		// Count each product for each day
		// https://stackoverflow.com/questions/25666187/mongodb-nested-group
		// First pipeline
		{ $group: {
				_id: { 
					produk: "$orderProduct",
					hari: "$hari",
					hariNumber: "$hariNumber"
				},
				count:{$sum:1}
			}
		},
		// Sort by day (start with Sunday)
		{
			$sort: {
				"_id.hariNumber": 1
			}
		},	
		// Second pipeline
		 { $group : { 
			  _id :  "$_id.produk",
			  data: { 
				  $push: { 
					  x:"$_id.hari",
					  y:"$count",
					  hariNumber: "$_id.hariNumber"
				  }
			  }
		   }
		 },	
		 // Rename '_id' to 'id' and change 'id' from array to string
		 { $project: {  
			  _id: 0,
			  id: { $reduce: {
					input: "$_id",
					initialValue: "",
					in: { $concat : ["$$value", "$$this"] }
				}
			  },
			  data: "$data",
		   }
		},
	]).then(laporanProduk => res.json(laporanProduk))
	.catch(err => res.status(400).json('Error: ' + err));
});

// Laporan "Penjualan semua produk minggu lalu"
router.route('/minggu-lalu').get((req, res) => {
	Order.aggregate([
		// Greater than start of the week (Sunday)
		{ $match: { createdAt: { $gt: lastWeek, $lt: startOfWeek } } },
		// Relational database, looking for 'nama_produk'
		{ $lookup: {
			   from: 'produks',
			   localField: 'orderProduct',
			   foreignField: '_id',
			   as: 'produk'
			}
		},
		{ $project: {
			   orderProduct: "$produk.nama_produk",
			   hari: { $dayOfWeek: "$createdAt" }
			}
		},
		// Change '0' to Sunday, '1' to Monday, ...
		{ $project: {
			   orderProduct: "$orderProduct",
			   hari: { "$switch": {
					  "branches": [
						{
						  "case": { "$eq": ["$hari", 1] },
						  "then": "Minggu"
						},
						{
						  "case": { "$eq": ["$hari", 2] },
						  "then": "Senin"
						},
						{
						  "case": { "$eq": ["$hari", 3] },
						  "then": "Selasa"
						},
						{
						  "case": { "$eq": ["$hari", 4] },
						  "then": "Rabu"
						},
						{
						  "case": { "$eq": ["$hari", 5] },
						  "then": "Kamis"
						},
						{
						  "case": { "$eq": ["$hari", 6] },
						  "then": "Jumat"
						},
						{
						  "case": { "$eq": ["$hari", 7] },
						  "then": "Sabtu"
						}
					  ],
					  "default": "Unknown"
					}
			   }
			}
		},
		// Count each product for each day
		// https://stackoverflow.com/questions/25666187/mongodb-nested-group
		// First pipeline
		{ $group: {
				_id: { 
					produk: "$orderProduct",
					hari: "$hari"
				},
				count:{$sum:1}
			}
		},
		// Sort by day (start with Sunday)
		{
			$sort: {
				"_id.hariNumber": 1
			}
		},	
		// Second pipeline
		 { $group : { 
			  _id :  "$_id.produk",
			  data: { 
				  $push: { 
					  x:"$_id.hari",
					  y:"$count"
				  }
			  }
		   }
		 },
		 // Rename '_id' to 'id' and change 'id' from array to string
		 { $project: {  
			  _id: 0,
			  id: { $reduce: {
					input: "$_id",
					initialValue: "",
					in: { $concat : ["$$value", "$$this"] }
				}
			  },
			  data: "$data"
		   }
		}
	]).then(laporanProduk => res.json(laporanProduk))
	.catch(err => res.status(400).json('Error: ' + err));
});



// Laporan "Penjualan semua produk {bulan ini}"
router.route('/bulan').get((req, res) => {
	Order.aggregate([
		// Greater than start of the week (Sunday)
		{ $match: { createdAt: { $gt: startOfMonth } } },
		// Relational database, looking for 'nama_produk'
		{ $lookup: {
			   from: 'produks',
			   localField: 'orderProduct',
			   foreignField: '_id',
			   as: 'produk'
			}
		},
		{ $project: {
			   orderProduct: "$produk.nama_produk",
			   hari: { $dayOfMonth: "$createdAt" }
			}
		},	
		// Count each product for each day
		// https://stackoverflow.com/questions/25666187/mongodb-nested-group
		// First pipeline
		{ $group: {
				_id: { 
					produk: "$orderProduct",
					hari: "$hari"
				},
				count:{$sum:1}
			}
		},
		// Sort by day (start with Sunday)
		{
			$sort: {
				"_id.hari": 1
			}
		},	
		// Second pipeline
		 { $group : { 
			  _id :  "$_id.produk",
			  data: { 
				  $push: { 
					  x:"$_id.hari",
					  y:"$count"
				  }
			  }
		   }
		 },
		 // Rename '_id' to 'id' and change 'id' from array to string
		 { $project: {  
			  _id: 0,
			  id: { $reduce: {
					input: "$_id",
					initialValue: "",
					in: { $concat : ["$$value", "$$this"] }
				}
			  },
			  data: "$data"
		   }
		}
	]).then(laporanProduk => res.json(laporanProduk))
	.catch(err => res.status(400).json('Error: ' + err));
});

// Laporan "Penjualan berdasarkan kategori minggu ini"
router.route('/kategori-minggu').get((req, res) => {
	
	Order.aggregate([
		// Greater than start of the week (Sunday)
		{ $match: { createdAt: { $gt: startOfWeek } } },
		// Relational database, looking for 'nama_produk'
		{ $lookup: {
			   from: 'produks',
			   localField: 'orderProduct',
			   foreignField: '_id',
			   as: 'produk'
			}
		},
		{ $project: {
			   orderProduct: "$produk.nama_produk"
			}
		},
		// Count each product for each day
		// https://stackoverflow.com/questions/25666187/mongodb-nested-group
		// First pipeline
		{ $group: {
			_id: "$orderProduct",
			count:{$sum:1}
			}
		},
		 // Rename '_id' to 'id' and change 'id' from array to string
		 { $project: {  
			  _id: 0,
			  id: { $reduce: {
					input: "$_id",
					initialValue: "",
					in: { $concat : ["$$value", "$$this"] }
				}
			  },
			  value: "$count"
		   }
		},
		 // Add 'label' fieldname
		{ $addFields: {  
			label: "$id"
			}
		}
			
	]).then(laporanProduk => res.json(laporanProduk))
	.catch(err => res.status(400).json('Error: ' + err));
});


// Laporan "Penjualan berdasarkan kategori minggu ini"
router.route('/kategori-minggu-lalu').get((req, res) => {
	
	Order.aggregate([
		// Greater than start of the week (Sunday)
		{ $match: { createdAt: { $gt: lastWeek, $lt: startOfWeek } } },
		// Relational database, looking for 'nama_produk'
		{ $lookup: {
			   from: 'produks',
			   localField: 'orderProduct',
			   foreignField: '_id',
			   as: 'produk'
			}
		},
		{ $project: {
			   orderProduct: "$produk.nama_produk"
			}
		},
		// Count each product for each day
		// https://stackoverflow.com/questions/25666187/mongodb-nested-group
		// First pipeline
		{ $group: {
			_id: "$orderProduct",
			count:{$sum:1}
			}
		},
		 // Rename '_id' to 'id' and change 'id' from array to string
		 { $project: {  
			  _id: 0,
			  id: { $reduce: {
					input: "$_id",
					initialValue: "",
					in: { $concat : ["$$value", "$$this"] }
				}
			  },
			  value: "$count"
		   }
		},
		 // Add 'label' fieldname
		{ $addFields: {  
			label: "$id"
			}
		}
			
	]).then(laporanProduk => res.json(laporanProduk))
	.catch(err => res.status(400).json('Error: ' + err));
});


// Laporan "Penjualan berdasarkan kategori minggu lalu"
router.route('/kategori-bulan').get((req, res) => {
	
	Order.aggregate([
		// Greater than start of the week (Sunday)
		{ $match: { createdAt: { $gt: startOfMonth } } },
		// Relational database, looking for 'nama_produk'
		{ $lookup: {
			   from: 'produks',
			   localField: 'orderProduct',
			   foreignField: '_id',
			   as: 'produk'
			}
		},
		{ $project: {
			   orderProduct: "$produk.nama_produk"
			}
		},
		// Count each product for each day
		// https://stackoverflow.com/questions/25666187/mongodb-nested-group
		// First pipeline
		{ $group: {
			_id: "$orderProduct",
			count:{$sum:1}
			}
		},
		 // Rename '_id' to 'id' and change 'id' from array to string
		 { $project: {  
			  _id: 0,
			  id: { $reduce: {
					input: "$_id",
					initialValue: "",
					in: { $concat : ["$$value", "$$this"] }
				}
			  },
			  value: "$count"
		   }
		},
		 // Add 'label' fieldname
		{ $addFields: {  
			label: "$id"
			}
		}
			
	]).then(laporanProduk => res.json(laporanProduk))
	.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;