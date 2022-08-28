export type SignInParams = {
    email: string;
    password: string;
};

export type SignUpParams = SignInParams & {
    fullName: string;
};

export type SessionData = {
    email: string;
};

export type SignInResult = {
    accessToken: string;
    refreshToken: string;
};

export type RefreshTokenResult = {
    accessToken: string;
};
