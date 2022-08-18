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

export type UserData = {
    email: string;
};

export type SignInResult = {
    auth: AuthData;
    user: UserData;
};
