var mass = [];
for (let i = 0; i < 101; i++) {
    mass[i] = i;
}
for (let i = 0; i < 101; i++) {
    if (mass[i] == 0) {
        console.log(mass[i]);
        continue;
    } else if (mass[i] % 5 == 0 && mass[i] % 3 == 0) {
        console.log('fizz buzz');
        continue;
    } else if (mass[i] % 3 == 0) {
        console.log('fizz');
        continue;
    } else if (mass[i] % 5 == 0) {
        console.log('buzz');
        continue;
    } else {
        console.log(mass[i]);
    }

}

//I don`t know assembly :(