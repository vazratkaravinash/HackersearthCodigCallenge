const stockSchema = require("../schema/stock");
const stockPriceSchema = require("../schema/stock_prices");
const db = require("../helper/mongo-connection");

/**
 * Function is used find stock prices of the selected company
 * @param {String} companyName 
 */
const stokeInfoByCompanyName = (companyName) => {
    return new Promise((resolve, reject) => {
        return db.mongoConnection().then((connection) => {
            return stockSchema.createStockSchema(connection).then(stock => {
                stock.findOne({ name: companyName }).then((stockData) => {
                    return stockPriceSchema.createStockPriceSchema(connection).then((stockprice) => {
                        stockprice.find({ symbol: stockData.symbol }).then((stockPriceData) => {
                            connection.close();
                            resolve(stockPriceData);
                        })
                    })
                })
            })
        }).catch((error) => {
            reject(error);
        })
    })
}

/**
 * Function is used to search share info by symbol
 * @param {String} symbol 
 */
const stockInfoByTicker = (symbol) => {
    return new Promise((resolve, reject) => {
        return db.mongoConnection().then((connection) => {
            return stockPriceSchema.createStockPriceSchema(connection).then((stockprice) => {
                stockprice.find({ symbol: symbol }).then((stockPriceData) => {
                    connection.close();
                    resolve(stockPriceData);
                })
            })
        }).catch((error) => {
            reject(error);
        })

    })
}

/**
 * Function is used to get stoke details by date and symbol
 * @param {date} to 
 * @param {date} from 
 * @param {String} symbol 
 */
const stokeInfoByTimeAndTicker = (to, from, symbol) => {
    return new Promise((resolve, reject) => {
        return db.mongoConnection().then((connection) => {
            return stockPriceSchema.createStockPriceSchema(connection).then((stockprice) => {
                stockprice.find(
                    {
                        symbol: symbol,
                        $and: [
                            { date: { $gte: from } },
                            { date: { $lte: to } }
                        ]
                    }).then((stockPriceData) => {
                        connection.close();
                        resolve(stockPriceData);
                    })
            })
        }).catch((error) => {
            reject(error);
        })

    })
}


const tenBestPerformingStocks = (to, from) => {
    return new Promise((resolve, reject) => {
        return db.mongoConnection().then((connection) => {
            return stockPriceSchema.createStockPriceSchema(connection).then((stockprice) => {
                stockprice.find({
                    $and: [
                        { date: { $gte: from } },
                        { date: { $lte: to } }
                    ]
                })
            })
        })
    })
}

const tenWorstPerformingStocks = (to, from) => {

}

module.exports = {
    stokeInfoByCompanyName,
    stokeInfoByTimeAndTicker,
    stockInfoByTicker
}