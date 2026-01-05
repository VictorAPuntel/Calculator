const display = document.querySelector('#display')
const historyEl = document.querySelector('#history')
let history = []
let firstValue = ''
let secondValue = ''
let operator = ''
let currentValue = 1

function reset() {
  firstValue = ''
  secondValue = ''
  operator = ''
  currentValue = 1
}

function clicked(button) {
  switch (button) {
    case 'c':
      reset()
      break
    case '×':
    case '+':
    case '-':
    case '÷':
      if (firstValue !== '') {
        operator = button
        currentValue = 2
        secondValue = ''
      }
      break
    case '.':
      if (currentValue === 1) {
        if (!firstValue.includes('.')) {
          firstValue = firstValue === '' ? '0.' : firstValue + '.'
        }
      } else {
        if (!secondValue.includes('.')) {
          secondValue = secondValue === '' ? '0.' : secondValue + '.'
        }
      }
      break
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      if (currentValue === 1) {
        firstValue += button
      }
      if (currentValue === 2) {
        secondValue += button
      }
      break
    case '=':
      if (currentValue === 2 && secondValue !== '') {
        let result = calculate(firstValue, operator, secondValue)
        history.push(`${firstValue} ${operator} ${secondValue} = ${result}`)
        reset()
        firstValue = String(result)
        updateHistory()
      }
      break
  }

  updateDisplay()
}

function updateDisplay() {
  if (currentValue === 1) {
    display.textContent = firstValue === '' ? '0' : firstValue
  } else {
    display.textContent = secondValue === '' ? '0' : secondValue
  }
}

function calculate(first, op, second) {
  first = parseFloat(first)
  second = parseFloat(second)

  switch (op) {
    case '+':
      return first + second
    case '-':
      return first - second
    case '×':
      return first * second
    case '÷':
      return first / second
    default:
      return 0
  }
}

function updateHistory() {
  historyEl.innerHTML = ''
  for (let entry of history) {
    const div = document.createElement('div')
    div.classList.add('history-item')
    div.textContent = entry
    historyEl.appendChild(div)
  }
}
