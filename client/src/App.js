import React, { useState, useEffect } from "react"

import { Listener } from './helpers/sockets'
import CanvasComponent from "./components/Canvas"
import './styles/app.scss'


function App() {
  const [response, setResponse] = useState("Loading...")

  useEffect(() => {
    Listener(handleSocket)
  }, [])

  const handleSocket = (type, data) => {
    switch (type){
      case 'connected':
        setResponse(data)
        break;
      default:
        return null
    }
  }

  return (
    <>
      <p>
        {response}
      </p>
      <CanvasComponent/>
    </>
  );
}

export default App;