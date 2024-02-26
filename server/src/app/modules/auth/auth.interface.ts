export type ILoginUser = {
  mobile: string;
  pin: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};
export type IRefreshTokenResponse = {
  accessToken: string;
};
