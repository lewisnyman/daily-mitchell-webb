require('dotenv').config()
var TwitterBot = require("node-twitterbot").TwitterBot
var SlackBots = require('slackbots');
var ypi = require('youtube-playlist-info');

var tweetBot = new TwitterBot({
  "consumer_secret": process.env.TWITTER_CONSUMER_SECRET,
  "consumer_key": process.env.TWITTER_CONSUMER_KEY,
  "access_token": process.env.TWITTER_ACCESS_TOKEN,
  "access_token_secret": process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var slackBot = new SlackBots({
  token: process.env.SLACK_TOKEN // Add a bot https://my.slack.com/services/new/bot and put the token
});
var params = {
  as_user: true
};


ypi.playlistInfo("AIzaSyBBaAU0A2THJHmjD3EZkq-8-D6eUpexqUA", "PLbUlQ_lGL2i1uwmypSfyeiS1Eoxh8jqNB", function(playlistItems) {
  var video = playlistItems[Math.floor(Math.random()*playlistItems.length)];
  var videoUrl = 'https://www.youtube.com/watch?v=' + video.resourceId.videoId;
  var message = video.title + ' ' + videoUrl;

  var now = new Date();

  console.log('Posting ' + message);
  tweetBot.tweet(message);

  // If today is Saturday or Sunday then don't post a message.
  console.log('Day is' + now.getDay());
  if (now.getDay() != 0 || now.getDay() != 6) {
    slackBot.postMessageToChannel('random', message, params).fail(function(data) {
      console.log(data);
    }).then(function(data) {
      process.exit();
    });
  }
  });
