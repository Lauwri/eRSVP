import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { login, selectLogin } from '../../store/features/loginSlice';
import { useAppDispatch, useAppSelector } from '../../store/root';

export const Login = () => {
  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector(selectLogin);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (loginStatus) {
      navigate('/rsvp');
    }
  }, [navigate, loginStatus]);

  const signIn = (username: string, password: string) => {
    dispatch(login({ username, password }));
  };

  return (
    <LoginContainer>
      <LoginForm>
        <Input
          id={username}
          type={'text'}
          onChange={(v) => setUsername(v.target.value)}
          value={username}
          placeholder={'Username'}
        ></Input>
        <Input
          id={password}
          type={'password'}
          onChange={(v) => setPassword(v.target.value)}
          value={password}
          placeholder={'Password'}
        ></Input>
        <Button
          onClick={() => {
            signIn(username, password);
          }}
        >
          Sign in!
        </Button>
      </LoginForm>
    </LoginContainer>
  );
};

const Input = styled.input`
  border-radius: 3px;
  border: 1px solid #bf4f74;
  display: block;
  margin: 0 0 1em;
  padding: 4px;
`;

const Button = styled.button`
  background: #bf4f74;
  border-radius: 3px;
  padding: 4px;
  border: none;
  color: white;
`;
const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
`;

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
