/* eslint-disable react/display-name */
import { memo } from 'react';
import styled from 'styled-components';

import { Rectangle, Skeleton } from './Skeleton/Skeleton';

export const ProductDetailSkeleton = memo(() => (
  <Skeleton width='430px' height='491px'>
    <Container>
      <Rectangle width='100%' height='420px' />
      <Rectangle width='100%' height='25px' />
      <Rectangle width='45%' height='20px' />
    </Container>
  </Skeleton>
));

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  row-gap: 5px;
`;
