import React from 'react'
import Logo from '../../assets/logo.svg'
import * as S from './style'

export const Users = ({ users, currenteUsername }) => {
  
  return (
    <>
      <S.Container>
        <S.Brand>
          <S.Logo src={Logo} alt='logo' />
          <S.Title>chat.io</S.Title>
        </S.Brand>
        <S.Users>
          {users.map((user, index) => {
            if (!user.self ) {
              return (
                <S.User key={index}>
                  <div>
                    <S.UserAvatar
                      src='https://ksastcorpsites.blob.core.windows.net/site/general/63703629760793-image.jpg?width=100'
                      alt='avatar'
                    />
                  </div>
                  <S.Info>
                    <S.UserUsername>{user.username}</S.UserUsername>
                    <p className={`status-${ user.connected ? 'online' : 'offline'}`}>
                      { user.connected ? 'online' : 'offline'}
                    </p>
                  </S.Info>
                </S.User>
              )
            }}
          )}
        
        </S.Users>
        <S.CurrentUser>
          <div>
            <S.CurrentAvatar
              src='https://thumbs.dreamstime.com/b/avatar-do-gato-45383627.jpg'
              alt='avatar'
            />
          </div>
          <div>
            <S.CurrentUsername>{currenteUsername}</S.CurrentUsername>
          </div>
        </S.CurrentUser>
      </S.Container>
    </>
  )
}
