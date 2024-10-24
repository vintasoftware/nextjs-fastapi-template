// This file is auto-generated by @hey-api/openapi-ts

export type BearerResponse = {
    access_token: string;
    token_type: string;
};

export type Body_auth_jwt_login_auth_jwt_login_post = {
    grant_type?: (string | null);
    username: string;
    password: string;
    scope?: string;
    client_id?: (string | null);
    client_secret?: (string | null);
};

export type Body_reset_forgot_password_auth_forgot_password_post = {
    email: string;
};

export type Body_reset_reset_password_auth_reset_password_post = {
    token: string;
    password: string;
};

export type Body_verify_request_token_auth_request_verify_token_post = {
    email: string;
};

export type Body_verify_verify_auth_verify_post = {
    token: string;
};

export type ErrorModel = {
    detail: (string | {
    [key: string]: (string);
});
};

export type HTTPValidationError = {
    detail?: Array<ValidationError>;
};

export type UserCreate = {
    email: string;
    password: string;
    is_active?: (boolean | null);
    is_superuser?: (boolean | null);
    is_verified?: (boolean | null);
};

export type UserRead = {
    id: string;
    email: string;
    is_active?: boolean;
    is_superuser?: boolean;
    is_verified?: boolean;
};

export type UserUpdate = {
    password?: (string | null);
    email?: (string | null);
    is_active?: (boolean | null);
    is_superuser?: (boolean | null);
    is_verified?: (boolean | null);
};

export type ValidationError = {
    loc: Array<(string | number)>;
    msg: string;
    type: string;
};

export type AuthJwtLoginAuthJwtLoginPostData = {
    body: Body_auth_jwt_login_auth_jwt_login_post;
};

export type AuthJwtLoginAuthJwtLoginPostResponse = (BearerResponse);

export type AuthJwtLoginAuthJwtLoginPostError = (ErrorModel | HTTPValidationError);

export type AuthJwtLogoutAuthJwtLogoutPostResponse = (unknown);

export type AuthJwtLogoutAuthJwtLogoutPostError = (unknown);

export type RegisterRegisterAuthRegisterPostData = {
    body: UserCreate;
};

export type RegisterRegisterAuthRegisterPostResponse = (UserRead);

export type RegisterRegisterAuthRegisterPostError = (ErrorModel | HTTPValidationError);

export type ResetForgotPasswordAuthForgotPasswordPostData = {
    body: Body_reset_forgot_password_auth_forgot_password_post;
};

export type ResetForgotPasswordAuthForgotPasswordPostResponse = (unknown);

export type ResetForgotPasswordAuthForgotPasswordPostError = (HTTPValidationError);

export type ResetResetPasswordAuthResetPasswordPostData = {
    body: Body_reset_reset_password_auth_reset_password_post;
};

export type ResetResetPasswordAuthResetPasswordPostResponse = (unknown);

export type ResetResetPasswordAuthResetPasswordPostError = (ErrorModel | HTTPValidationError);

export type VerifyRequestTokenAuthRequestVerifyTokenPostData = {
    body: Body_verify_request_token_auth_request_verify_token_post;
};

export type VerifyRequestTokenAuthRequestVerifyTokenPostResponse = (unknown);

export type VerifyRequestTokenAuthRequestVerifyTokenPostError = (HTTPValidationError);

export type VerifyVerifyAuthVerifyPostData = {
    body: Body_verify_verify_auth_verify_post;
};

export type VerifyVerifyAuthVerifyPostResponse = (UserRead);

export type VerifyVerifyAuthVerifyPostError = (ErrorModel | HTTPValidationError);

export type UsersCurrentUserUsersMeGetResponse = (UserRead);

export type UsersCurrentUserUsersMeGetError = (unknown);

export type UsersPatchCurrentUserUsersMePatchData = {
    body: UserUpdate;
};

export type UsersPatchCurrentUserUsersMePatchResponse = (UserRead);

export type UsersPatchCurrentUserUsersMePatchError = (ErrorModel | unknown | HTTPValidationError);

export type UsersUserUsersIdGetData = {
    path: {
        id: string;
    };
};

export type UsersUserUsersIdGetResponse = (UserRead);

export type UsersUserUsersIdGetError = (unknown | HTTPValidationError);

export type UsersPatchUserUsersIdPatchData = {
    body: UserUpdate;
    path: {
        id: string;
    };
};

export type UsersPatchUserUsersIdPatchResponse = (UserRead);

export type UsersPatchUserUsersIdPatchError = (ErrorModel | unknown | HTTPValidationError);

export type UsersDeleteUserUsersIdDeleteData = {
    path: {
        id: string;
    };
};

export type UsersDeleteUserUsersIdDeleteResponse = (void);

export type UsersDeleteUserUsersIdDeleteError = (unknown | HTTPValidationError);

export type AuthenticatedRouteAuthenticatedRouteGetResponse = (unknown);

export type AuthenticatedRouteAuthenticatedRouteGetError = unknown;