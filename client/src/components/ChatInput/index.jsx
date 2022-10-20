import React from 'react'
import { IoMdSend } from 'react-icons/io'
import * as S from './style'

export const ChatInput = ({
  handleMessage,
  message,
  setMessage,
  selectedUser
}) => {

  return (
    <S.Container> 
      <S.InputContainer onSubmit={handleMessage}>
        <S.Input
          type='text'
          placeholder={selectedUser ? 'digite sua mensagem privada' : 'digite sua mensagem pública'}
          onChange={e => setMessage(e.target.value)}
          value={message} 
        />
        <S.Button type='submit'>
          <IoMdSend />
        </S.Button> 
      </S.InputContainer>
    </S.Container>
  )
}
