var request = require("request");
var cheerio = require("cheerio");
var SpotifyWebApi = require("spotify-web-api-node");
var spotifyApi = new SpotifyWebApi();

// TODO create public playlist

// download lp3.pl's list of top songs of all time

var url = "http://www.lp3.pl/alpt.phtml?m=29";

var count = 0;

request(url, function(error, response, html) {
	if (!error) {
		var songs = [];
		var src = cheerio.load(html);
		src(".toL").map(function(i, elem) {
			var singer = src(this).find('.wykon').text();
			var title = src(this).find('.tytul').text();
			var song = {
				singer: singer,
				title: title
			};
			songs.push(song);
			
			count++;
			if (count === 5) {
				spotifyApi.searchTracks("track:" + title + " artist:" + singer)
					.then(function(data) {
						console.log(data.body.tracks.items);
					}, function(err) {
						console.log("Error downloading data");
						console.log(err);
					});
			}
		});
		console.log('Found ' + songs.length + ' songs');
	}
});
