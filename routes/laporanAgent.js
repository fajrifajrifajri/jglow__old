const router = require('express').Router();
const Order = require('../models/order.model');
const dayjs = require('dayjs')
const week = dayjs().startOf('week');
const startOfWeek = week.$d;
const lastWeek = week.subtract(1, 'week').$d;
const startOfMonth = dayjs().startOf('month').$d;

// Laporan "Penjualan semua agent minggu ini"
router.route('/minggu').get((req, res) => {
	Order.aggregate([
		// Greater than start of the week (Sunday)
		{ $match: { created_at: { $gt: startOfWeek } } },
		// Relational database, looking for 'nama_depan' & 'nama_belakang' agents
		{ $lookup: {
			   from: 'agents',
			   localField: 'kode_agent',
			   foreignField: '_id',
			   as: 'agent'
			}
		},
		{ $unwind: {
            "path": "$agent",
            "preserveNullAndEmptyArrays": true
		} },
		{ $project: {
			   namaAgent: { $concat: ["$agent.nama_depan", " ", "$agent.nama_belakang"] },
			   hari: { $dayOfWeek: "$created_at" }
			}
		},
		// Change '0' to Sunday, '1' to Monday, ...
		{ $project: {
			   namaAgent: "$namaAgent",
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
		// Count each agent for each day
		// https://stackoverflow.com/questions/25666187/mongodb-nested-group
		// First pipeline
		{ $group: {
				_id: { 
					agent: "$namaAgent",
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
			  _id :  "$_id.agent",
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
			  id: "$_id",
			  data: "$data",
		   }
		},
	]).then(laporanProduk => res.json(laporanProduk))
	.catch(err => res.status(400).json('Error: ' + err));
});

// Laporan "Penjualan semua agent minggu lalu"
router.route('/minggu-lalu').get((req, res) => {
	Order.aggregate([
		// Greater than start of the week (Sunday)
		{ $match: { created_at: { $gt: lastWeek, $lt: startOfWeek } } },
		// Relational database, looking for 'nama_depan' & 'nama_belakang' agents
		{ $lookup: {
			   from: 'agents',
			   localField: 'kode_agent',
			   foreignField: '_id',
			   as: 'agent'
			}
		},
		{ $unwind: {
            "path": "$agent",
            "preserveNullAndEmptyArrays": true
		} },
		{ $project: {
			   namaAgent: { $concat: ["$agent.nama_depan", " ", "$agent.nama_belakang"] },
			   hari: { $dayOfWeek: "$created_at" }
			}
		},
		// Change '0' to Sunday, '1' to Monday, ...
		{ $project: {
			   namaAgent: "$namaAgent",
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
		// Count each agent for each day
		// https://stackoverflow.com/questions/25666187/mongodb-nested-group
		// First pipeline
		{ $group: {
				_id: { 
					agent: "$namaAgent",
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
			  _id :  "$_id.agent",
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
			  id: "$_id",
			  data: "$data"
		   }
		}
	]).then(laporanProduk => res.json(laporanProduk))
	.catch(err => res.status(400).json('Error: ' + err));
});



// Laporan "Penjualan semua agent {bulan ini}"
router.route('/bulan').get((req, res) => {
	Order.aggregate([
		// Greater than start of the week (Sunday)
		{ $match: { created_at: { $gt: startOfMonth } } },
		// Relational database, looking for 'nama_depan' & 'nama_belakang' agents
		{ $lookup: {
			   from: 'agents',
			   localField: 'kode_agent',
			   foreignField: '_id',
			   as: 'agent'
			}
		},
		{ $unwind: {
            "path": "$agent",
            "preserveNullAndEmptyArrays": true
		} },
		{ $project: {
			   namaAgent: { $concat: ["$agent.nama_depan", " ", "$agent.nama_belakang"] },
			   hari: { $dayOfMonth: "$created_at" }
			}
		},	
		// Count each agent for each day
		// https://stackoverflow.com/questions/25666187/mongodb-nested-group
		// First pipeline
		{ $group: {
				_id: { 
					agent: "$namaAgent",
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
			  _id :  "$_id.agent",
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
			  id: "$_id",
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
		{ $match: { created_at: { $gt: startOfWeek } } },
		// Relational database, looking for 'nama_depan' & 'nama_belakang' agents
		{ $lookup: {
			   from: 'agents',
			   localField: 'kode_agent',
			   foreignField: '_id',
			   as: 'agent'
			}
		},
		{ $unwind: {
            "path": "$agent",
            "preserveNullAndEmptyArrays": true
		} },
		{ $project: {
			   namaAgent: { $concat: ["$agent.nama_depan", " ", "$agent.nama_belakang"] }
			}
		},
		// Count each agent for each day
		// https://stackoverflow.com/questions/25666187/mongodb-nested-group
		// First pipeline
		{ $group: {
			_id: "$namaAgent",
			count:{$sum:1}
			}
		},
		 // Rename '_id' to 'id' and change 'id' from array to string
		 { $project: {  
			  _id: 0,
			  id: "$_id",
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
		{ $match: { created_at: { $gt: lastWeek, $lt: startOfWeek } } },
		// Relational database, looking for 'nama_depan' & 'nama_belakang' agents
		{ $lookup: {
			   from: 'agents',
			   localField: 'kode_agent',
			   foreignField: '_id',
			   as: 'agent'
			}
		},
		{ $unwind: {
            "path": "$agent",
            "preserveNullAndEmptyArrays": true
		} },
		{ $project: {
			   namaAgent: { $concat: ["$agent.nama_depan", " ", "$agent.nama_belakang"] }
			}
		},
		// Count each agent for each day
		// https://stackoverflow.com/questions/25666187/mongodb-nested-group
		// First pipeline
		{ $group: {
			_id: "$namaAgent",
			count:{$sum:1}
			}
		},
		 // Rename '_id' to 'id' and change 'id' from array to string
		 { $project: {  
			  _id: 0,
			  id: "$_id",
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
		{ $match: { created_at: { $gt: startOfMonth } } },
		// Relational database, looking for 'nama_depan' & 'nama_belakang' agents
		{ $lookup: {
			   from: 'agents',
			   localField: 'kode_agent',
			   foreignField: '_id',
			   as: 'agent'
			}
		},
		{ $unwind: {
            "path": "$agent",
            "preserveNullAndEmptyArrays": true
		} },
		{ $project: {
			   namaAgent: { $concat: ["$agent.nama_depan", " ", "$agent.nama_belakang"] }
			}
		},
		// Count each agent for each day
		// https://stackoverflow.com/questions/25666187/mongodb-nested-group
		// First pipeline
		{ $group: {
			_id: "$namaAgent",
			count:{$sum:1}
			}
		},
		 // Rename '_id' to 'id' and change 'id' from array to string
		 { $project: {  
			  _id: 0,
			  id: "$_id",
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