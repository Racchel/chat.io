import { useState, useEffect } from 'react'
import { socket, SOCKET_EVENTS } from './config/socket'
import toast from 'react-hot-toast'

import { Login, Chat } from './pages'

function App() {

  const [connected, setConnected] = useState(false)
  
  // message
  const [message, setMessage] = useState('')
  const [privateMessage, setPrivateMessage] = useState('')
  const [typing, setTyping] = useState(false)
  
  // listMessages
  const [messages, setMessages] = useState([])
  
  //users
  const [username, setUsername] = useState('')
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)


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

  useEffect(() => { console.log("users mudouuuuu", users)}, [users])


  useEffect(() => {
    socket.on(SOCKET_EVENTS.private_message_received, (data) => {
     // console.log('message >', message, ' from > ', from)
     
     let allUsers = users
     
      let index = allUsers.findIndex(u => u.userID === data.from)
      let foundUser = allUsers[index]                 
      
      foundUser.messages.push({
        ...data.message,
        fromSelf: false
      })

      if (foundUser) {
        if (selectedUser) {
          if (foundUser.userID !== selectedUser.userID) {
            foundUser.hasNewMessages = true
          } else {
            foundUser.hasNewMessages = false
          }
        }
      }
       

      allUsers[index] = foundUser
      setUsers([...allUsers])
      
      return () => {
        socket.off(SOCKET_EVENTS.private_message_received)
      }
    })

  }, [users])


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


  const handleUsernameClick = (user) => {

    if (!user) return setSelectedUser(null)

    if (user.self || !user.connected) return

    setSelectedUser({...user, hasNewMessages: false })


    let allUsers = users

    let index = allUsers.findIndex(u => u.userID === user.userID)
    let foundUser = allUsers[index]
    foundUser.hasNewMessages = false

    allUsers[index] = foundUser
    setUsers([...allUsers])
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

  const handlePrivateMessage = (e) => {
    e.preventDefault()

    if (selectedUser) {

      const newMessage = { 
        to: selectedUser.userID,
        message: {
          content: privateMessage,
          time: getTime(),
          user: username,
          socketID: socket.id
        }
      }

      socket.emit(SOCKET_EVENTS.private_message_sent, newMessage)

      let updated = selectedUser;

      updated.messages.push(({
        content: privateMessage,
        fromSelf: true,
        hasNewMessages: false
      }));

      setSelectedUser(updated)
      setPrivateMessage('')
    }
 
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


  // private
  if (selectedUser) {
    return (
      <>
        <Chat
          selectedUser={selectedUser}
          handleUsernameClick={handleUsernameClick}
          username={username}
          users={users}
          typing={typing}
          socket={socket}
          connected={connected}
          messages={selectedUser.messages}
          message={privateMessage} 
          handleMessage={handlePrivateMessage} 
          setMessage={setPrivateMessage} 
        />
      </>
    )
  }

  // public
  return (
    <Chat
      selectedUser={selectedUser}
      handleUsernameClick={handleUsernameClick}
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
