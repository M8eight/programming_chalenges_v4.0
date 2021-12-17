//lang- JS
let input = prompt('Enter expression in rpm format');
let val = input.split(' ');
const len = val.length;
let res = [];

for (let i = 0; i < len; i++) {
    if (val[i] != '+' && val[i] != '-' && val[i] != '*' && val[i] != '/') {
        res.push(parseInt(val[i]));
    } else {
        op1 = res.pop();
        op2 = res.pop();
        if (val[i] == '+') {
            res.push(op1 + op2);
        } else if (val[i] == '-') {
            res.push(op1 - op2);
        } else if (val[i] == '*') {
            res.push(op1 * op2);
        } else if (val[i] == '/') {
            res.push(op1 / op2);
        }
    }
}

document.write('Result: ' + res);