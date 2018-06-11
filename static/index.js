const Joy = require('../src/joy/joy')

function InputHistory () {
  const history = []
  let pointer = 0

  function append (input) {
    history.push(input)
    pointer = history.length
  }

  function prev () {
    if (pointer > 0) { pointer -= 1 }
    return history[pointer]
  }

  function next () {
    if (pointer < history.length) { pointer += 1 }
    return history[pointer]
  }

  return {
    append: append,
    prev: prev,
    next: next
  }
}

const inputEl = document.querySelector('[name=input]')
const outputEl = document.querySelector('.output-result')
const history = InputHistory()
const joy = Joy()

function runInput (input) {
  try {
    const result = joy.run(input)
    outputEl.textContent = result
    history.append(input)
    inputEl.value = ''
  } catch (e) {
    outputEl.textContent = e.toString()
    throw e
  }
}

function prevInput () {
  inputEl.value = history.prev() || ''
}

function nextInput () {
  inputEl.value = history.next() || ''
}

function onInputKeydown (e) {
  if (e.which === 13 /* Enter */ && !e.shiftKey) {
    e.preventDefault()
    runInput(inputEl.value.trim())
  } else if (e.key === 'p' && e.ctrlKey) {
    e.preventDefault()
    prevInput()
  } else if (e.key === 'n' && e.ctrlKey) {
    e.preventDefault()
    nextInput()
  }
}

inputEl.addEventListener('keydown', onInputKeydown)
