import Link from 'next/link';
import styled from 'styled-components';
import { logOutUser, selectUserInfos, useAppDispatch, useAppSelector } from '../redux';

export const Nav = () => {
  const { NAME } = useAppSelector(selectUserInfos);
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logOutUser());
  };

  return (
    <Header>
      <Link href='/'>
        <a>
          <Title>HAUS</Title>
        </a>
      </Link>
      {!!NAME ? (
        <UserBox>
          <p>{NAME}</p>
          <button onClick={handleLogOut}>
            <p>logout</p>
          </button>
        </UserBox>
      ) : (
        <Link href='/login'>
          <p>login</p>
        </Link>
      )}
    </Header>
  );
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 48px;
`;

const UserBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button``;
