import React from 'react'
import { ChatContainer, Contacts } from '../../components'
import { Toaster } from 'react-hot-toast'
import * as S from './style'

export default function Chat({
  username,
  users,
  typing,
  socket,
  connected,
  messages,
  message,
  handleMessage,
  setMessage
}) {
 
  return (
    <>
      <Toaster />
      <S.Container>
        <S.Content>
          <Contacts 
            contacts={users}
            username={username}
          />
          <ChatContainer
            typing={typing}
            messages={messages}
            socketID={socket.id}
            handleMessage={handleMessage} 
            message={message} 
            setMessage={setMessage} 
          />
        </S.Content>
      </S.Container>
    </>
  )
}
