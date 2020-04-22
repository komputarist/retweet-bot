// set debug flag false

var debug = false

// Import twit library
var Twit = require('twit')

//include config file.
var config = require('./config.js')

// Use twit library with current configuration
var T = new Twit(config)

// This is the URL of a search for the latest tweets on the #hashtag.
var hastagSearch = { q: '#COVID19', count: 10, result_type: 'recent' }


// This function finds the latest tweet with the #hashtag, and retweets it.
function retweetLatest () {
  T.get('search/tweets', hastagSearch, function (error, data) {
    var tweets = data.statuses
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text)
    }
    // If no errors in making request to the server 
    if (!error) {
      // get tweet ID
      var retweetId = data.statuses[0].id_str
      // retweet the Tweet
      T.post('statuses/retweet/' + retweetId, {}, tweeted)
    }
    else {
      if (debug) {
        console.log('There was an error finding your hashtag:', error)
      }
    }
  })
}

function tweeted (err, reply) {
  if (err !== undefined) {
    console.log(err)
  } else {
    console.log('Tweeted: ' + reply)
  }
}

retweetLatest()
// ...and then every 10 minutes after that.
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 10 = 10 minutes --> 1000 * 60 * 10
setInterval(retweetLatest, 1000 * 60 * 1)
