import { create } from 'zustand'

type _Bear = {
    id: number;
    name: string;
}

type _BearState = {
    bears: _Bear[];
    blackPandaBears: number;
    increaseBlackBears: (by: number) => void;
    increasePandaBears: (by: number) => void;
    increasePolarBears: (by: number) => void;
    pandaBears: number;
    polarPandaBears: number;

    // *Objeto computado
    computed: {
        totalBears: number;
    },

    addBear: () => void;
    clearBears: () => void;
}

export const useBear = create<_BearState>((set, get) => ({
    addBear: () => set(state => ({bears: [...state.bears, {id: state.bears.length + 1, name: `Oso ${state.bears.length + 1}`}]})),
    bears: [{id: 1, name: `Oso #1`}],
    blackPandaBears: 5,
    clearBears: () => set({ bears: [] }),
    computed: {
        get totalBears(): number {
            return get().blackPandaBears + get().pandaBears + get().polarPandaBears + get().bears.length;
        }
    },
    increaseBlackBears: (by: number) => set((state) => ({ blackPandaBears: state.blackPandaBears + by })),
    increasePandaBears: (by: number) => set((state) => ({ pandaBears: state.pandaBears + by })),
    increasePolarBears: (by: number) => set((state) => ({ polarPandaBears: state.polarPandaBears + by })),
    pandaBears: 10,
    polarPandaBears: 2,
}));