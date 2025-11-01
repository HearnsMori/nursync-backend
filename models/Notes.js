const mongoose = require('mongoose');

const Notes = new mongoose.Schema({
	username: {
		type: String,
		unique: false,
		required: true
	},
	courses: {
		type: String,
		unique: false,
		required: true,
		default: ""
	},
	url: {
		type: String,
		unique: false,
		required: true,
		default: ""
	},
	clicked: {
		type: Boolean,
		unique: false,
		required: false,
		default: false
	}
	
	
});

Notes.pre('save', async (next) => {
	//this.isModified('schema');

});

module.exports = mongoose.model('Notes', Notes);
