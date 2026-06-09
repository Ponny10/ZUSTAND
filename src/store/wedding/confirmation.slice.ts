import { StateCreator } from "zustand";

export type _ConfirmationSlice = {
    isConfirm: boolean;

    setIsConfirm: (value: boolean) => void;
};

export const createConfirmationSlice: StateCreator<_ConfirmationSlice> = ((set) => ({
    isConfirm: false,
    setIsConfirm: (value: boolean) => set({ isConfirm: value }),
}));