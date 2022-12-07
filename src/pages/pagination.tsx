/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import type { GetServerSideProps, NextPage } from 'next';
import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import { Nav } from '../components/Nav';
import { useQuery } from 'react-query';
import { queryProductList } from '../api/products/queryProductList';
import { ProductItemSkeleton } from '../components';
import axios from 'axios';
import { ProductListResponse } from '../types';
import { ServerResponse } from './products/[id]';

interface ServerSideProps {
  currentPage: number;
  totalCounts: number;
}

const isValidPage = (lastPage: number, page?: number | string | string[]) => {
  return !!page && Number(page) <= lastPage;
};

const PaginationPage: NextPage<ServerSideProps> = ({ currentPage = 1, totalCounts = 200 }) => {
  const size = useRef(10);
  const lastPage = Math.ceil(totalCounts / size.current);
  const { query, push } = useRouter();
  const { page } = query;
  const { data, isFetching, isSuccess, isError } = useQuery(
    ['productList', page],
    () => queryProductList({ page: Number(page), size: size.current }),
    {
      enabled: isValidPage(lastPage, page),
      retry: 1,
    }
  );

  const { paginated } = data || {};

  const handlePagination = useCallback((current: number) => {
    push({ query: { ...query, page: current } });
  }, []);

  const renderPaginationPage = () => {
    if (isFetching) {
      const productSkelton = new Array(size.current)
        .fill(0)
        .map((_, i) => <ProductItemSkeleton key={i} />);

      return <SkeltonContainer>{productSkelton}</SkeltonContainer>;
    }

    if (isError || !isValidPage(lastPage, page)) {
      return <PaginationError />;
    }

    if (isSuccess && paginated) {
      return <ProductList products={paginated} />;
    }
  };

  /* useEffect(() => {
    (async () => {
      const {
        data: { data },
      } = await axios.get<ProductListResponse>(
        `https://api.backend/products?page=${1}&size=${100}`
      );

      console.log(data);
    })();
  }); */

  return (
    <>
      <Nav />
      <Main>
        {renderPaginationPage()}
        <Pagination currentPage={currentPage} lastPage={lastPage} onChange={handlePagination} />
      </Main>
    </>
  );
};

const PaginationError = () => {
  return <ErrorContainer>존재하지 않는 페이지입니다.</ErrorContainer>;
};

export const getServerSideProps: GetServerSideProps<ServerSideProps, { page: string }> = async ({
  query,
}) => {
  const { page } = query || {};
  const { data } = await axios.get<ServerResponse[]>(`https://koreanjson.com/posts`);
  const L = data.length > 100 ? 150 : data.length;

  return { props: { currentPage: Number(page), totalCounts: L } };
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
