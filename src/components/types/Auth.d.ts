interface IUserInfo {
    id: string | null;
    email: string | null;
    first_name: string | null;
    last_name: string | null;
    username: string | null;
    profile_pic: string | null;
}

interface ISetAuthState {
    (userInfo: IUserInfo, expiresAt: string): void
}

interface IAuthContext {
    authState: {
        token: string | null;
        expiresAt: string | null;
        userInfo: any;
    };
    setAuthState: ISetAuthState;
    logout(): void;
    isAuthenticated(): boolean;
}

export { IAuthContext } 