var params = window
    .location
    .search
    .replace('?', '')
    .split('&')
    .reduce(
        function (p, e) {
            var a = e.split('=');
            p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
            return p;
        },
        {}
);

let all = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
let letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
let number = "0123456789";
let text = "";

function genPass(option, length) {
    let gen;
    let lengthDef = 10;

    if (option == 'numbers') {
        gen = letter;
    } else if (option == 'text') {
        gen = number;
    } else {
        gen = all;
    }

    if (length) {
        lengthDef = length;
    }

    for (var i = 0; i < lengthDef; i++) {
        text += gen.charAt(Math.floor(Math.random() * gen.length));
    }

    return text;
}

if (params['on']) {
    document.write('<h1> You password: ' + genPass(params['option'], params['how']) + '</h1>');
}