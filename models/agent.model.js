const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const agentSchema = new Schema({
	_id: { type: String },
	nama: { type: String, required: true },
	alamat: { type: String, required: true },
	no_telp: { type: String, required: true },
}, 
	{
		timestamps: true,
	}
);

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;