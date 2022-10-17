import { useState, useEffect } from 'react'
import socket from './config/socket'
import { Form } from './components/Form'

function App() {

  const [username, setUsername] = useState('')
  const [connected, setConnected] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  
  useEffect(() => {
    socket.on('user joined', msg => {
      console.log('user joined message', msg)
    })

    return () => {
      socket.off('user joined')
    }
  }, [])


  const handleUsername = (e) => {
    e.preventDefault()
    socket.emit('username', username)
    setConnected(true)
  }

  const handleMessage = (e) => {
    e.preventDefault()
    socket.emit('message', `${username} - ${message}`)
    setMessage('')
  }

  return (
    <div className='container text-center'> 
      <div className='row'> 

        <Form 
          display={!connected}
          handleSubmit={handleUsername} 
          inputValue={username} 
          setInputValue={setUsername} 
          inputPlaceholder='Digite seu nome'
          buttonName='Entrar'
        />

        <Form 
          display={connected}
          handleSubmit={handleMessage} 
          inputValue={message} 
          setInputValue={setMessage} 
          inputPlaceholder='Digite sua mensagem'
          buttonName='Enviar'
        />

      
      </div>
    </div>
  );
}

export default App;
