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

  // middleware
  io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    console.log('username on handshake', username)

    if(!username) {
      return next(new Error('invalid username'))
    }

    socket.username = username;
    next()
  })

  io.on(SOCKET_EVENTS.connection, (socket) => {
    console.log('socket id: ', socket.id)

    /**
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
    */


    let users = []
    for (let [id, socket] of io.of('/').sockets) {
      const existingUser = users.find((user) => user.username === socket.username)
      
      if(existingUser) {
        socket.emit('username taken')
        socket.disconnect()
        return
      } else {
        users.push({
          userID: id,
          username: socket.username
        })
      }
    }

    socket.emit(SOCKET_EVENTS.users, users)


    // when a new user joins, notify existing users
    socket.broadcast.emit(SOCKET_EVENTS.user_connected, {
      userID: socket.id,
      username: socket.username
    }) 

    // MESSAGE
    socket.on(SOCKET_EVENTS.message_sent, (message) => {
      console.log("message:", message)
      
      io.emit(SOCKET_EVENTS.message_received, message)
    })

    // DISCONNECT
    socket.on(SOCKET_EVENTS.disconnect, () => {
      socket.broadcast.emit(SOCKET_EVENTS.user_disconnected, socket.id)
    })
  })

}


export default chat