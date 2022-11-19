import { ProductItemPayload, ProductListResponse } from '../../types';
import { axiosInstance } from '../../utilities';

export const queryProductDetail = async ({ id }: ProductItemPayload) => {
  const {
    data: { data },
  } = await axiosInstance.get<ProductListResponse>(`/products/${id}`);

  return { ...data };
};
