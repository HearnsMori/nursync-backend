const mongoose = require('mongoose');

const Task = new mongoose.Schema({
	username: {
		type: String,
		unique: false,
		required: true
	},
	deadline: {
		type: Number,
		unique: false,
		required: false,
		default: 0
	},
	finished: {
		type: Boolean,
		unique: false,
		required: false,
		default: false
	},
	content: {
		type: String,
		unique: false,
		required: true,
		default: ''
	},
	icon: {
		type: Number,
		unique: false,
		required: false,
		default: ''
	},
	color: {
		type: String,
		unique: false,
		required: false,
		default: '#ffffff'
	},
	title: {
		type: String,
		unique: false,
		required: false,
		default: ''
	},
});

Task.pre('save', async (next) => {
	//this.isModified('schema');

});

module.exports = mongoose.model('Task', Task);
