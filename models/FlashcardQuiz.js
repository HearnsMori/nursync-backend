const mongoose = require('mongoose');

const FlashcardQuiz = new mongoose.Schema({
	username: {
		type: String,
		unique: false,
		required: true,
		default: ''
	},
	term: {
		type: String,
		unique: false,
		required: false,
		default: ''
	},
	definition: {
		type: String,
		unique: false,
		required: false,
		default: ''
	},
	category: {
		type: String,
		unique: false,
		required: true,
		default: ''
	}
});

FlashcardQuiz.pre('save', async (next) => {
	//this.isModified('schema');

});

module.exports = mongoose.model('FlashcardQuiz', FlashcardQuiz);
