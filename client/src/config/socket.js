import { io } from 'socket.io-client'

const config = {
  uri: 'http://localhost:8000', 
  opts: {
    path: '/socket.io',
    reconnection: false 
  }
}

const socket = io(config.uri, config.opts)


export default socket

