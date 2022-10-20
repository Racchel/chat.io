import { useState, useEffect } from 'react'
import { socket, SOCKET_EVENTS } from './config/socket'
import toast from 'react-hot-toast'

import { Login, Chat } from './pages'

function App() {

  const [username, setUsername] = useState('')
  const [connected, setConnected] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [typing, setTyping] = useState(false)

  if(message) {
    socket.emit(SOCKET_EVENTS.typing, username)
  }
  
  useEffect(() => {
    // MESSAGE
    socket.on(SOCKET_EVENTS.message_received, (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })

    socket.on(SOCKET_EVENTS.typing, (data) => {
      setTyping(data)

      setTimeout(() => {
        setTyping('')
      }, 1000)
    })

    
    return () => {
      socket.off(SOCKET_EVENTS.user_joined)
      socket.off(SOCKET_EVENTS.message_received)
      socket.off(SOCKET_EVENTS.typing)
    }
  }, [])
  
  useEffect(() => {
    // USER CONNECTED
    socket.on(SOCKET_EVENTS.user_connected, (user) => {
      user.connected = true
      user.messages = []
      user.hasNewMessages = false

      setUsers((prevUsers) => [...prevUsers, user])
      toast.success(`Novo usuário conectado: ${user.username}`)
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

    socket.on(SOCKET_EVENTS.username_taken, () => {
      toast.error('Username já utilizado!')
    })
    
    return () => {
      socket.off(SOCKET_EVENTS.users)
      socket.off(SOCKET_EVENTS.user_connected)
      socket.off(SOCKET_EVENTS.username_taken)
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
      toast.error(`${foundUser.username} saiu.`)
      
    })

    return () => {
      socket.off(SOCKET_EVENTS.user_disconnected)
    }
  }, [users, socket])


  const handleUsername = (e) => {
    e.preventDefault()

    if (!username) return toast.error('Username é obrigatório.')
    if (username.length < 3) return toast.error('Mínimo 3 caracteres.')
    if (username.length > 12) return toast.error('Máximo 12 caracteres.')

    socket.auth = { username }
    socket.connect()

    setTimeout(() => {
      if (socket.connected) return setConnected(true)
    }, 300)

  }

  const getTime = () => {
    const date = new Date()
    let currentHours = date.getHours()
    currentHours = ('0' + currentHours).slice(-2)

    let currentMinutes = date.getMinutes()
    currentMinutes = ('0' + currentMinutes).slice(-2)

    return `${currentHours}:${currentMinutes}`
  }

  const handleMessage = (e) => {
    e.preventDefault()

    const newMessage = { 
      content: message,
      time: getTime(),
      user: socket.auth.username,
      socketID: socket.id
    }

    socket.emit(SOCKET_EVENTS.message_sent, newMessage)
    setMessage('')
  }

  if (!connected) {
    return (
      <Login 
        handleSubmit={handleUsername} 
        inputValue={username} 
        setInputValue={setUsername} 
      />
    )
  }

  return (
    <Chat
      selectedUser={selectedUser}
      setSelectedUser={setSelectedUser}
      username={username}
      users={users}
      typing={typing}
      socket={socket}
      connected={connected}
      messages={messages}
      message={message} 
      handleMessage={handleMessage} 
      setMessage={setMessage} 
    />
  )

}

export default App
