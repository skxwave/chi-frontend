let activeInput = null;

document.getElementById('num1').addEventListener('focus', () => activeInput = 'num1');
document.getElementById('operation').addEventListener('focus', () => activeInput = 'operation');
document.getElementById('num2').addEventListener('focus', () => activeInput = 'num2');

function insertValue(value) {
    if (activeInput) {
        const field = document.getElementById(activeInput);
        field.value += value;
    }
}

function clearAll() {
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
    document.getElementById('operation').value = '';
}

document.getElementById('calculate').addEventListener('click', () => {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.getElementById('operation').value;

    if (isNaN(num1) || isNaN(num2)) {
      alert('Enter correct values');
      return;
    }

    if (!['+', '-', '*', '/'].includes(operation)) {
      alert('Enter correct operation (+, -, *, /)');
      return;
    }

    let result;
    switch (operation) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        if (num2 === 0) {
          alert('Divide by zero');
          return;
        }
        result = num1 / num2;
        break;
    }
    alert(`Result: ${result}`);
});