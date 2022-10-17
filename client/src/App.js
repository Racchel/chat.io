import { useState, useEffect } from 'react'
import { socket, SOCKET_EVENTS } from './config/socket'
import { Form } from './components/Form'

function App() {

  const [username, setUsername] = useState('')
  const [connected, setConnected] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  
  useEffect(() => {
    socket.on(SOCKET_EVENTS.user_joined, (message) => {
      console.log('user joined:', message)
    })

    socket.on(SOCKET_EVENTS.message_received, (message) => {
      console.log('message:', message)
      setMessages((prevMessages) => [...prevMessages, message])
    })

    return () => {
      socket.off(SOCKET_EVENTS.user_joined)
      socket.off(SOCKET_EVENTS.message_received)
    }
  }, [])


  const handleUsername = (e) => {
    e.preventDefault()
    socket.emit(SOCKET_EVENTS.username, username)
    setConnected(true)
  }

  const handleMessage = (e) => {
    e.preventDefault()
    socket.emit(SOCKET_EVENTS.message_sent, `${username} - ${message}`)
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

        <div className='row'>
          <pre>
            {JSON.stringify(messages, null, 4)}
          </pre>
        </div>

      
      </div>
    </div>
  );
}

export default App;
