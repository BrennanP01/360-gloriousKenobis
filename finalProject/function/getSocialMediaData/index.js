//https://sproutsocial.com/insights/best-times-to-post-on-social-media/
// Source for best times to post on twitter, based off of global engagement

// packages for blob storage
const { BlobServiceClient } = require('@azure/storage-blob');
var multipart = require('parse-multipart');
const AZURE_STORAGE_CONNECTION_STRING = process.env["AZURE_STORAGE_CONNECTION_STRING"];

// package for twitter API
const Twit = require('twit');
var fs = require('fs');
var config = require('./config');
//?plat=twitter&hash=rainbow&time=cst
//&plat=twitter&hash=rainbow&time=cst

// package for youtube API
const { google } = require('googleapis');
var ytConfig = require('./ytconfig');
//?plat=youtube&hash=rainbow&time=cst
//&plat=youtube&hash=rainbow&time=cst

// initialize the response message
var responseMessage = "";
// initialize the response info object
var responseInfo = {};

module.exports = async function (context, req) {
    console.log("Starting");
    var responseTime = null;
    // inputs for the function
    const platform = req.query.plat;
    const hashtag = req.query.hash;
    const timezone = req.query.time;
    //supported timezones are est, cst, mst, pst, akst, hst

    if(platform == 'youtube'){
        const youtubeIdealTime = 14;
        responseTime = calculateTime(youtubeIdealTime, timezone);
        responseHashes = await getYoutubeHashes(hashtag, context, responseTime);
    }else if(platform == 'twitter'){
        const twitterIdealTime = 9;
        responseTime = calculateTime(twitterIdealTime, timezone);
        responseHashes = await getTwitterHashes(hashtag, context, responseTime);
    }else{
        responseMessage = "Error: Unsupported Platform";
    }

    if(responseTime == null){
        responseMessage = responseMessage + "Error: Unsupported Timezone\n";
        context.res = {
            body: responseMessage
        };
    }
}

// returns time in CST, 24 hour format, on the hour
function calculateTime(time, timeZone){
    //supported timezones are est, cst, mst, pst, akst, hst
    if(timeZone == 'est'){
        return (time + 1) % 24;
    }else if(timeZone == 'cst'){
        return (time) % 24;
    }else if(timeZone == 'mst'){
        return (time - 1) % 24;
    }else if(timeZone == 'pst'){
        return (time - 2) % 24;
    }else if(timeZone == 'akst'){
        return (time - 3) % 24;
    }else if(timeZone == 'hst'){
        return (time - 5) % 24;
    }else{
        return null;
    }
}


// writes to the blob storage file
function writeToBlob(dataToWrite, context){
    context.bindings.outputBlob = dataToWrite;
}

/***********************************
            YOUTUBE
***********************************/
//gets related hashtags from youtube
async function getYoutubeHashes(hashtag, context, responseTime){
    var hashtagOccurances = [];
    ytkey = ytConfig;
    console.log(ytkey);
    params = {
        key: ytkey.key,
        part: 'id,snippet',
        q: hashtag,
        maxResults: 100
    }
    var results = await google.youtube('v3').search.list(params);
    results = results.data.items;
    for(var i = 0; i < results.length; i++){
        var description = results[i].snippet.description
        var wordsInDescription = description.split(" ");
        for(var j=0; j < wordsInDescription.length; j++){
            if(wordsInDescription[j].includes("#")){
                var inArrayLocation = null;
                var isInArray = false;
                for(var k = 0; k < hashtagOccurances.length; k++){
                    if(hashtagOccurances[k] == wordsInDescription[j]){
                        isInArray = true;
                        inArrayLocation = k;
                    }
                }
                if(isInArray){
                    let curVal = hashtagOccurances[inArrayLocation].occur
                    hashtagOccurances[inArrayLocation].occur = curVal + 1;
                    isInArray = false;
                }else{
                    hashtagOccurances.push({
                        hashtag: wordsInDescription[j],
                        occur: 1
                    });
                }
            }
        }
    }
    responseInfo.platform = "youtube";
    responseInfo.time = responseTime;
    responseInfo.hashtags = hashtagOccurances;
    console.log(responseInfo);

    responseMessage = JSON.stringify(responseInfo);
    context.res = {
        body: responseMessage
    };
    // writeToBlob(responseInfo, context);

}

/***********************************
            TWITTER
***********************************/
//gets related hashtags from twitter
async function getTwitterHashes(hashtag, context, responseTime){
    var done = await queryTwitter(hashtag, context, responseTime);
}

// makes the get request, then writes the data into a file
function queryTwitter(hashtag, context, responseTime){
    var T = new Twit(config);
    // paramaters for the tweets to search
    params = {
        q: "#" + hashtag + " -is:retweet",
        count: 100,
        lang: "en",
        result_type: "mixed"
    }
    // ensures the function runs synchronously
    return new Promise((resolve, reject) =>{
        T.get('search/tweets', params, function(err, data, response){
            if (err) {
                reject(err);
            }
            var hashtagOccurances = []
            var tweets = data.statuses;
            for(var i = 0; i < tweets.length; i++){
                var hashtags = tweets[i].entities.hashtags;
                for(var j = 0; j < hashtags.length; j++){
                    var inArrayLocation = null;
                    var isInArray = false;
                    for(let k = 0; k < hashtagOccurances.length; k++){
                        if(hashtagOccurances[k].hashtag == hashtags[j].text){
                            isInArray = true;
                            inArrayLocation = k;
                        }
                    }
                    // count number of times a hashtag appears
                    if(isInArray){
                        let curVal = hashtagOccurances[inArrayLocation].occur
                        hashtagOccurances[inArrayLocation].occur = curVal + 1;
                        isInArray = false;
                    }else{
                        hashtagOccurances.push({
                            hashtag: hashtags[j].text,
                            occur: 1
                        });
                    }
                }
            }
            // sort the array from greatest to least
            hashtagOccurances.sort(function(a,b){
                return b.occur - a.occur;
            });

            //create the json object to write to the file
            responseInfo.platform = "twitter";
            responseInfo.time = responseTime;
            responseInfo.hashtags = hashtagOccurances;
            // Write to the file
            // fs.writeFileSync("./hashtags.json", JSON.stringify(hashtagOccurances));
            responseMessage = JSON.stringify(responseInfo);
            context.res = {
                body: responseMessage
            };
            // writeToBlob(responseInfo, context);
            resolve(data);
        });
        
    });
}

