import Link from 'next/link';
import type { NextPage } from 'next';
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { login } from '../api';
import { LoginPayload, LoginResponse } from '../types/user';
import { initializeUserInfos, useAppDispatch } from '../redux';

const validateID = (id: string) => {
  return id.match(/[A-z0-9]{5,30}/g);
};

const validatePW = (password: string) => {
  return password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,30}$/g);
};

const LoginPage: NextPage = () => {
  const { replace } = useRouter();
  const dispatch = useAppDispatch();
  const { mutate } = useMutation<{ data: LoginResponse }, unknown, LoginPayload>(
    (payload) => login(payload),
    {
      onSuccess: ({ data }) => {
        const { accessToken, user } = data.data;
        const { ID, NAME } = user;

        dispatch(initializeUserInfos({ accessToken, ID, NAME }));
        replace('/');
      },
    }
  );

  const idRef = useRef<HTMLInputElement>(null);
  const [idErr, setIDErr] = useState(false);

  const pwRef = useRef<HTMLInputElement>(null);
  const [pwErr, setPWErr] = useState(false);

  const handleIDBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const isValid = validateID(e.target.value);

    if (!isValid) {
      setIDErr(true);
      return;
    }
    setIDErr(false);
  };

  const handlePWBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const isValid = validatePW(e.target.value);

    if (!isValid) {
      setPWErr(true);
      return;
    }
    setPWErr(false);
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const id = idRef.current?.value;
    const password = pwRef.current?.value;

    if (!id || !password) return;

    mutate({
      id,
      password,
    });
  };

  return (
    <>
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        <Link href='/login'>
          <p>login</p>
        </Link>
      </Header>
      <Form onSubmit={handleLogin}>
        <InputBox>
          <InputLabel>아이디</InputLabel>
          <TextInput type='text' isError={idErr} onBlur={handleIDBlur} ref={idRef} />
          {idErr && <ErrorMsg>올바른 아이디 형식으로 입력해주세요.</ErrorMsg>}
        </InputBox>

        <InputBox>
          <InputLabel>비밀번호</InputLabel>
          <TextInput type='password' isError={pwErr} onBlur={handlePWBlur} ref={pwRef} />
          {pwErr && <ErrorMsg>올바른 비밀번호 형식으로 입력해주세요.</ErrorMsg>}
        </InputBox>

        <LoginButton disabled={idErr || pwErr}>로그인</LoginButton>
      </Form>
    </>
  );
};

export default LoginPage;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 48px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
  gap: 16px;
`;

const InputBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 8px;
`;

const InputLabel = styled.label`
  font-weight: 700;
  font-size: 13px;
  color: #6c6c7d;
`;

const TextInput = styled.input<{ isError: boolean }>`
  border: 1px solid #000;
  padding: 16px;
  background-color: #f7f7fa;
  border-radius: 12px;

  ${({ isError }) =>
    isError &&
    css`
      background-color: #fdedee;
    `}
`;

const ErrorMsg = styled.p`
  font-weight: 400;
  font-size: 13px;
  color: #ed4e5c;
`;

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;
  cursor: pointer;

  &:disabled {
    background-color: #e2e2ea;
  }
`;
