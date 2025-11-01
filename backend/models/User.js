const mongoose = require('mongoose');

const User = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		default: ''
	},
	profilepic: {
		type: Buffer,
		unique: false,
		required: false,
		default: '/serverstorage/user/profilepic/default/default.png'
	},
	password: {
		type: String,
		unique: false,
		required: true,
		default: ''
	},
	firstname: {
		type: String,
		unique: false,
		required: true,
		default: ''
	},
	lastname: {
		type: String,
		unique: false,
		required: true,
		default: ''
	},
	middlename: {
		type: String,
		unique: false,
		required: true,
		default: ''
	},
	emailaddress: {
		type: String,
		unique: false,
		required: true,
		default: ''
	},
	university: {
		type: String,
		unique: false,
		required: false,
		default: ''
	},
	studentid: {
		type: String,
		unique: false,
		required: false,
		default: ''
	},
	aboutme: {
		type: String,
		unique: false,
		required: false,
		default: ''
	},
	country: {
		type: String,
		unique: false,
		required: false,
		default: ''
	},
	cityortown: {
		type: String,
		unique: false,
		required: false,
		default: ''
	},
	coursesclicked: {
		type: [String],
		unique: false,
		required: false,
		default: ['']
	},
	progress: {
		type: [Number],
		unique: false,
		required: false,
		default: [0]
	}
});

User.pre('save', async (next) => {
	//this.isModified('schema');

});

module.exports = mongoose.model('User', User);
