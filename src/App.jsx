import { useState } from 'react'
import Mitayi from './Mitayi'
import Daddy from './Daddy'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
     <Daddy/>
    </div>
  )
}

export default App
