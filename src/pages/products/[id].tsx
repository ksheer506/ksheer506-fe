import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
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

interface ProductDetailPageProps {
  product: Product;
}

const ProductDetailPage: NextPage<ProductDetailPageProps> = ({ product }) => {
  const { thumbnail, name, price } = product || {};
  /* const [imageLoaded, setImageLoaded] = useState(false); */
  /* const { query } = useRouter();
  const { id } = query;
  const { data } = useQuery(['product', id], () => queryProductDetail({ id: Number(id) }), {
    enabled: !!id,
    select: ({ product }) => product,
  });
  const { name, thumbnail, price } = data || {};

  console.log(data); */

  const formatted = `${formatPrice(price || 0)}원`;

  return (
    <>
      <Nav />
      {name ? (
        <>
          <Thumbnail src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'} />
          <ProductInfoWrapper>
            <Name>{name}</Name>
            <Price>{formatted}</Price>
          </ProductInfoWrapper>
        </>
      ) : (
        <Error>존재하지 않는 상품입니다.</Error>
      )}
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allProducts: Product[] = [];

  for (let page = 1; page < 5; page++) {
    const {
      data: { data },
    } = await axios.get<ProductListResponse>(
      `http://localhost:3004/products?_page=${page}&_limit=${100}`
    );
    const { totalCount, products } = data;

    if (!products.length) break;
    allProducts.push(...products);
  }
  const paths = allProducts.map(({ id }) => ({ params: { id } }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const { id: productId } = params || {};
  const {
    data: { data },
  } = await axios.get<ProductItemResponse>(`http://localhost:3004/products/${productId}`);
  console.log(data);
  //const { totalCount, products } = data;

  /* const { product } = await queryProductDetail({ id: productId }); */
  const product = productList.filter(({ id }) => id === productId)[0];

  if (!product) {
    return { props: { product: {} } };
  }

  return { props: { product } };
};

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
