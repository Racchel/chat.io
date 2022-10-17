import { useState, useEffect } from 'react'
import { socket, SOCKET_EVENTS } from './config/socket'
import { ConnectedUsers, Message, Form } from './components'


function App() {

  const [username, setUsername] = useState('')
  const [connected, setConnected] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    // USER JOINED
    socket.on(SOCKET_EVENTS.user_joined, (message) => {
      console.log('user joined:', message)
    })

    // MESSAGE
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
    // USER CONNECTED
    socket.on(SOCKET_EVENTS.user_connected, (user) => {
      user.connected = true
      user.messages = []
      user.hasNewMessages = false

      setUsers((prevUsers) => [...prevUsers, user])
    })

    // USERS
    socket.on(SOCKET_EVENTS.users, (listUsers) => {
      
      listUsers.forEach(user => {
        user.self = user.userID === socket.id
        user.connected = true
        user.messages = []
        user.hasNewMessages = false
      })

      setUsers(listUsers)
    })
    
    return () => {
      socket.off(SOCKET_EVENTS.users)
      socket.off(SOCKET_EVENTS.user_connected)
    }
  }, [socket])


  const handleUsername = (e) => {
    e.preventDefault()
    //socket.emit(SOCKET_EVENTS.username, username)
    //setConnected(true)

    socket.auth = { username }
    socket.connect()

    console.log(socket)

    setTimeout(() => {
      if (socket.connected) {
        console.log("socket.connected", socket)
        setConnected(true)
      }

    }, 300)

  }

  const handleMessage = (e) => {
    e.preventDefault()
    socket.emit(SOCKET_EVENTS.message_sent, `${username} - ${message}`)
    setMessage('')
  }

  return (
    <div className='container text-center'> 
      <ConnectedUsers 
        display={connected}
        usersList={users}
      />
     
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
          <Message 
            messagesList={messages}
            isPrimary={true}
          />        
        </div>

      </div>
    </div>
  );
}

export default App;
