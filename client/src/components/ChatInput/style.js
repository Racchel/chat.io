import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  align-items: center;
  background-color: #080420;
  padding: 0 2rem;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
`;

export const InputContainer = styled.form`
  width: 100%;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  background-color: #ffffff34;
`;

export const Input = styled.input`
  width: 90%;
  height: 60%;
  background-color: transparent;
  color: white;
  border: none;
  padding-left: 1rem;
  font-size: 1.2rem;

  &::selection {
    background-color: #9a86f3;
  }
  &:focus {
    outline: none;
  }
`;

export const Button = styled.button`
  padding: 0.3rem 2rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #9a86f3;
  border: none;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0.3rem 1rem;
    svg {
      font-size: 1rem;
    }
  }
  
  svg {
    font-size: 2rem;
    color: white;
  }
`;