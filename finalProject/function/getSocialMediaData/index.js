//https://sproutsocial.com/insights/best-times-to-post-on-social-media/
// Source for best times to post on the different sites, based off of global engagement

var Twit = require('twit');

module.exports = async function (context, req) {
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
        //responseHashes = getTwitterHashes(hashtag);

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

//gets related hashtags from facebook
function getFacebookHashes(hashtag){
    posts = fetch()
}

//gets related hashtags from instagram
function getInstagramHashes(hashtag){
    
}

//gets related hashtags from twitter
function getTwitterHashes(hashtag){
    
}