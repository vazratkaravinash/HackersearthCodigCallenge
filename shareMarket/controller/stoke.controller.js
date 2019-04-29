const stokeModel = require("../models/stock.model");

const stokeInfoByCompanyName = (req, res) => {
    stokeModel.stokeInfoByCompanyName(req.params.comapnyName).then((result)=> {
        res.send({sucess: true, data: result, message: "Successfully fetch data", error: null});
    }).catch((error)=> {
        res.send({sucess: false, data: null, message: "Fail to fetch data", error: error});
    })
}

const stokeInfoByTimeAndTicker = (req, res) => {
    stokeModel.stokeInfoByTimeAndTicker(req.params.to, req.params.from, req.params.symbol).then((result)=> {
        res.send({sucess: true, data: result, message: "Successfully fetch data", error: null});
    }).catch((error)=> {
        res.send({sucess: false, data: null, message: "Fail to fetch data", error: error});
    })
}

const stockInfoByTicker = (req, res) => {
    stokeModel.stockInfoByTicker(req.params.symbol).then((result)=> {
        res.send({sucess: true, data: result, message: "Successfully fetch data", error: null});
    }).catch((error)=> {
        res.send({sucess: false, data: null, message: "Fail to fetch data", error: error});
    })
}

