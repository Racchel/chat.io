import { SOCKET_EVENTS } from '../config/socket.js'

const chat = (io) => {

  io.on(SOCKET_EVENTS.connection, (socket) => {
    console.log('socket id: ', socket.id)

    socket.on(SOCKET_EVENTS.username, (username) => {
      console.log('username> ', username)
      socket.broadcast.emit(SOCKET_EVENTS.user_joined, `${username} joined`)
    })

    socket.on(SOCKET_EVENTS.message_sent, (message) => {
      console.log("message:", message)
      io.emit(SOCKET_EVENTS.message_received, message)
    })

    socket.on(SOCKET_EVENTS.disconnect, () => {
      console.log('user disconnected')
    })
  })

}


export default chat