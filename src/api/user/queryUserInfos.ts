import axios from 'axios';
import { UserInfos, UserInfosResponse } from '../../types/user';

export const queryUserInfos = async ({ ID }: Pick<UserInfos, 'ID'>) => {
  const {
    data: { data },
  } = await axios.get<UserInfosResponse>(`http://localhost:3003/users/${ID}`);

  return { data };
};
