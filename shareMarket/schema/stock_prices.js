const mongoose = require("mongoose");
var Schema = mongoose.Schema;

function createStockPriceSchema(connection) {
	return new Promise((resolve) => {
		var stockPriceSchema = new Schema({
			open: Number,
			close: Number,
			low: Number,
			high: Number,
			volume: Number,
			date: { type: Date, default: Date.now },
			symbol: String
		});
		var stockPrice = connection.model("StockPrice", stockPriceSchema);
		resolve(stockPrice);
	});
}



module.exports = {
	createStockPriceSchema
};