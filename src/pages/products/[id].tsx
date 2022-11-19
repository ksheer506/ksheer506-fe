import type { GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { useRouter } from 'next/router';
import { formatPrice } from '../../utilities';
import { queryProductDetail } from '../../api/products/queryProductDetail';
import { useQuery } from 'react-query';
import { Nav, ProductDetailSkeleton } from '../../components';

const ProductDetailPage: NextPage = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { query } = useRouter();
  const { id } = query;
  const { data } = useQuery(['product', id], () => queryProductDetail({ id: Number(id) }), {
    enabled: !!id,
    select: ({ product }) => product,
  });
  const { name, thumbnail, price } = data || {};

  console.log(data);

  return (
    <>
      <Nav />
      {!imageLoaded && <ProductDetailSkeleton />}
      <Container isLoading={!imageLoaded}>
        <Thumbnail
          src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'}
          onLoad={async () => {
            await new Promise((res) => {
              setTimeout(res, 2000);
            });
            setImageLoaded(true);
          }}
        />
        <ProductInfoWrapper>
          <Name>{name}</Name>
          <Price>{formatPrice(price || 0)}원</Price>
        </ProductInfoWrapper>
      </Container>
    </>
  );
};

/* export const getStaticPaths = async () => {
  const {} = await queryProductList;
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async (context) => {
  const { product } = await queryProductDetail({ id: 10 });

  if (!product) {
    return { notFound: true };
  }

  return { props: product };
}; */

export default ProductDetailPage;

const Container = styled.div<{ isLoading: boolean }>`
  width: 100%;
  height: max-content;
  overflow: hidden;

  ${({ isLoading }) =>
    isLoading &&
    css`
      height: 0;
    `}
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 420px;
`;

const ProductInfoWrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 18px;
  margin-top: 8px;
`;
