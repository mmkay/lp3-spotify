var request = require("request");
var cheerio = require("cheerio");

// download lp3.pl's list of top songs of all time

var url = "http://www.lp3.pl/alpt.phtml?m=29";

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
		});
		console.log('Found ' + songs.length + ' songs');
	}
});
