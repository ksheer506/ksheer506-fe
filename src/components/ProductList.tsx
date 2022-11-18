import styled from 'styled-components';

import { Product } from '../types/product';
import ProductItem from './ProductItem';

type ProductListProps = {
  products: Product[];
};

const ProductList = ({ products }: ProductListProps) => (
  <Container>
    {products.map((product) => (
      <ProductItem key={product.id} product={product} />
    ))}
  </Container>
);

export default ProductList;

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 400px;
  gap: 15px;
`;
