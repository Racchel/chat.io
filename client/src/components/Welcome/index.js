import React from 'react'
import Robot from '../../assets/robot.gif'
import * as S from './style'

export const Welcome = () => {

  return (
    <S.Container>
      <S.Image src={Robot} alt='' />
      <h1>
        Welcome, <S.Span>Racchel!</S.Span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </S.Container>
  )
}
