const mongoose = require("mongoose");
var Schema = mongoose.Schema;

function createUserSchema(connection) {
	return new Promise((resolve) => {
		var userSchema = new Schema({
			email: String,
			password: String
		});
		var user = connection.model("User", userSchema);
		resolve(user);
	});
}



module.exports = {
	createUserSchema
};