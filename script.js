// Seleciona o visor e a lista de histórico
const display = document.getElementById('display');
const historyList = document.getElementById('history-list');

// Carrega histórico salvo (se houver)
let history = JSON.parse(localStorage.getItem('history')) || [];
renderHistory();

// Adiciona valor ao visor
function appendValue(value) {
  display.value += value;
}

// Limpa o visor
function clearDisplay() {
  display.value = '';
}

// Apaga o último caractere
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// Calcula o resultado e salva no histórico
function calculate() {
  try {
    const expression = display.value;
    const result = eval(expression);
    display.value = result;

    const item = `${expression} = ${result}`;
    history.unshift(item);
    if (history.length > 10) history.pop();

    localStorage.setItem('history', JSON.stringify(history));
    renderHistory();
  } catch {
    display.value = 'Erro';
  }
}

// Atualiza o histórico na tela
function renderHistory() {
  historyList.innerHTML = '';
  history.forEach(calc => {
    const li = document.createElement('li');
    li.textContent = calc;
    historyList.appendChild(li);
  });
}

// Permite o uso do teclado físico
document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
    appendValue(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key === 'Escape') {
    clearDisplay();
  }
});

// Limpa todo o histórico
function clearHistory() {
  history = [];
  localStorage.removeItem('history');
  renderHistory();
}
