const { info } = require('console');
const fs = require('fs');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const goal = req.query.goal;
    var responseMessage = "";

    let qbMasterListFile = fs.readFileSync(__dirname + '/qbMasterList.json');
    let qbMasterList = JSON.parse(qbMasterListFile);
    qbMasterList = qbMasterList.questionBanks;

    for(x in qbMasterList){
        console.log(x);
        console.log(qbMasterList[x]);
    }

    if(goal == "info"){
        console.log("info");
        var questionBankInfo = {};
        for(x in qbMasterList){
            let questionBankRaw = fs.readFileSync(__dirname + "/" + qbMasterList[x]);
            let questionBank = JSON.parse(questionBankRaw);
            console.log(questionBank.Name + " " + questionBank.ID + " " +  questionBank.Number);
            // for(j in questionBank){
            //     console.log();
            // }
        }
        // let qbList = []
        // if(req.query.qb){
        //     qbList = req.query.qb.split(",");
        // }else{
        //     qbList.push("appliedProgQuestions")
        // }
        // let idList = []
        // if(req.query.id){
        //     idList = req.query.id.split(",");
        // } else {
        //     idList.push("Bob");
        // }

        // let amountList = []
        // if(req.query.amount){
        //     amountList = req.query.amount.split(",");
        //     for(var i=0; i < idList.length; i++){
        //         amountList[i] = Number(amountList[i]);
        //     }
        // } else {
        //     amountList.push(0);
        // }

        // for(var i = 0; i < idList.length; i++){
        //     responseMessage = responseMessage + "Question Bank " + idList[i] + " requests " + amountList[i] + " questions." + "\n";
        // }
    }
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}
