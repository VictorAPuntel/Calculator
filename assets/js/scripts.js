const display = document.querySelector('#display')
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
      }
      break
    case '.':
      if (
        currentValue === 1 &&
        firstValue !== '' &&
        !firstValue.includes('.')
      ) {
        firstValue += '.'
      }
      if (
        currentValue === 2 &&
        secondValue !== '' &&
        !secondValue.includes('.')
      ) {
        secondValue += '.'
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
        reset()
        firstValue = result
      }
      break
  }

  updateDisplay()
}

function updateDisplay() {
  if (firstValue === '') {
    display.innerHTML = '0'
  } else {
    display.innerHTML = firstValue + operator + secondValue
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
