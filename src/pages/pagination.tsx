/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import React, { useCallback, useMemo, useRef } from 'react';
import styled from 'styled-components';

import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import { Nav } from '../components/Nav';
import { useQuery } from 'react-query';
import { ErrorBoundary, FallbackProps, useErrorHandler } from 'react-error-boundary';
import { queryProductList } from '../api/products/queryProductList';
import { ProductItemSkeleton } from '../components';

const PaginationPage: NextPage = () => {
  const size = useRef(10);
  const { query, push } = useRouter();
  const { page } = query;
  const { data, isFetching, isError } = useQuery(
    ['productList', page],
    () => queryProductList({ page: Number(page), size: size.current }),
    {
      enabled: !!page,
      retry: 1,
    }
  );
  const { products, totalCount } = data || {};

  const handlePagination = useCallback((current: number) => {
    push({ query: { ...query, page: current } });
  }, []);

  const lastPage = Math.ceil((totalCount || 0) / size.current);
  const productSkelton = useMemo(
    () => new Array(size.current).fill(0).map((_, i) => <ProductItemSkeleton key={i} />),
    []
  );

  return (
    <>
      <Nav />

      <Main>
        {/* <ErrorBoundary FallbackComponent={PaginationError}> */}
        {isError && <PaginationError />}
        {isFetching && <SkeltonContainer>{productSkelton}</SkeltonContainer>}
        {products && (
          <>
            <ProductList products={products} />
            <Pagination
              currentPage={Number(page)}
              lastPage={lastPage}
              onChange={handlePagination}
            />
          </>
        )}
        {/* </ErrorBoundary> */}
      </Main>
    </>
  );
};

const PaginationError = () => {
  return <ErrorContainer>존재하지 않는 페이지입니다.</ErrorContainer>;
};

export default PaginationPage;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;

const SkeltonContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 400px;
  gap: 15px;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  min-height: calc(100vh - 100px);
`;
