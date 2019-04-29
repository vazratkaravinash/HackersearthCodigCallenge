const mongoose = require("mongoose");
const dbconfig = require("../config.json").db;

function mongoConnection() {
	return new Promise((resolve, reject) => {
		mongoose.createConnection(dbconfig.url, { useNewUrlParser: true })
			.then((connection) => {
				resolve(connection);
			})
			.catch((error) => {
				reject(error);
			});
	});
}


module.exports = {
	mongoConnection
};
