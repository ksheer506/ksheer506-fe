import styled from 'styled-components';

import { Product } from '../types/product';
import ProductItem from './ProductItem';
import { ProductItemSkeleton } from './ProductItemSkeleton';

type ProductListProps = {
  products: Product[];
};

const ProductList = ({ products }: ProductListProps) => (
  <UList>
    {products.map((product) => (
      <ProductItem product={product} skeleton={<ProductItemSkeleton />} key={product.id} />
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
