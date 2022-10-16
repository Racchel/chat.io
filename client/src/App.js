import { useState, useEffect } from 'react'
import socket from './config/socket'

function App() {

  const [username, setUsername] = useState("")
  
  const handleUsername = (e) => {
    e.preventDefault()
    socket.emit("username", username)
  }
  
  return (
    <div className='container text-center'> 
      <div className='row'> 
        <form onSubmit={handleUsername} className='text-center pt-3'>
          <div className='row g-3'>
            <div className='col-md-8'>
              <input 
                value={username} 
                onChange={e => setUsername(e.target.value)}
                type="text"
                placeholder='Seu nome'
                className='form-control'
              />
            </div>

            <div className='col-md-4'>
              <button className='btn btn-secondary' type='submit'>
                Entrar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
