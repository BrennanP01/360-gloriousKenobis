//https://sproutsocial.com/insights/best-times-to-post-on-social-media/
// Source for best times to post on the different sites, based off of global engagement

// packages for blob storage
const { BlobServiceClient } = require('@azure/storage-blob');
var multipart = require('parse-multipart');
const AZURE_STORAGE_CONNECTION_STRING = process.env["AZURE_STORAGE_CONNECTION_STRING"];

// package for twitter API
var Twit = require('twit');
var fs = require('fs');
var config = require('./config');
//?plat=twitter&hash=rainbow&time=cst

// initialize the response message
var responseMessage = "";
// initialize the response info object
var responseInfo = {};

module.exports = async function (context, req) {
    console.log("Starting");
    // inputs for the function
    const platform = req.query.plat;
    const hashtag = req.query.hash;
    const timezone = req.query.time;
    //supported timezones are est, cst, mst, pst, akst, hst

    if(platform == 'facebook'){
        responseMessage = "facebook";
        const facebookIdealTime = 11; // TODO find right time
        responseTime = calculateTime(facebookIdealTime, timezone);
        //responseHashes = getFacebookHashes(hashtag);

    }else if(platform == 'instagram'){
        responseMessage = "instagram";
        const instagramIdealTime = 15; // TODO find right time
        responseTime = calculateTime(instagramIdealTime, timezone);
        //responseHashes = getInstagramHashes(hashtag);

    }else if(platform == 'twitter'){
        responseHashes = await getTwitterHashes(hashtag, context, timezone);
    }else{
        responseMessage = "Error: Unsupported Platform";
    }

    if(responseTime == null){
        responseMessage = "Error: Unsupported Timezone";
    }else{
        // responseInfo.platform = platform;
        // responseInfo.time = responseTime;
        // responseInfo.hashtags = responseHashes;
        responseMessage = JSON.stringify(responseInfo);
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
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

/***********************************
            FACEBOOK
***********************************/
//gets related hashtags from facebook
function getFacebookHashes(hashtag){
    posts = fetch()
}

/***********************************
            INSTAGRAM
***********************************/
//gets related hashtags from instagram
function getInstagramHashes(hashtag){
    
}


/***********************************
            TWITTER
***********************************/
//gets related hashtags from twitter
async function getTwitterHashes(hashtag, context, timezone){
    var done = await queryTwitter(hashtag, context, timezone);
    // var hashtags = fs.readFileSync("./hashtags.json",'utf8');
    // console.log(hashtags);
    // return JSON.parse(hashtags);
}

// makes the get request, then writes the data into a file
function queryTwitter(hashtag, context, timezone){
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
            const twitterIdealTime = 9; // TODO find right time
            responseTime = calculateTime(twitterIdealTime, timezone);
            responseInfo.platform = "twitter";
            responseInfo.time = responseTime;
            responseInfo.hashtags = hashtagOccurances;
            // Write to the file
            // fs.writeFileSync("./hashtags.json", JSON.stringify(hashtagOccurances));
            writeToBlob(responseInfo, context);
            resolve(data);
        });
    });
}

// writes to the blob storage file
function writeToBlob(dataToWrite, context){
    context.bindings.outputBlob = dataToWrite;
}