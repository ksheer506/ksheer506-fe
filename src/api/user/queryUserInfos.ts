import { UserInfos, UserInfosResponse } from '../../types/user';
import { axiosInstance } from '../../utilities';

export const queryUserInfos = async ({ ID }: Pick<UserInfos, 'ID'>) => {
  const {
    data: { data },
  } = await axiosInstance.get<UserInfosResponse>(`/users/${ID}`);

  return { data };
};
