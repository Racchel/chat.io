import { config } from './config/socket'
import { io } from 'socket.io-client'

const socket = io(config.uri, config.opts)

function App() {
  
  return (
    <div> 
      React App
    </div>
  );
}

export default App;
