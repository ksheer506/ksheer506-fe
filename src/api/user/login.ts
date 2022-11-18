import { LoginPayload, LoginResponse } from '../../types/user';
import { axiosInstance } from '../../utilities';

export const login = async ({ id, password }: LoginPayload) => {
  const { data } = await axiosInstance.post<LoginResponse>('/login', {
    id,
    password,
  });

  return { data };
};
