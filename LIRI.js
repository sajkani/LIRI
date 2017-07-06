let spotify = require('spotify');
let twitter = require('twitter');
let request = require('request');
let fs = require("fs");
let input = process.argv[2];
let requestID = process.argv[3];
const keys = require('./keys.js');
var twitterKeys = keys.twitterKeys;
var cmdArgs = process.argv;
var liriCommand = cmdArgs[2];
var liriArg = '';



switch (input) {

	case "my-tweets":
	getTweets();
	break;

	case "spotify-this-song":
	getSongs( requestID );
	break;

	case "movie-this":
	getMovies( requestID );
	break;

	case "do-what-it-says":
	random();
	break;
}

log();

function getTweets() {
    fs.appendFile('./log.txt', 'User Command: node liri.js my-tweets\n\n', (err) => {
        if (err) throw err;
    });
    var client = new twitter(twitterKeys);

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
                            'My Recent Tweets:\n' + 
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

function getSongs( songName ) {


	spotify.get

	spotify.search({ type: 'track', query: songName }, function(err, data) {
		console.log(data);
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }

});
}

function getMovies( movieTitle ) {

	if (!movieTitle) {
		movieTitle = "Mr Nobody"
	}
	
	request('http://www.omdbapi.com/?apikey=40e9cece&tomatoes=true&t=' + movieTitle, function (error, response, body) {

		let movie = JSON.parse(body);
       
        console.log(" ");
        console.log(" ");
        console.log("Displaying Movie Results for: " + movie.Title);
        console.log("==========================================================================");
        console.log(" ");
	    console.log("Title: " + movie.Title);
        console.log(" ");
		console.log("Released in: " + movie.Year);
        console.log(" ");
		console.log("IMDB Ratiing: " + movie.imdbRating);
        console.log(" ");
		console.log("Countries Produced: " + movie.Country);
        console.log(" ");
		console.log("Language(s): " + movie.Language);
        console.log(" ");
		console.log("Plot: " +movie.Plot);
        console.log(" ");
		console.log("Actors: " + movie.Actors);
        console.log(" ");
        console.log("Rotten Tomatoes Score: " + movie.Ratings[1].Value);
        console.log(" ");
        console.log("Rotten Tomatoes URL: " + movie.tomatoURL);
        console.log(" ");
        console.log(" ");
                

	});

}

function random() {

	fs.readFile("random.txt", "utf8", function(err, data) {
		data = data.split(",");

		input = data[0].trim();
		requestID = data[1].trim();

		switch (input) {

			case "my-tweets":
			getTweet();
			break;

			case "spotify-this-song":
			getSongs( requestID );
			break;

			case "movie-this":
			getMovies( requestID );
			break;

			case "do-what-it-says":
			random();
			break;
		}
	});
}

function log() {

	if (!process.argv[3]) {
		fs.appendFile("log.txt", process.argv[2] + ", ");
	} else {

	fs.appendFile("log.txt", process.argv[2] + " " + process.argv[3] + ", ");

	}
}