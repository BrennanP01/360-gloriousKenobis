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
                let randomQuestion = qBank.Questions[questionLocation[randomNum]];
                delete randomQuestion["correctAnswer"];
                
                //randomize possible answer order
                let choices = [];
                for(i=0;i<randomQuestion["choices"].length;i++){
                    choices.push(randomQuestion["choices"][i]);
                }
                let randomizedChoicesIndex = [];
                for(i=0;i < choices.length;i++){
                    cLoc = Math.floor(Math.random() * Math.floor(choices.length));
                    if(randomizedChoicesIndex.includes(cLoc)){
                        i--;
                    } else {
                        randomizedChoicesIndex.push(cLoc);
                    }
                }
                let randomizedChoices = [];
                for(i=0;i<randomizedChoicesIndex.length;i++){
                    randomizedChoices.push(randomQuestion["choices"][randomizedChoicesIndex[i]]);
                }
                
                randomQuestion.choices = randomizedChoices;

                
                chosen.Questions.push(randomQuestion); //get the question and put it in chosen at the index
                index++;
            }
            quiz.push(chosen);
        }
        responseMessage = JSON.stringify(quiz);
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}
