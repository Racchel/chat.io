import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
`

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  cursor: pointer;
`

export const Logo = styled.img`
  height: 2rem;
`

export const Title = styled.h3`
  color: white;
  text-transform: uppercase;
`

export const Users = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  gap: 0.8rem;

  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
`

export const User = styled.div`
  background-color: #ffffff34;
  min-height: 5rem;
  cursor: pointer;
  width: 90%;
  border-radius: 0.2rem;
  padding: 0.4rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  transition: 0.5s ease-in-out;
`

export const UserAvatar = styled.img`
  height: 3rem;
`

export const Info = styled.div`
  font-size: 20px;

  .status-online {
    color: green;
  };

  .status-offline {
    color: red;
  };
`

export const UserUsername = styled.h4`
  color: white;
`

export const CurrentUser = styled.div`
  background-color: #0d0d30;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    gap: 0.5rem; 
  }
`


export const CurrentAvatar = styled.img`
  height: 4rem;
  max-inline-size: 100%;
`

export const CurrentUsername = styled.h3`
  color: white;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    font-size: 1rem;
  }
`
