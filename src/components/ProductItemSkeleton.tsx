import styled from 'styled-components';

import { Rectangle, Skeleton } from './Skeleton/Skeleton';

export const ProductItemSkeleton = () => (
  <Skeleton width='180px' height='230px'>
    <Container>
      <Rectangle width='100%' height='180px' />
      <Rectangle width='100%' height='20px' />
      <Rectangle width='50%' height='20px' />
    </Container>
  </Skeleton>
);

const Container = styled.a`
  display: flex;
  flex-flow: column nowrap;
  justify-content: start;
  row-gap: 5px;
`;
