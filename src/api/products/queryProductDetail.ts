import { ProductItemPayload, ProductItemResponse } from '../../types';
import { axiosInstance } from '../../utilities';

export const queryProductDetail = async ({ id }: ProductItemPayload) => {
  const {
    data: { data },
  } = await axiosInstance.get<ProductItemResponse>(`/products/${id}`);

  return { ...data };
};
