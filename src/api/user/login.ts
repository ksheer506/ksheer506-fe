import axios from 'axios';
import { LoginPayload } from '../../types/user';

export const login = async ({ id, password }: LoginPayload) => {
  const { data } = await axios.post('/login', {
    id,
    password,
  });

  return { data };
};
