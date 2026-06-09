import { StateCreator } from "zustand";


export type _GuestSlice = {
    guestCount: number;

    setGuestCount: (value: number) => void;
}

export const createGuestSlice: StateCreator<_GuestSlice> = ((set) => ({
    guestCount: 0,

    setGuestCount: (value: number) => set({
        guestCount: value > 0 ? value : 0,
    })
}))