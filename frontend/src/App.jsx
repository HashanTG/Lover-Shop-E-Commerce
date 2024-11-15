import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Imports 

import Button from './components/shared/button/Button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p>Hello World</p>
      <Button label="Click Me"  />
    </>
  )
}

export default App
