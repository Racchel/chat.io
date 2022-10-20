import React from 'react'
import Logo from '../../assets/logo.svg'
import * as S from './style'

export const Contacts = ({ contacts, username }) => {
  
  return (
    <>
      <S.Container>
        <S.Brand>
          <S.Logo src={Logo} alt='logo' />
          <S.Title>chat.io</S.Title>
        </S.Brand>
        <S.Contacts>
          {contacts.map((contact, index) => {
            if (!contact.self ) {
              return (
                <S.Contact key={index}>
                  <div>
                    <S.ContactAvatar
                      src='https://ksastcorpsites.blob.core.windows.net/site/general/63703629760793-image.jpg?width=100'
                      alt='avatar'
                    />
                  </div>
                  <S.Info>
                    <S.ContactUsername>{contact.username}</S.ContactUsername>
                    <p className={`status-${ contact.connected ? 'online' : 'offline'}`}>
                      { contact.connected ? 'online' : 'offline'}
                    </p>
                  </S.Info>
                </S.Contact>
              )
            }}
          )}
        
        </S.Contacts>
        <S.CurrentUser>
          <div>
            <S.CurrentAvatar
              src='https://thumbs.dreamstime.com/b/avatar-do-gato-45383627.jpg'
              alt='avatar'
            />
          </div>
          <div>
            <S.CurrentUsername>{username}</S.CurrentUsername>
          </div>
        </S.CurrentUser>
      </S.Container>
    </>
  )
}
