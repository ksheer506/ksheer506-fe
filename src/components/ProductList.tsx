import styled from 'styled-components';
import { ServerResponse } from '../pages/products/[id]';

import { Product } from '../types/product';
import ProductItem from './ProductItem';

type ProductListProps = {
  products: ServerResponse[];
};

const ProductList = ({ products }: ProductListProps) => (
  <UList>
    {products.map((product) => (
      <ProductItem product={product} key={product.id} />
    ))}
  </UList>
);

export default ProductList;

const UList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 400px;
  gap: 15px;
`;
