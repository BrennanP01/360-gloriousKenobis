const http = require('http');
const { Recoverable } = require('repl');
const url = require('url');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    let nameList = []
    if(req.query.name){
        nameList = req.query.name.split(",");
    } else {
        nameList.push("Bob");
    }

    let ageList = []
    if(req.query.age){
        ageList = req.query.age.split(",");
    } else {
        ageList.push("15");
    }

    console.log(typeof nameList);
    var responseMessage = ""
    for(var i = 0; i < nameList.length; i++){
        responseMessage = responseMessage + "Hello, " + nameList[i] + ". You are " + ageList[i] + " years old. This HTTP triggered function executed successfully." + "\n";
    }
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}
