import Link from 'next/link';
import type { NextPage } from 'next';
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import styled from 'styled-components';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { login } from '../api';
import { LoginPayload, LoginResponse } from '../types/user';
import { initializeUserInfos, useAppDispatch } from '../redux';
import { Input } from '../components/Input';
import { useFormValidation } from '../hooks';

const validateID = (id: string) => {
  return !!id.match(/[A-z0-9]{5,30}/g);
};

const validatePW = (password: string) => {
  return !!password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,30}$/g);
};

const LoginPage: NextPage = () => {
  const { replace } = useRouter();
  const dispatch = useAppDispatch();
  const { mutate } = useMutation<
    { data: LoginResponse },
    AxiosError<{ data: { error: { message: string } } }>,
    LoginPayload
  >((payload) => login(payload), {
    onSuccess: ({ data }) => {
      const { accessToken, user } = data.data;
      const { ID, NAME } = user;

      dispatch(initializeUserInfos({ accessToken, ID, NAME }));
      replace('/');
    },
    onError: ({ response }) => {
      const { data } = response || {};

      if (data?.data.error.message) {
      }
    },
  });

  const [idRef, idErr, handleIDBlur] = useFormValidation(validateID);
  const [pwRef, pwErr, handlePWBlur] = useFormValidation(validatePW);

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
        <Input
          label='아이디'
          error={idErr}
          errMsg='올바른 아이디 형식으로 입력해주세요.'
          onBlur={handleIDBlur}
          ref={idRef}
        />
        <Input
          label='비밀번호'
          type='password'
          error={pwErr}
          errMsg='올바른 비밀번호 형식으로 입력해주세요.'
          onBlur={handlePWBlur}
          ref={pwRef}
        />
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
