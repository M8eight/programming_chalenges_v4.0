encryptEng = document.getElementById('startEncEng');
decryptEng = document.getElementById('startDecEng');

encryptRus = document.getElementById('startEncRus');
decryptRus = document.getElementById('startDecRus');


engLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
rot13LetterEng = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';

letterRus = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя';
rot13LetterRus = 'МНОПРСТУФХЦЧШЩЪЫЬЭЮЯАБВГДЕЁЖЗИЙКЛмнопрстуфхцчшщъыьэюяабвгдеёжзийкл';

//eng
encryptEng.addEventListener('click', function () {
    res = document.getElementById('resEncEng');
    let output = '';
    let text = document.getElementById('textEncEng').value;

    for (let i = 0; i < text.length; i++) {
        index = engLetter.indexOf(text[i]);
        if (index == -1) {
            output += text[i];
            continue;
        }
        output += rot13LetterEng[index]; 
    }

    console.log(output);
    res.value = output;
});

decryptEng.addEventListener('click', function () {
    res = document.getElementById('resDecEng');
    let output = '';
    let text = document.getElementById('textDecEng').value;

    for (let i = 0; i < text.length; i++) {
        index = rot13LetterEng.indexOf(text[i]);
        if (index == -1) {
            output += text[i];
            continue;
        }
        output += engLetter[index]; 
    }

    console.log(output);
    res.value = output;
});

//rus
encryptRus.addEventListener('click', function () {
    res = document.getElementById('resEncRus');
    let output = '';
    let text = document.getElementById('textEncRus').value;

    for (let i = 0; i < text.length; i++) {
        index = letterRus.indexOf(text[i]);
        if (index == -1) {
            output += text[i];
            continue;
        }
        output += rot13LetterRus[index]; 
    }

    console.log(output);
    res.value = output;
});

decryptRus.addEventListener('click', function () {
    res = document.getElementById('resDecRus');
    let output = '';
    let text = document.getElementById('textDecRus').value;

    for (let i = 0; i < text.length; i++) {
        index = rot13LetterRus.indexOf(text[i]);
        if (index == -1) {
            output += text[i];
            continue;
        }
        output += letterRus[index]; 
    }

    console.log(output);
    res.value = output;
});
