const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
	console.log("signup");
	const {
		firstname,
		lastname,
		middlename,
		university, 
		studentid,
		emailaddress,
		username,
		password
	} = req.body;
	try {
		//checks whether usename or email already exists
		const usernameExist = await User.findOne({username});
		if (usernameExist) {
			return res.status(200).json({'error': `Account named ${username} already exist.`});
		}
		const newUser = new User({
			firstname,
			lastname,
			middlename,
			university, 
			studentid,
			emailaddress,
			username,
			password
		});
		await newUser.save();
		//sucessfully created
		res.status(200).json({'msg': "Successfully created the account"});
	} catch (err) {
		console.log(err);
		res.status(200).json({'error': 'An error in the server occured. Try Again.'});
	}
};

//Fix login part
const login = async (req, res) => {
	console.log("login");
	const {username, password} = req.body;
	try {
		//checks whether name or username already exists
		const username2Exist = await User.findOne({username});
		if (username2Exist) {
			let isMatch = password == username2Exist.password;
			console.log(isMatch);
			if (!isMatch) {
				return res.status(200).json({'error': 'Password doesn\'t match the account.'});	
			}
			//creates jwt
			const token2 = jwt.sign({userId: username2Exist.username}, process.env.SECRETKEY, {expiresIn: '1h'});
			const token3 = jwt.sign({userId: username2Exist.username}, process.env.SECRETKEY, {expiresIn: '11d'});
			//sucess login
			res.status(200).json({'token': token2, 'refreshToken': token3});
		} else {
			return res.status(200).json({'error': `Username ${username} doesn\'t exist.`});
		}
	} catch (err) { 
		console.log(err);
		res.status(200).json({'error': 'An error in the server occured. Try Again.'});
	}
}

const verify = async (req, res) => {
	console.log("verify");
	const {username, email1, password} = req.body;
	try {
		/*fs.readFile(profilepicFile, (err, data) => {
			if(err) {
				console.error(err);
				return;
			}
			const profilepic = data.toString('base64');
		})*/
		
	} catch(err) {
		console.log(err);
		res.status(200).json({'error': 'An error in the server occured. Try Again.'});
	}
}

const recover = async (req, res) => {
	console.log("recover");
	const {username, emailaddress, password} = req.body;
	try {
		const account = await User.findOne({username});
		if(!account) {
			res.status(200).json({'error': `No account with username ${username} found.`});
		} else if(account.emailaddress == emailaddress) {
			account.password = password;
			await account.save();
		} else {
			res.status(200).json({'error': `Unable to find email ${email1} to ${username} account.`});
		}
	} catch(err) {
		console.log(err);
		res.status(200).json({'error': 'An error in the server occured. Try Again.'});
	}
}

module.exports = {signup, login, verify, recover};