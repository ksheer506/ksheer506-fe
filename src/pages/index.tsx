import Link from 'next/link';
import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { logOutUser, selectUserInfos, useAppDispatch, useAppSelector } from '../redux';
import { Nav } from '../components/Nav';
import { queryUserInfos } from '../api';
import { toast } from 'react-toastify';
import { UserInfos, UserInfosResponse } from '../types';

type HomPageProps = Pick<UserInfos, 'NAME'>;

const HomePage: NextPage<HomPageProps> = () => {
  const { ID } = useAppSelector(selectUserInfos);
  const dispatch = useAppDispatch();
  const { data } = useQuery<UserInfosResponse>(['user', ID], () => queryUserInfos({ ID }), {
    retry: 1,
    enabled: !!ID,
    onError: (err) => {
      toast.error('로그인 상태를 확인해주세요.');
      dispatch(logOutUser());
    },
  });

  return (
    <>
      <Nav />
      <Container>
        <Link href='/pagination?page=1'>
          <StyledLink>pagination</StyledLink>
        </Link>
        <Link href='/infinite-scroll'>
          <StyledLink>infinite scroll</StyledLink>
        </Link>
      </Container>
    </>
  );
};


export default HomePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 40px;
`;

const StyledLink = styled.a`
  display: flex;
  justify-content: center;
  width: 240px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;
  font-size: 24px;

  & + & {
    margin-top: 40px;
  }
`;
