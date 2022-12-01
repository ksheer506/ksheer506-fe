import { ProductListPayload, ProductListResponse } from '../../types';
import { axiosInstance } from '../../utilities';

export const queryProductList = async ({ page, size = 10 }: ProductListPayload) => {
  const {
    data: { data },
  } = await axiosInstance.get<ProductListResponse>(
    `https://api.backend/products?page=${page}&size=${size}`
  );

  return { ...data };
};
