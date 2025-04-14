// Algväärtused
let currentInput = '0';
let calculationHistory = [];

// Laadi arvutuste ajalugu lehe avamisel
window.onload = async function() {
    await fetchHistory();
    updateDisplay();
};

// Ekraani uuendamine
function updateDisplay() {
    document.getElementById('display').textContent = currentInput;
}

// Numbri või operaatori lisamine ekraanile
function appendToDisplay(value) {
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    updateDisplay();
}

// Ekraani tühjendamine
function clearDisplay() {
    currentInput = '0';
    updateDisplay();
}

// Viimase märgi kustutamine
function backspace() {
    if (currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

// Arvutamine
async function calculate() {
    try {
        // Salvesta algne avaldis
        const expression = currentInput;

        // Arvuta tulemus
        const result = eval(currentInput);

        // Vorminda tulemus (kui on ujukomaarvud)
        const formattedResult = Number.isInteger(result) ? result.toString() : result.toFixed(2);

        // Salvesta arvutus andmebaasi
        await saveCalculation(expression, formattedResult);

        // Uuenda ekraani ja ajalugu
        currentInput = formattedResult;
        updateDisplay();
        await fetchHistory();

    } catch (error) {
        currentInput = 'Viga';
        updateDisplay();
        setTimeout(clearDisplay, 1000);
    }
}

// Ajaloo tühjendamine
async function clearHistory() {
    try {
        const response = await fetch('/api/calculations', {
            method: 'DELETE'
        });

        if (response.ok) {
            calculationHistory = [];
            updateHistoryDisplay();
        } else {
            console.error('Viga ajaloo kustutamisel');
        }
    } catch (error) {
        console.error('Viga ajaloo kustutamisel:', error);
    }
}

// Arvutuse salvestamine andmebaasi
async function saveCalculation(expression, result) {
    try {
        const response = await fetch('/api/calculations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                expression,
                result
            }),
        });

        if (!response.ok) {
            throw new Error('Viga arvutuse salvestamisel');
        }

    } catch (error) {
        console.error('Viga arvutuse salvestamisel:', error);
    }
}

// Ajaloo laadimine serverist
async function fetchHistory() {
    try {
        const response = await fetch('/api/calculations');

        if (response.ok) {
            calculationHistory = await response.json();
            updateHistoryDisplay();
        } else {
            console.error('Viga ajaloo laadimisel');
        }
    } catch (error) {
        console.error('Viga ajaloo laadimisel:', error);
    }
}

// Ajaloo kuvamine
function updateHistoryDisplay() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    calculationHistory.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.textContent = `${item.expression} = ${item.result}`;
        historyList.appendChild(historyItem);
    });
}