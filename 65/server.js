const http = require('http');
const url = require('url');
var fs = require("fs");
var index = fs.readFileSync('lib/index.html');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
    let urlReq = url.parse(req.url, true);

    if (urlReq.query.full != undefined) {

        console.log('fulfilled ' + urlReq.query.full);

        if (urlReq.query.full != undefined) {
            let links = '';
            links = urlReq.query.full.substring(32);
            var regex = new RegExp(/\w*/);
            var linksKey = links.match(regex);

            var YoutubeMp3Downloader = require("youtube-mp3-downloader");
            var YD = new YoutubeMp3Downloader({
                "ffmpegPath": 'externalLib/ffmpeg/ffmpeg.exe',
                "outputPath": "./video",
                "youtubeVideoQuality": "highestaudio",
                "progressTimeout": 2000,
                "allowWebm": false
            });
            YD.download(links);

            YD.on("finished", function (err, data) {
                console.log('Success: url ' + data.youtubeUrl + ' ' + 'title ' + data.title + '\\n');
            });

            YD.on("error", function (error) {
                console.log(error);
            });

            YD.on("progress", function (progress) {
                console.log('progress: ' + Math.round(parseInt(progress.progress.percentage)) + '%');
            });
        }
            // else {
            //     let links = '';
            //     links = urlReq.query.short.substring(17);

            //     var YoutubeMp3Downloader = require("youtube-mp3-downloader");
            //     var YD = new YoutubeMp3Downloader({
            //         "ffmpegPath": 'ffmpeg',
            //         "outputPath": "./video",
            //         "youtubeVideoQuality": "highestaudio",
            //         "progressTimeout": 1000,
            //         "allowWebm": false
            //     });

            //     YD.download(links, 'render');

            //     YD.on("finished", function (err, data) {
            //         console.log(JSON.stringify(data));
            //     });

            //     YD.on("error", function (error) {
            //         console.log(error);
            //     });

            //     YD.on("progress", function (progress) {
            //         console.log(JSON.stringify(progress));
            //     });

            // }

        }

        res.end(index);
    });

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});