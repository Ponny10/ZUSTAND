import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { AuthService } from "../../service/auth.service";
import { customSessionStorage } from '../storages/index';

export type _AuthState = {
    status: _Status,
    token?: string,
    user?: _User,

    loginUser: (email: string, password: string) => void,
    logOut: () => void;
};

export type _User = {
    id: string;
    email: string;
    fullName: string;
    isActive: boolean;
    roles: string[];
};

export type _Status = 'authorized' | 'unauthorized' | 'pending'

const storeApi: StateCreator<_AuthState, [["zustand/persist", unknown]], [["zustand/devtools", never]]> = ((set) => ({
    status: 'unauthorized',
    token: undefined,
    user: undefined,

    loginUser: async (email: string, password: string) => {
        try {
            const { token, ...user } = await AuthService.login(email, password);
            set({ status: 'authorized', user, token });
        } catch (error) {
            console.log('Error service...');

            set({ status: 'unauthorized', token: undefined, user: undefined });
        }
    },
    logOut: () => set({
        status: 'unauthorized',
        token: undefined,
        user: undefined,
    }),
}));

export const useAuthStore = create<_AuthState>()(
    devtools(
        persist(storeApi,
            { name: 'auth-storage', storage: customSessionStorage }
        )
    )
);