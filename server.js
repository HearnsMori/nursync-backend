const authMiddle = require('./middles/authMiddle');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 10000;


const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function nurSyncLearningBot(prompt) {
	try {
		const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

		// Add a prompt context that guides the bot to respond as a learning assistant
		const learningContextPrompt = `You are NurSYNC AI, an intelligent assistant designed to help users learn and answer questions related to education, self-improvement, and knowledge especially for Nursing Related. Respond to the user's query in a way that encourages learning, understanding, and knowledge-sharing. Keep your answers into one to two paragraph.`;

		// Combine the learning context with the user’s prompt
		const fullPrompt = `${learningContextPrompt} \nUser: ${prompt}\nAI:`;

		// Generate content based on the combined prompt
		const result = await model.generateContent(fullPrompt);
		const response = await result.response;
		const text = response.text();

		// Return the generated text as the bot's response
		return text;
	} catch (err) {
		console.error("Gemini API error:", err);
		return "Error from NurSYNC AI"; // Fallback error message
	}
}

app.use(session({
	secret: process.env.SECRET_KEY,
	resave: false,
	saveUninitialized: true
}));

app.use(cors({
	origin: ['https://nursync.vercel.app', 'http://localhost:3000'],
	credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/serverstorage', express.static('./serverstorage'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/task', require('./routes/task'));
app.use('/api/flashcardquiz', require('./routes/flashcardquiz'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/notes', require('./routes/notes'));

app.post('/api/bot', async (req, res) => {
	const {prompt} = req.body;
	console.log(prompt);
	const msg = await nurSyncLearningBot(prompt);
	res.json({msg});
});

//DB connection and logic
const User = require('./models/User');
const Task = require('./models/Task');
const FlashcardQuiz = require('./models/FlashcardQuiz');
const Courses = require('./models/Courses');
//reset DB

app.get('/resetDB', (req, res) => {
	User.deleteMany({}).then(()=>{}).catch(err=>{});
	Task.deleteMany({}).then(()=>{}).catch(err=>{});
	FlashcardQuiz.deleteMany({}).then(()=>{}).catch(err=>{});
	Courses.deleteMany({}).then(()=>{}).catch(err=>{});
	res.status(201).json({msg: "Successfully Reset Database"});
});

//Connecting to Database
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoDBUri = process.env.MONGO_URI;
mongoose.connect(mongoDBUri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => {

	})
	.catch(err => {
		console.error('Failed to connect to MongoDB', err)
	});
const db = mongoose.connection;
db.on('connected', () => {});
db.on('error', err => console.error('Mongoose connection error:', err));
db.on('disconnected', () => {});

app.listen(PORT, '0.0.0.0', () => {
	console.log(`Server listening at port ${PORT}`)
});

//When the user press ctrl C
process.on('SIGINT', () => {
	async function closeConnection() {
		try {
			await mongoose.connection.close();
			console.log('Connection closed successfully.');
			process.exit(0);
		} catch (err) {
			console.error('Failed to close the connection:', err);
		}
	}
	// Call the function when you need to close the connection
	closeConnection();
});
