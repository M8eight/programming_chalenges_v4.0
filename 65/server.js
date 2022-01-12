const http = require('http');
const url = require('url');
var fs = require("fs");
var index = fs.readFileSync('lib/index.html');
var YoutubeMp3Downloader = require("youtube-mp3-downloader");

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
    var urlReq = url.parse(req.url, true);

    var YD = new YoutubeMp3Downloader({
        "ffmpegPath": 'externalLib/ffmpeg/ffmpeg.exe',
        "outputPath": "./video",
        "youtubeVideoQuality": "highestaudio",
        "progressTimeout": 2000,
        "allowWebm": false
    });

    var full = urlReq.query.full;
    var short = urlReq.query.short;

    // console.log('full length = ' + full.length + ' = "' + full + '" short length = ' + urlReq.query.short.length + ' = "' + urlReq.query.short + '"');

    if (full) {

        links = full.substring(32);

        YD.download(links);

        console.log('fulfilled (full links) ' + full);

        YD.on("progress", function (progress) {
            console.log('progress: ' + Math.round(parseInt(progress.progress.percentage)) + '%');
        });

        YD.on("error", function (error) {
            console.log(error);
        });

        YD.on("finished", function (err, data) {
            console.log('Success: ' + data.title);
        });

    } else if (short) {

        links = short.substring(17);

        YD.download(links);

        console.log('fulfilled (short links) ' + full);

        YD.on("progress", function (progress) {
            console.log('progress: ' + Math.round(parseInt(progress.progress.percentage)) + '%');
        });

        YD.on("error", function (error) {
            console.log(error);
        });

        YD.on("finished", function (err, data) {
            console.log('Success:' + data.title);
        });

    }
    res.end(index);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});