import { SOCKET_EVENTS } from '../config/socket.js'

const users = []

const addUser = (username) => {
  const name = username.trim().toLowerCase()
  const existingUser = users.find((username) => username === name)

  if (!username.trim()) return { error: 'Name is required' }

  if (existingUser) return { error: 'Name is taken' }

  users.push(name)

  return username 
}

const chat = (io) => {

  io.on(SOCKET_EVENTS.connection, (socket) => {
    console.log('socket id: ', socket.id)

    // USERNAME
    socket.on(SOCKET_EVENTS.username, (username, next) => {
      console.log('username: ', username)
      
      let result = addUser(username)

      if (result.error) {
        return next(result.error)
      } else {      
        io.emit(SOCKET_EVENTS.users, users)                                       // emite para todos
        socket.broadcast.emit(SOCKET_EVENTS.user_joined, `${username} joined`)    // emite para todos, exceto para o próprio emissor
      }
    })

    // MESSAGE
    socket.on(SOCKET_EVENTS.message_sent, (message) => {
      console.log("message:", message)
      
      io.emit(SOCKET_EVENTS.message_received, message)
    })

    // DISCONNECT
    socket.on(SOCKET_EVENTS.disconnect, () => {
      console.log('user disconnected')
    })
  })

}


export default chat