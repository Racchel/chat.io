import { io } from 'socket.io-client'

const config = {
  uri: 'http://localhost:8000', 
  opts: {
    path: '/socket.io',
    reconnection: false 
  }
}

const SOCKET_EVENTS = {
  user_connected: 'USER_CONNECTED',
  user_joined: 'USER_JOINED',
  message_received: 'MESSAGE_RECEIVED',
  message_sent: 'MESSAGE_SENT',
  username: "USERNAME",
  users: "USERS"
}

const socket = io(config.uri, config.opts)


export { socket, SOCKET_EVENTS }

