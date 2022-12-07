/* eslint-disable react/display-name */
import axios from 'axios';
import Link from 'next/link';
import { memo, useState } from 'react';
import styled, { css } from 'styled-components';
import { ServerResponse } from '../pages/products/[id]';

import { Product } from '../types/product';
import { formatPrice } from '../utilities';
import { ProductItemSkeleton } from './ProductItemSkeleton';

type ProductItemProps = {
  product: ServerResponse;
};

const ProductItem = memo(({ product: { id, title, UserId } }: ProductItemProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <List>
      {!imageLoaded && <ProductItemSkeleton />}
      <Container isLoading={!imageLoaded}>
        <Link href={`/products/${id}`}>
          <a>
            <Thumbnail
              onLoad={() => setImageLoaded(true)}
              src={'/defaultThumbnail.jpg'}
            />
          </a>
        </Link>

        <Link href={`/products/${id}`}>
          <a>
            <Name>{title}</Name>
          </a>
        </Link>
        <Price>{`${UserId}번`}</Price>
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
  font-size: 17px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Price = styled.p`
  font-size: 14px;
  height: 20px;
  margin-top: 4px;
`;
