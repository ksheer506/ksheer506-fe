import axios from 'axios';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { Product } from '../types/product';
import { formatPrice } from '../utilities';

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product: { name, thumbnail, price } }: ProductItemProps) => {
  return (
    <List>
      <Thumbnail src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'} />
      <Name>{name}</Name>
      <Price>{formatPrice(price)}원</Price>
    </List>
  );
};

export default ProductItem;

const List = styled.li`
  width: 180px;
  align-self: center;
  justify-self: center;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 180px;
`;

const Name = styled.p`
  margin-top: 8px;
  font-size: 16px;
`;

const Price = styled.p`
  margin-top: 4px;
`;
