import React from 'react'
import { ChatContainer, Users } from '../../components'
import { Toaster } from 'react-hot-toast'
import * as S from './style'

export default function Chat({
  selectedUser,
  setSelectedUser,
  username,
  users,
  typing,
  socket,
  messages,
  message,
  handleMessage,
  setMessage,
  connected,
}) {
 
  return (
    <>
      <Toaster />
      <S.Container>
        <S.Content>
          <Users 
            users={users}
            currenteUsername={username}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
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
