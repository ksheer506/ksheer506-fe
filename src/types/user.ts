export interface LoginPayload {
  id: string;
  password: string;
}

export interface UserInfos {
  ID: string;
  NAME: string;
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