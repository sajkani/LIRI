//Declar initial API and created variables
var fs = require('fs');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var keys = require('./keys.js');
var twitterKeys = keys.twitterKeys;
var cmdArgs = process.argv;
var liriCommand = cmdArgs[2];
var liriArg = '';

for (var i = 3; i < cmdArgs.length; i++) {
	liriArg += cmdArgs[i] + ' ';
}

function retrieveTweets() {
	fs.appendFile('./log.txt', 'User Command: node liri.js my-tweets\n\n', (err) => {
		if (err) throw err;
	});
	var client = new Twitter(twitterKeys);

	var params = {screen_name: 'sajkaniDev', count: 20};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (error) {
			var errorStr = 'ERROR: Retrieving user tweets -- ' + error;

			fs.appendFile('./log.txt', errorStr, (err) => {
				if (err) throw err;
				console.log(errorStr);
			});
			return;
		} else {

			var outputStr = '------------------------\n' +
							'User Tweets:\n' + 
							'------------------------\n\n';

			for (var i = 0; i < tweets.length; i++) {
				outputStr += 'Created on: ' + tweets[i].created_at + '\n' + 
							 'Tweet content: ' + tweets[i].text + '\n' +
							 '------------------------\n';
			}

			fs.appendFile('./log.txt', 'LIRI Response:\n\n' + outputStr + '\n', (err) => {
				if (err) throw err;
				console.log(outputStr);
			});
		}
	});
}
retrieveTweets(); 