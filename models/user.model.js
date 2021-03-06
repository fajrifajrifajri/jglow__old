const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
		  type: String,
		  required: true
	   },
		role: {
		  type: String,
		  required: true
	   },
		kode_agent: {
		  type: String
	   }
	}, 
	{ 
		timestamps: { 
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
);

const User = mongoose.model('User', userSchema);

module.exports = User;