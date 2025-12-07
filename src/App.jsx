import { useState } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  const handleNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num))
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const handleOperation = (op) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const result = calculate(previousValue, inputValue, operation)
      setDisplay(String(result))
      setPreviousValue(result)
    }

    setWaitingForNewValue(true)
    setOperation(op)
  }

  const calculate = (firstValue, secondValue, op) => {
    switch (op) {
      case '+':
        return firstValue + secondValue
      case '*':
        return firstValue * secondValue
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const inputValue = parseFloat(display)
      const result = calculate(previousValue, inputValue, operation)
      setDisplay(String(result))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display">
          <div className="display-value">{display}</div>
        </div>
        <div className="buttons">
          <button className="btn-clear" onClick={handleClear}>C</button>
          <button className="btn-number" onClick={() => handleNumber(7)}>7</button>
          <button className="btn-number" onClick={() => handleNumber(8)}>8</button>
          <button className="btn-number" onClick={() => handleNumber(9)}>9</button>
          
          <button className="btn-number" onClick={() => handleNumber(4)}>4</button>
          <button className="btn-number" onClick={() => handleNumber(5)}>5</button>
          <button className="btn-number" onClick={() => handleNumber(6)}>6</button>
          <button className="btn-operation" onClick={() => handleOperation('+')}>+</button>
          
          <button className="btn-number" onClick={() => handleNumber(1)}>1</button>
          <button className="btn-number" onClick={() => handleNumber(2)}>2</button>
          <button className="btn-number" onClick={() => handleNumber(3)}>3</button>
          <button className="btn-operation" onClick={() => handleOperation('*')}>×</button>
          
          <button className="btn-number btn-zero" onClick={() => handleNumber(0)}>0</button>
          <button className="btn-equals" onClick={handleEquals}>=</button>
        </div>
      </div>
    </div>
  )
}

export default App
