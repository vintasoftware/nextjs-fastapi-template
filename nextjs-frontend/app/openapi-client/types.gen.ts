// This file is auto-generated by @hey-api/openapi-ts

export type BearerResponse = {
  access_token: string;
  token_type: string;
};

export type Body_auth_reset_forgot_password = {
  email: string;
};

export type Body_auth_reset_reset_password = {
  token: string;
  password: string;
};

export type Body_auth_verify_request_token = {
  email: string;
};

export type Body_auth_verify_verify = {
  token: string;
};

export type ErrorModel = {
  detail:
    | string
    | {
        [key: string]: string;
      };
};

export type HTTPValidationError = {
  detail?: Array<ValidationError>;
};

export type ItemCreate = {
  name: string;
  description?: string | null;
  quantity?: number | null;
};

export type ItemRead = {
  name: string;
  description?: string | null;
  quantity?: number | null;
  id: string;
  user_id: string;
};

export type login = {
  grant_type?: string | null;
  username: string;
  password: string;
  scope?: string;
  client_id?: string | null;
  client_secret?: string | null;
};

export type UserCreate = {
  email: string;
  password: string;
  is_active?: boolean | null;
  is_superuser?: boolean | null;
  is_verified?: boolean | null;
};

export type UserRead = {
  id: string;
  email: string;
  is_active?: boolean;
  is_superuser?: boolean;
  is_verified?: boolean;
};

export type UserUpdate = {
  password?: string | null;
  email?: string | null;
  is_active?: boolean | null;
  is_superuser?: boolean | null;
  is_verified?: boolean | null;
};

export type ValidationError = {
  loc: Array<string | number>;
  msg: string;
  type: string;
};

export type AuthJwtLoginData = {
  body: login;
};

export type AuthJwtLoginResponse = BearerResponse;

export type AuthJwtLoginError = ErrorModel | HTTPValidationError;

export type AuthJwtLogoutResponse = unknown;

export type AuthJwtLogoutError = unknown;

export type RegisterRegisterData = {
  body: UserCreate;
};

export type RegisterRegisterResponse = UserRead;

export type RegisterRegisterError = ErrorModel | HTTPValidationError;

export type ResetForgotPasswordData = {
  body: Body_auth_reset_forgot_password;
};

export type ResetForgotPasswordResponse = unknown;

export type ResetForgotPasswordError = HTTPValidationError;

export type ResetResetPasswordData = {
  body: Body_auth_reset_reset_password;
};

export type ResetResetPasswordResponse = unknown;

export type ResetResetPasswordError = ErrorModel | HTTPValidationError;

export type VerifyRequestTokenData = {
  body: Body_auth_verify_request_token;
};

export type VerifyRequestTokenResponse = unknown;

export type VerifyRequestTokenError = HTTPValidationError;

export type VerifyVerifyData = {
  body: Body_auth_verify_verify;
};

export type VerifyVerifyResponse = UserRead;

export type VerifyVerifyError = ErrorModel | HTTPValidationError;

export type UsersCurrentUserResponse = UserRead;

export type UsersCurrentUserError = unknown;

export type UsersPatchCurrentUserData = {
  body: UserUpdate;
};

export type UsersPatchCurrentUserResponse = UserRead;

export type UsersPatchCurrentUserError =
  | ErrorModel
  | unknown
  | HTTPValidationError;

export type UsersUserData = {
  path: {
    id: string;
  };
};

export type UsersUserResponse = UserRead;

export type UsersUserError = unknown | HTTPValidationError;

export type UsersPatchUserData = {
  body: UserUpdate;
  path: {
    id: string;
  };
};

export type UsersPatchUserResponse = UserRead;

export type UsersPatchUserError = ErrorModel | unknown | HTTPValidationError;

export type UsersDeleteUserData = {
  path: {
    id: string;
  };
};

export type UsersDeleteUserResponse = void;

export type UsersDeleteUserError = unknown | HTTPValidationError;

export type ReadItemResponse = Array<ItemRead>;

export type ReadItemError = unknown;

export type CreateItemData = {
  body: ItemCreate;
};

export type CreateItemResponse = ItemRead;

export type CreateItemError = HTTPValidationError;

export type DeleteItemData = {
  path: {
    item_id: string;
  };
};

export type DeleteItemResponse = unknown;

export type DeleteItemError = HTTPValidationError;
