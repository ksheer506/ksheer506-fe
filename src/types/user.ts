export interface LoginPayload {
  id: string;
  password: string;
}

export interface UserInfos {
  id: string;
  name: string;
}

export interface LoginResponse {
  data: {
    accessToken: string;
    user: UserInfos;
  };
}

export interface UserInfosResponse {
  data: {
    user: UserInfos;
  };
}