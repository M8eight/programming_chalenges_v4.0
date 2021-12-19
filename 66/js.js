hexadecimal = document.getElementById('decimal');
binary = document.getElementById('binary');


hexadecimal.addEventListener('click', function () {
    let text = document.getElementById('text').value;
    let res = document.getElementById('res');
    let output = '';

    for (let i = 0; i < text.length; i++) {
        output += text[i].charCodeAt(0).toString(16) + ' ';
    }

    res.value = output;
    console.log(output);
});

binary.addEventListener('click', function () {

    let text = document.getElementById('text').value;
    let res = document.getElementById('res');
    let output = '';

    for (let i = 0; i < text.length; i++) {
        output += text[i].charCodeAt(0).toString(2) + ' ';
    }

    res.value = output;
    console.log(output);
});