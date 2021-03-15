const { info } = require('console');
const fs = require('fs');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const goal = req.query.goal;
    var responseMessage = "";

    let qbMasterListFile = fs.readFileSync(__dirname + '/qbMasterList.json');
    let qbMasterList = JSON.parse(qbMasterListFile);
    qbMasterList = qbMasterList.questionBanks;
    
    var questionBankInfo = {};
    for(x in qbMasterList){
        let questionBankRaw = fs.readFileSync(__dirname + "/" + qbMasterList[x]);
        let questionBank = JSON.parse(questionBankRaw);
        questionBankInfo[questionBank.ID] = [questionBank.ID, questionBank.Name, questionBank.Number, qbMasterList[x]];
    }

    if(goal == "info"){
        console.log("info");
        let responseInfo = JSON.parse(JSON.stringify(questionBankInfo));        
        for(id in responseInfo){
            entry = responseInfo[id];
            entry.splice(3,1);
        }

        responseMessage = JSON.stringify(responseInfo);



    } else if (goal == "quiz") {
        let idList = [];
        if(req.query.id){
            idList = req.query.id.split(",");
        } else {
            idList.push("");
        }
        let amountList = [];
        if(req.query.amount){
            amountList = req.query.amount.split(",");
            for(var i = 0; i < amountList.length; i++){
                amountList[i] = Number(amountList[i]);
            }
        } else {
            amountList.push(0);
        }


        let quiz = [];
        for(bank in questionBankInfo){
            bankPath = questionBankInfo[bank][3];
            qBank = JSON.parse(fs.readFileSync(__dirname + "/" + bankPath));
            //get id location in requestline
            var index = idList.indexOf(qBank.ID);
            let questionLocation = [];
            for(i = 0; i < amountList[index]; i++){
                qLoc = Math.floor(Math.random() * Math.floor(questionBankInfo[bank][2]));
                if(questionLocation.includes(qLoc)){
                    i--;
                }else{
                    questionLocation.push(qLoc);
                }
            }
            let chosen = {
                "ID":qBank.ID,
                "Name":qBank.Name,
                "Number":qBank.Number,
                "Questions":[]
            };
            index = 0;
            for(randomNum in questionLocation){
                chosen.Questions.push(qBank.Questions[questionLocation[randomNum]]); //get the question and put it in chosen at the index
                index++;
            }
            quiz.push(chosen);
            //choose questions from those numbers
            //add stringified questions to the Chosen
            //add chosen to quiz
            
        }

        // for(var i = 0; i < idList.length; i++){
        //     responseMessage = responseMessage + "Question Bank " + idList[i] + " requests " + amountList[i] + " questions." + "\n";
        // }
        responseMessage = JSON.stringify(quiz);
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}
