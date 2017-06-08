// config.js
/** TWITTER APP CONFIGURATION
 * consumer_key
 * consumer_secret
 * access_token
 * access_token_secret
*/
var tokens = require('./tokens')

module.exports = {
  consumer_key: tokens.TWITTER_KEY,
  consumer_secret: tokens.TWITTER_SECRET,
  access_token: tokens.TWITTER_TOKEN,
  access_token_secret: tokens.TWITTER_TOKEN_SECRET
}
