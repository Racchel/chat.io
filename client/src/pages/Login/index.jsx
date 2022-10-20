import * as S from './style'
import { Toaster } from 'react-hot-toast'

import Logo from '../../assets/logo.svg'

export default function Login ({ 
  handleSubmit,
  inputValue,
  setInputValue
 }) {
 
  return (
    <>
      <Toaster/>
      <S.FormContainer>
      <S.FormContent onSubmit={handleSubmit}>
        <S.FormHeader>
          <S.Image src={Logo} alt='logo' />
          <S.Title>chat.io</S.Title>
        </S.FormHeader>

        <S.Input
          type='text'
          name='username'
          placeholder='Usuário'
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />

        <S.Button type='submit'>Entrar</S.Button>
      </S.FormContent>
    </S.FormContainer>
    </>
  )
}