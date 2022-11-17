import Link from 'next/link';
import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import products from '../api/data/products.json';
import ProductList from '../components/ProductList';
import { Nav } from '../components/Nav';

const InfiniteScrollPage: NextPage = () => {
  return (
    <>
      <Nav />
      <Container>
        <ProductList products={products} />
      </Container>
    </>
  );
};

export default InfiniteScrollPage;

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
