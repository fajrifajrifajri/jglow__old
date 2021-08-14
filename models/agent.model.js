const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const agentSchema = new Schema({
	nama: { type: String, required: true },
	alamat: { type: String, required: true },
	no_telp: { type: String, required: true },
	kode_agent: { type: String, required: true },
	user_id: { type: Number, required: true },
}, 
	{
		timestamps: true,
	}
);

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;