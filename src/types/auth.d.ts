export type SignInParams = {
    email: string;
    password: string;
};

export type SignUpParams = SignInParams & {
    fullName: string;
};

export type AuthData = {
    accessToken: string;
    refreshToken: string;
};

export type User = {
    email: string;
    fullName: string;
};
