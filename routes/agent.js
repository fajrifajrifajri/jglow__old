const router = require('express').Router();
const Agent = require('../models/agent.model');

router.route('/').get((req, res) => {
	Agent.find()
		.then(agent => res.json(agent))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', (req, res) => {
	console.log(req.body)
	
	const _id = req.body.kodeAgent;
	const nama_depan = req.body.namaDepan;
	const nama_belakang = req.body.namaBelakang;
	const alamat = req.body.alamat;
	const no_telp = req.body.noTelp;

	const newAgent = new Agent({
		_id,
		nama_depan,
		nama_belakang,
		alamat,
		no_telp
	});
	
	newAgent.save()
		.then(() => res.json('Agent ditambahkan!'))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
	Agent.findById(req.params.id)
	.then(agent => res.json(agent))
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
	Agent.findByIdAndDelete(req.params.id)
	.then(() => res.json('Agent dihapus.'))
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
	Agent.findById(req.params.id)
	.then(agent => {
		agent.nama_depan = req.body.namaDepan;
		agent.nama_belakang = req.body.namaBelakang;
		
	agent.save()
		.then(() => res.json('Agent telah diupdate!'))
		.catch(err => res.status(400).json('Error: ' + err));
	})
});

module.exports = router;