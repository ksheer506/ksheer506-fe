import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { useRouter } from 'next/router';
import { formatPrice } from '../../utilities';
import { queryProductDetail } from '../../api/products/queryProductDetail';
import { useQuery } from 'react-query';
import { Nav, ProductDetailSkeleton } from '../../components';
import { queryProductList } from '../../api/products/queryProductList';
import { Product, ProductItemResponse, ProductListResponse } from '../../types';
import productList from '../../api/data/products.json';
import axios from 'axios';

const queryStatus = (isIdle: boolean, isFetching: boolean, data: unknown) => {
  if (!isIdle && !isFetching && !data) {
    return 'notFound';
  }
  if ((isIdle || isFetching) && !data) {
    return 'loading';
  }
  if (data) {
    return 'done';
  }
};

const ProductDetailPage = ({ id, title }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { query, isFallback } = useRouter();
  /* const { id } = query;
  const { data, isFetching, isIdle } = useQuery(
    ['product', id],
    () => queryProductDetail({ id: Number(id) }),
    {
      enabled: !!id,
      retry: 1,
      select: ({ product }) => product,
    }
  );
  const { name, thumbnail, price } = data || {};
  const status = queryStatus(isIdle, isFetching, name); */

  if (isFallback) {
    return <Loading>페이지를 생성하는 중입니다.</Loading>;
  }

  return (
    <>
      <Nav />

      <>
        <Container isLoading={!imageLoaded}>
          <Thumbnail
            src={
              'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            }
            onLoad={() => setImageLoaded(true)}
          />
          <ProductInfoWrapper>
            <Name>{title}</Name>
            <Price>{id}</Price>
          </ProductInfoWrapper>
        </Container>
      </>
    </>
  );
};

interface StaticProps {
  props: ServerResponse;
}

export interface ServerResponse {
  id: string;
  title: string;
  content: string;
  UserId: number;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axios.get<ServerResponse[]>(`https://koreanjson.com/posts`);
  const paginagted = data.slice(0, 30);

  const paths = paginagted.map(({ id }) => ({ params: { id: `${id}` } }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<ServerResponse, { id: string }> = async ({
  params,
}) => {
  const { id: productId } = params || {};
  const { data } = await axios.get<ServerResponse>(`https://koreanjson.com/posts/${productId}`);

  return { props: { ...data } };
};

export default ProductDetailPage;

const Loading = styled.h1`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  height: 500px;

  font-size: 27px;
  font-weight: bold;
  color: grey;
`;

const Container = styled.div<{ isLoading: boolean }>`
  width: 100%;
  height: max-content;
  overflow: hidden;

  /* ${({ isLoading }) =>
    isLoading &&
    css`
      height: 0;
    `} */
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 300px;
`;

const ProductInfoWrapper = styled.section`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.p`
  font-size: 18px;
  margin-top: 8px;
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 95px);
`;
