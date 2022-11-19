/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';

import ProductList from '../components/ProductList';
import { Nav } from '../components/Nav';
import { useInfiniteQuery } from 'react-query';
import { queryProductList } from '../api/products/queryProductList';
import { useInfiniteScroll } from '../hooks';

const InfiniteScrollPage: NextPage = () => {
  const size = useRef(10);
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['productList'],
    ({ pageParam = 1 }) => queryProductList({ page: pageParam, size: size.current }),
    {
      getNextPageParam: ({ totalCount }, allPages) => {
        const fetchedItems = allPages.length * size.current;
        let nextPage: number | undefined = allPages.length + 1;

        if (nextPage && fetchedItems >= totalCount) {
          nextPage = undefined;
        }

        return nextPage;
      },
      select: (data) => {
        const transformedPages = data.pages.map(({ products }) => products).flat();

        return { ...data, pages: transformedPages };
      },
    }
  );

  const onIntersecting = useCallback(() => {
    if (!hasNextPage) return;
    fetchNextPage();
  }, [hasNextPage]);
  const { enabled, bottomRef, initializer } = useInfiniteScroll(onIntersecting);

  const { pages } = data || {};

  return (
    <>
      <Nav />
      <Container>
        {pages && <ProductList products={pages} />}
        {enabled && <div ref={bottomRef} />}
        <Button onClick={initializer} disabled={!hasNextPage}>
          더보기
        </Button>
      </Container>
    </>
  );
};

export default InfiniteScrollPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: black;
  color: white;
  transition: 600ms all;

  &:hover {
    background-color: white;
    color: black;
  }

  &:disabled {
    background-color: #dadada;
    color: white;
    border: 1px solid #dadada;
  }
`;
