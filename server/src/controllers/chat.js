import { SOCKET_EVENTS } from '../config/socket.js'

const chat = (io) => {

  // middleware
  io.use((socket, next) => {
    const username = socket.handshake.auth.username

    if(!username) {
      return next(new Error('Username inválido'))
    }

    socket.username = username
    next()
  })

  io.on(SOCKET_EVENTS.connection, (socket) => {
    let users = []
    for (let [id, socket] of io.of('/').sockets) {
      const existingUser = users.find((user) => user.username === socket.username)
      
      if(existingUser) {
        socket.emit(SOCKET_EVENTS.username_taken)
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
     io.emit(SOCKET_EVENTS.message_received, message)
    })

    socket.on(SOCKET_EVENTS.typing, (username) => {
      socket.broadcast.emit(SOCKET_EVENTS.typing, `${username} está digitando...`)
    })

    socket.on(SOCKET_EVENTS.private_message_sent, ({ message, to }) => {
      socket.to(to).emit(SOCKET_EVENTS.private_message_received, {
        message,
        from: socket.id
      })
    })

    // DISCONNECT
    socket.on(SOCKET_EVENTS.disconnect, () => {
      socket.broadcast.emit(SOCKET_EVENTS.user_disconnected, socket.id)
    })
  })

}


export default chat