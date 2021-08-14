const router = require('express').Router();
const Agent = require('../models/agent.model');

router.route('/').get((req, res) => {
	Agent.find()
		.then(agent => res.json(agent))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', (req, res) => {
	console.log(req.body)
	
	const nama = req.body.nama;
	const alamat = req.body.alamat;
	const no_telp = req.body.noTelp;
	const kode_agent = req.body.kodeAgent;
	const user_id = req.body.userId;

	const newAgent = new Agent({
		nama,
		alamat,
		no_telp,
		kode_agent,
		user_id
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
		agent.nama_agent = req.body.namaAgent;
		agent.harga = Number(req.body.harga);
		agent.stok = Number(req.body.stok);
		agent.kategori_id = req.body.kategori_id;
		
	agent.save()
		.then(() => res.json('Agent telah diupdate!'))
		.catch(err => res.status(400).json('Error: ' + err));
	})
});

module.exports = router;