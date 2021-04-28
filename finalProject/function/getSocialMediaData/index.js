//https://sproutsocial.com/insights/best-times-to-post-on-social-media/
// Source for best times to post on the different sites, based off of global engagement

// package for twitter API
var Twit = require('twit');
var config = require('./config');
//?plat=twitter&hash=rainbow&time=cst


module.exports = async function (context, req) {
    console.log("Starting");
    // inputs for the function
    const platform = req.query.plat;
    const hashtag = req.query.hash;
    const timezone = req.query.time;
    //supported timezones are est, cst, mst, pst, akst, hst

    // initialize the response message
    var responseMessage = "";
    // initialize the response info object
    var responseInfo = {};
    
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
        responseMessage = "twitter";
        const twitterIdealTime = 9; // TODO find right time
        responseTime = calculateTime(twitterIdealTime, timezone);
        responseHashes = getTwitterHashes(hashtag);

    }else{
        responseMessage = "Error: Unsupported Platform";
    }

    if(responseTime == null){
        responseMessage = "Error: Unsupported Timezone";
    }else{
        responseInfo.platform = platform;
        responseInfo.time = responseTime;
        //responseInfo.hashtags = responseHashes;
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
function getTwitterHashes(hashtag){
    var T = new Twit(config);
    params = {
        q: "#" + hashtag + " -is:retweet",
        count: 50
    }
    console.log("Paramaters:")
    console.log(params);
    T.get('search/tweets', params, onDataRecieved);
    return "yep"
}

function onDataRecieved(err, data, response){
    var hashtagOccurances = []
    var tweets = data.statuses;
    for(var i = 0; i < tweets.length; i++){
        var hashtags = tweets[i].entities.hashtags;
        for(var j = 0; j < hashtags.length; j++){
            console.log(hashtags[j]);
            var inArrayLocation = null;
            var isInArray = false;
            for(let k = 0; k < hashtagOccurances.length; k++){
                var compareValOne = hashtagOccurances[k].hash;
                var compareValTwo = hashtags[j].text;
                if(hashtagOccurances[k].hash == hashtags[j].text){
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
                    hash: hashtags[j].text,
                    occur: 1
                });
            }
        }
    }
    hashtagOccurances.sort(function(a,b){
        return b.occur - a.occur;
    });
    console.log(hashtagOccurances);
}