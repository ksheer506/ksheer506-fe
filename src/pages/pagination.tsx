import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import products from '../api/data/products.json';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import { Nav } from '../components/Nav';
import { useQuery } from 'react-query';

const PaginationPage: NextPage = () => {
  const { query, push } = useRouter();
  const { page } = query;
  const { data } = useQuery(['productList', page]);

  const handlePagination = (current: number) => {
    push({ query: { ...query, page: current } });
  };

  return (
    <>
      <Nav />
      <Container>
        <ProductList products={products.slice(0, 10)} />

        <Pagination currentPage={Number(page)} lastPage={13} onChange={handlePagination} />
      </Container>
    </>
  );
};

export default PaginationPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
