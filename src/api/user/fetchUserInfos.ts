import axios from 'axios';
import { UserInfos } from '../../types/user';

export const fetchUserInfos = async ({ id }: Pick<UserInfos, 'id'>) => {
  const { data } = await axios.get(`/users/${id}`);

  return { data };
};
