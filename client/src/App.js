import { useState, useEffect } from 'react'
import { socket, SOCKET_EVENTS } from './config/socket'
import { Form, Card } from './components'

function App() {

  const [username, setUsername] = useState('')
  const [connected, setConnected] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  
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
  
  useEffect(() => {
    socket.on(SOCKET_EVENTS.users, (listUsers) => {
      setUsers(listUsers)
    })
    
    return () => {
      socket.off(SOCKET_EVENTS.users)
    }
  }, [socket])


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

        <div className='row pt-5'>
          <Card 
            list={messages}
            isBig={true}
            isPrimary={true}
          />

          <Card 
            list={users}
            isBig={false}
            isPrimary={false}
          />
        </div>

      </div>
    </div>
  );
}

export default App;
