import React from 'react'
import { IoMdSend } from 'react-icons/io'
import * as S from './style'

export const ChatInput = ({
  handleMessage,
  message,
  setMessage,
}) => {

  return (
    <S.Container> 
      <S.InputContainer onSubmit={handleMessage}>
        <S.Input
          type='text'
          placeholder='type your message here'
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
