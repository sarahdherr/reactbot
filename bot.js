// DEPENDENCIES =======================================================
var twit = require('twit')
var config = require('./config')

var Twitter = new twit(config)

// RETWEET BOT ========================================================

// find latest tweet according to query 'q' in params
var retweet = function () {
  var params = {
    q: '#reactjs, #Reactjs', // REQUIRED
    result_type: 'recent', // optional, only searches the latest tweets
    lang: 'en' // optional
  }
  // for more parametes, see: https://dev.twitter.com/rest/reference/get/search/tweets

  Twitter.get('search/tweets', params, function (err, data) {
    // if there are no errors
    if (!err) {
      // grab ID of tweet to retweet
      var retweetId = data.statuses[0].id_str
      // Tell TWITTER to retweet
      Twitter.post('/statuses/retweet/:id', {
        id: retweetId
      }, function (err, response) {
        if (response) {
          console.log('Retweeted!!!')
        }
        // if there was an error while tweeting
        if (err) {
          console.log('Something went wrong while RETWEETING...Duplication maybe...')
        }
      })
    } else {
      console.log('Something went wrong while SEARCHING...')
    }
  })
}

// grab & retweet as soon as program is running...
retweet()
// retweet in every 50 minutes
setInterval(retweet, 300000)

// FAVORITE BOT =======================================================

// find a random tweet and 'favorite' it
var favoriteTweet = function () {
  var params = {
    q: '#reactjs, #Reactjs', // REQUIRED
    result_type: 'recent',
    lang: 'en'
  }

  // find the tweet
  Twitter.get('search/tweets', params, function (err, data) {

    //find tweets
    var tweet = data.statuses
    var randomTweet = ranDom(tweet) // pick a random tweet

    // if random tweet exists
    if (typeof randomTweet !== 'undefined') {
      // Tell TWITTER to 'favorite'
      Twitter.post('favorites/create', {id: randomTweet.id_str}, function (err, response) {
        // if there was an error while 'favorite'
        if (err) {
          console.log('CANNOT BE FAVORITE...Error')
        } else {
          console.log('FAVORITED...Success!!')
        }
      })
    }
  })
}

// grab & 'favorite' as soon as program is running...
favoriteTweet()

// 'favorite' a tweet in every 60 minutes
setInterval(favoriteTweet, 36000)

// function to generate a random tweet tweet
function ranDom (arr) { // Note that the tweets searched by out bot are all stored in an array
  var index = Math.floor(Math.random() * arr.length)
  return arr[index]
}
