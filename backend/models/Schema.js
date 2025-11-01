const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	schema: {
		type: String,
		unique: true,
		required: true,
		default: ''
	}
});

Schema.pre('save', async (next) => {
	//this.isModified('schema');

});

module.exports = mongoose.model('Schema', Schema);
