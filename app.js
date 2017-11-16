require('dotenv').config()
var TwitterBot = require("node-twitterbot").TwitterBot
var ypi = require('youtube-playlist-info');

var tweetBot = new TwitterBot({
  "consumer_secret": process.env.TWITTER_CONSUMER_SECRET,
  "consumer_key": process.env.TWITTER_CONSUMER_KEY,
  "access_token": process.env.TWITTER_ACCESS_TOKEN,
  "access_token_secret": process.env.TWITTER_ACCESS_TOKEN_SECRET
});

ypi.playlistInfo("AIzaSyBBaAU0A2THJHmjD3EZkq-8-D6eUpexqUA", "PLbUlQ_lGL2i1uwmypSfyeiS1Eoxh8jqNB", function(playlistItems) {
  var video = playlistItems[Math.floor(Math.random()*playlistItems.length)];
  var videoUrl = 'https://www.youtube.com/watch?v=' + video.resourceId.videoId;
  var message = video.title + ' ' + videoUrl;

  console.log('Posting ' + message);
  tweetBot.tweet(message);

  });
