import styled from 'styled-components';

import { Rectangle, Skeleton } from './Skeleton/Skeleton';

export const ProductItemSkeleton = () => (
  <List>
    <Skeleton width='180px' height='230px'>
      <Container>
        <Rectangle width='100%' height='180px' />
        <Rectangle width='100%' height='20px' />
        <Rectangle width='45%' height='20px' />
      </Container>
    </Skeleton>
  </List>
);

const List = styled.li`
  width: 180px;
  align-self: center;
  justify-self: center;
`;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: start;
  row-gap: 5px;
`;
