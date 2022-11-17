import { useRouter } from 'next/router';
import Link from 'next/link';
import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import products from '../api/data/products.json';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import { Nav } from '../components/Nav';

const PaginationPage: NextPage = () => {
  const { query, push } = useRouter();
  const { page } = query;
  console.log(page);

  const handlePagination = (current: number) => {
    console.log(query);
    push({ query: { ...query, page: current } });
  };

  return (
    <>
      <Nav />
      <Container>
        <ProductList products={products.slice(0, 10)} />
        <Pagination initialPage={Number(page || 1)} lastPage={14} onClick={handlePagination} />
      </Container>
    </>
  );
};

export default PaginationPage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
