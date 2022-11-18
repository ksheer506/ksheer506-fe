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
