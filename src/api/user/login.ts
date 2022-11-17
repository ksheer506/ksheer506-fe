import axios from 'axios';
import { LoginPayload, LoginResponse } from '../../types/user';

export const login = async ({ id, password }: LoginPayload) => {
  const { data } = await axios.post<LoginResponse>('/login', {
    id,
    password,
  });

  return { data };
};
