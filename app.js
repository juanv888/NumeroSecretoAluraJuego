let secretNumber = 0;
let tries = 0;
let sortNumberList = [];
let maxNumber = 10;

function assignElementText(element, text) {
    let title = document.querySelector(element);
    title.innerHTML = text;
}

function userTrying() {
    let userNumber = parseInt(document.getElementById('valueNumber').value);

    if (userNumber === secretNumber) {
        assignElementText('p', `Acertaste el número en ${tries} ${(tries === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reset').removeAttribute('disabled');
        // Almacenar el número secreto adivinado en el array
        if (!sortNumberList.includes(secretNumber)) {
            sortNumberList.push(secretNumber);
        }
    } else {
        if (userNumber > secretNumber) {
            assignElementText('p', 'El número secreto es menor');
        } else {
            assignElementText('p', 'El número secreto es mayor');
        }
        tries++;
    }

    cleanBox();
}

function cleanBox() {
    document.querySelector('#valueNumber').value = '';
}

function generateSecretNumber() {
    if (sortNumberList.length === maxNumber) {
        assignElementText('p', 'Ya se sortearon todos los números posibles');
        document.getElementById('reset').removeAttribute('disabled'); // Habilitar el botón de reinicio
        return null; // No devolver ningún número
    } else {
        let generatedNumber = Math.floor(Math.random() * 10) + 1;

        console.log(generatedNumber);
        console.log(sortNumberList);

        if (sortNumberList.includes(generatedNumber)) {
            return generateSecretNumber();
        } else {
            return generatedNumber;
        }
    }
}

function initialCondition() {
    assignElementText('h1', 'Juego del número secreto');
    assignElementText('p', 'Indica un número del 1 al 10');
    // Inicializar el número secreto
    secretNumber = generateSecretNumber();
    if (secretNumber !== null) {
        // Inicializar el número de intentos
        tries = 1;
        document.querySelector('#reset').setAttribute('disabled', 'true'); // Deshabilitar el botón de reinicio
    }
}

function resetGame() {
    // Limpiar la caja de texto
    cleanBox();
    // Mostrar los primeros mensajes
    initialCondition();
    // Deshabilitar el botón de nuevo juego
    document.querySelector('#reset').setAttribute('disabled', 'true');
}

initialCondition();