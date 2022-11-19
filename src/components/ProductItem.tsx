/* eslint-disable react/display-name */
import axios from 'axios';
import { memo, useState } from 'react';
import styled, { css } from 'styled-components';

import { Product } from '../types/product';
import { formatPrice } from '../utilities';
import { ProductItemSkeleton } from './ProductItemSkeleton';

type ProductItemProps = {
  product: Product;
};

const ProductItem = memo(({ product: { name, thumbnail, price } }: ProductItemProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <List>
      {!imageLoaded && <ProductItemSkeleton />}
      <Container isLoading={!imageLoaded}>
        <Thumbnail
          onLoad={() => setImageLoaded(true)}
          src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'}
        />
        <Name>{name}</Name>
        <Price>{formatPrice(price)}원</Price>
      </Container>
    </List>
  );
});

export default ProductItem;

const List = styled.li`
  width: 180px;
  height: max-content;
  align-self: center;
  justify-self: center;
`;

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
  height: 180px;
`;

const Name = styled.p`
  height: 20px;
  margin-top: 6px;
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Price = styled.p`
  height: 20px;
  margin-top: 4px;
`;
