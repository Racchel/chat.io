import { useState, useEffect } from 'react'
import { socket, SOCKET_EVENTS } from './config/socket'
import { ChatHistory, Form, UserList} from './components'

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

      const sorted = listUsers.sort((a, b) => {
        if (a.self) return -1
        if (b.self) return 1
        if (a.username < b.username) return -1
        return a.username > b.username ? 1 : 0
      })

      setUsers(sorted)
    })
    
    return () => {
      socket.off(SOCKET_EVENTS.users)
      socket.off(SOCKET_EVENTS.user_connected)
    }
  }, [socket])


  useEffect(() => { 
    socket.on(SOCKET_EVENTS.user_disconnected, (id) => {
      let allUsers = users

      let index = allUsers.findIndex(user => user.userID === id)
      let foundUser = allUsers[index]
      foundUser.connected = false

      allUsers[index] = foundUser

      setUsers([...allUsers])
      
    })

    return () => {
      socket.off(SOCKET_EVENTS.user_disconnected)
    }
  }, [users, socket])


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

    console.log('socket', socket)
    e.preventDefault()

    const newMessage = { 
      datetime: '10:10 AM, Today',
      content: message,
      user: socket.auth.username,
      socketID: socket.id
    }

    socket.emit(SOCKET_EVENTS.message_sent, newMessage)
    setMessage('')
  }

  return (
    <div class="container-fluid">
      <div class="row clearfix">
          <div class="col-lg-12">
              <div class="card chat-app">
                <UserList
                  list={users}
                />

                <div class="chat">
                  <div class="chat-header clearfix">
                    <div class="row">
                      <h2>MY CHAT</h2>
                      <Form 
                        display={!connected}
                        handleSubmit={handleUsername} 
                        inputValue={username} 
                        setInputValue={setUsername} 
                        inputPlaceholder='Digite seu nome...'
                        buttonName='Entrar'
                      />
                    </div>
                  </div>
                  

                  <ChatHistory 
                    messages={messages}
                    socketID={socket.id}
                  />

                  <Form 
                    display={connected}
                    handleSubmit={handleMessage} 
                    inputValue={message} 
                    setInputValue={setMessage} 
                    inputPlaceholder='Digite sua mensagem...'
                    buttonName='Enviar'
                  />

                </div>
              </div>
          </div>
      </div>
    </div>
  );
}

export default App;
