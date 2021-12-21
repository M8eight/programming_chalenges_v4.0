function runFunction(url) {
    var YoutubeMp3Downloader = require("youtube-mp3-downloader");

    var YD = new YoutubeMp3Downloader({
        "ffmpegPath": 'ffmpeg',
        "youtubeVideoQuality": "highestaudio",
        "progressTimeout": 2000,
        "allowWebm": false
    });

    YD.download('XrsxODfwlIs', 'adasdaf')

    YD.on("finished", function (err, data) {
        exports.finished = JSON.stringify(data);
    });

    YD.on("error", function (error) {
        exports.error = error;
    });

    YD.on("progress", function (progress) {
        exports.progress = JSON.stringify(progress);
    });
}