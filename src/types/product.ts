export interface Product {
  id: string;
  name: string;
  thumbnail: string | null;
  price: number;
}

export interface ProductListPayload {
  page: number;
  size?: number;
}

export interface ProductListResponse {
  data: {
    products: Product[];
    totalCount: number;
  };
}

export interface ProductItemPayload {
  id: number;
}

export interface ProductItemResponse {
  data: {
    product: Product[];
  };
}