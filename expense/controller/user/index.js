'use strict'
const userModel = require('../../model/user/index');
const jwt = require('../../helpers/jwt');
const bcrypt = require('../../helpers/bcrypt');

/**
 * Function to verify the user
 * @param {*} req 
 * @param {*} res 
 */
const verifyUser = (req, res) => {
    userModel.isEmailExist(req.body.email, 1).then(()=>{
		return userModel.getUserPassword(req.body.email).then((password)=>{
			return bcrypt.verifyPassword(req.body.password,password).then(()=>{
				return userModel.getUserDetails(req.body.email).then((data)=>{
					return jwt.createToken(data).then((token)=> {
						res.send({success: true, message: "Login Successfully", token: token})
					});
				});
			});
		});
	}).catch((err)=>{
		res.send({success: false, message: "Login failed", error: err})
	});
}

/**
 * Function to create new user
 * @param {*} req 
 * @param {*} res 
 */
const registerUser = (req, res) => {
    isPasswordMatches(req.body).then(()=>{
		return userModel.isEmailExist(req.body.email, 0).then(()=>{
			return bcrypt.encryptPassword(req.body.password).then((hashPassword)=>{
				req.body.password = hashPassword;
					return userModel.addUser(req.body).then(()=>{
						res.send({success: true, message: "Successfully register." });
					});
				});
				
			});
		
	}).catch((err)=>{
		res.send({success: false, error: err});
	});
}

const isPasswordMatches = (data) => {
	return new Promise((resolve, reject)=>  {
		if(data.email=="" || data.password =="")
			reject("Please provide email and password");
		if(data.password === data.confirmpassword)
			resolve(true);
		else
			reject("Password and Confirm Password are not matching");
	});
};

module.exports = {
	verifyUser,
	registerUser
}