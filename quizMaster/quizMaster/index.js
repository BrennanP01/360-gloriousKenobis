const http = require('http');
const { Recoverable } = require('repl');
const url = require('url');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    let idList = []
    if(req.query.id){
        idList = req.query.id.split(",");
    } else {
        idList.push("Bob");
    }

    let amountList = []
    if(req.query.amount){
        amountList = req.query.amount.split(",");
        for(var i=0; i < idList.length; i++){
            amountList[i] = Number(amountList[i]);
        }
    } else {
        amountList.push(0);
    }

    var responseMessage = ""
    for(var i = 0; i < idList.length; i++){
        responseMessage = responseMessage + "Question Bank " + idList[i] + " requests " + amountList[i] + " questions." + "\n";
    }
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}
