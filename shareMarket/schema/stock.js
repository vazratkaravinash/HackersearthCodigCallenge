const mongoose = require("mongoose");
var Schema = mongoose.Schema;

function createStockSchema(connection) {
	return new Promise((resolve) => {
		var stockSchema = new Schema({
            symbol: String,
			name: String,
			marketCap: Number,
			sector: String,
			industry: String
		});
		var stock = connection.model("Stock", stockSchema);
		resolve(stock);
	});
}



module.exports = {
	createStockSchema
};