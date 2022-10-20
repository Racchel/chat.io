import React, { useEffect, useRef } from 'react'
import { ChatInput } from '../ChatInput'
import * as S from './style'

export const ChatContainer = ({ 
  selectedUser,
  typing,
  handleMessage,
  message,
  setMessage,
  messages, 
  socketID
 }) => {
  
  const scrollRef = useRef()

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
  return (
    <S.Container>
      <S.ChatHeader>
        <HeaderDetails selectedUser={selectedUser}/>
        {typing && <S.Typing>{typing}</S.Typing>}
      </S.ChatHeader>
      <S.ChatMessage>
        <S.Date>{new Date().toDateString()}</S.Date>

        {messages.map((message, index) => (

          <div ref={scrollRef} key={index}>
            <div className={`message ${message.socketID === socketID ? 'sended' : 'recieved'}`}>
              <div className='content'>
                <p>{message.content} - {message.user}</p>
                <p>{message.time}</p>
              </div>
            </div>
          </div>
        ))}
      </S.ChatMessage>

      <ChatInput
        handleMessage={handleMessage} 
        message={message} 
        setMessage={setMessage} 
        selectedUser={selectedUser}
      />
    </S.Container>
  )
}


const HeaderDetails = ({ selectedUser }) => {
  return (
    <S.UserDetails>
      <div>
        <S.Avatar
          src='https://images.vexels.com/media/users/3/145908/raw/52eabf633ca6414e60a7677b0b917d92-criador-de-avatar-masculino.jpg'
          alt='Avatar'
        />
      </div>
      <div>
        <S.Username>{selectedUser ? selectedUser.username : 'Sala Pública'}</S.Username>
      </div>
    </S.UserDetails>
  )
}