const xlsx = require('node-xlsx');
const path = require('path');
const folderPath = path.join(__dirname + '/..' + '/data');
const stockPrices = require('../../schema/stock_prices');
const stock = require('../../schema/stock');
const db = require('../../helper/mongo-connection');
const csv = require('csvtojson')
const csvFilePath = folderPath + "/" + "prices763fefc.csv";
const async = require('async');

/**
 * Function to read excel file and insert data into database
 */
function fetchDataFromExcel() {
    var obj = xlsx.parse(folderPath + "/" + "stocksf081a85.xlsx");
    var dataToInsert = obj[0].data;
    dataToInsert.splice(0, 1);
    dataToInsert = filterData(dataToInsert);
    console.log(dataToInsert);
    db.mongoConnection().then((connection) => {
        stock.createStockSchema(connection).then((stockSchema) => {
            stockSchema.create(dataToInsert).then((res1) => {
                connection.close();
            });
        })
    }).catch((error) => {
        console.log(error)
    })
}

/**
 * Function is used to convert data into array of json object
 * @param {*} data 
 */
const filterData = (data) => {
    let d = [];
    data.forEach((one) => {
        let dummy = {};
        dummy.symbol = one[0];
        dummy.name = one[1];
        dummy.marketCap = one[2];
        dummy.sector = one[3];
        dummy.industry = one[4];
        d.push(dummy);
    });
    return d;
}

/**
 * Function to read csv file and stored data into database.
 */
const storeCSVIntoDatabase = () => {
    csv().fromFile(csvFilePath).then((jsonObj) => {
        console.log(jsonObj);
        db.mongoConnection().then((connection) => {
            stockPrices.createStockPriceSchema(connection).then((stockSchema) => {
                let chunk = [];
                let parts = [];
                for (let j = 0; j < jsonObj.length; j++) {
                    if (j % 7000 == 0 && j != 0) {
                        parts.push(jsonObj[j]);
                        chunk.push(parts);
                        parts = [];
                    }
                    else {
                        parts.push(jsonObj[j]);
                    }
                }
                chunk.push(parts);
                for (let i = 0; i < chunk.length; i++) {
                    setTimeout(function () {
                        stockSchema.create(chunk[i]).then((res1) => {
                            console.log(">>>>>>>>>>", res1.length);
                        }).catch((error) => {
                            console.log(">>>>>>>>>>", error);
                        });
                    }, (i * 20000))
                }
                // async.map(chunk,(one, callback)=> {
                //     console.log("?????????????", one.length)
                //     stockSchema.create(one).then((res1)=> {
                //         console.log(">>>>>>>>>>",res1);

                //         callback(null, res1);
                //     }).catch((error)=> {
                //         callback(error, null);
                //     });
                // }, (errMap, resMap)=> {
                //     // console.log(resMap);
                // })

            })
        }).catch((error) => {
            console.log(error)
        })
    })
}

/**
 * Data dump
 */
fetchDataFromExcel();
storeCSVIntoDatabase();

