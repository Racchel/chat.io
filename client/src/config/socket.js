import { io } from 'socket.io-client'

const config = {
  uri: 'http://localhost:8000', 
  opts: {
    path: '/socket.io',
    reconnection: false 
  }
}

const SOCKET_EVENTS = {
  typing: 'TYPING',
  username_taken: 'USERNAME_TAKEN',
  user_disconnected: 'USER_DISCONNECTED',
  user_connected: 'USER_CONNECTED',
  message_received: 'MESSAGE_RECEIVED',
  message_sent: 'MESSAGE_SENT',
  private_message_received:'PRIVATE_MESSAGE_RECEIVED',
  private_message_sent:'PRIVATE_MESSAGE_SENT',
  username: 'USERNAME',
  users: 'USERS'
}

const socket = io(config.uri, config.opts)


export { socket, SOCKET_EVENTS }

