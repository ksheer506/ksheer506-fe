import { ServerResponse } from '../../pages/products/[id]';
import { ProductListPayload, ProductListResponse } from '../../types';
import { axiosInstance } from '../../utilities';

export const queryProductList = async ({ page, size = 10 }: ProductListPayload) => {
  const { data } = await axiosInstance.get<ServerResponse[]>(`https://koreanjson.com/posts`);
  const start = size * page - size;
  const end = size * page;

  const paginated = data.slice(start, end);

  return { paginated };
};
