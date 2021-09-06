const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const agentSchema = new Schema({
	_id: { type: String },
	nama_depan: { type: String, required: true },
	nama_belakang: { type: String },
	alamat: { type: String, required: true },
	no_telp: { type: String, required: true },
}, 
	{
		timestamps: true,
	}
);

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;