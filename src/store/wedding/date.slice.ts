import { StateCreator } from "zustand";

export type _DateSlice = {
    eventDate: Date;

    setEventDate: (date: string) => void;
    setEventTime: (date: string) => void;

    eventYYYYMMDD: () => string;
    eventHHMM: () => string;
}

export const createDateSlice: StateCreator<_DateSlice> = ((set, get) => ({
    eventDate: new Date(),

    setEventDate: (date: string) => set((state) => {
        const getDate = new Date(date);

        const year = getDate.getFullYear();
        const month = getDate.getMonth() + 1;
        const day = getDate.getDate();

        const newDate = new Date(state.eventDate);
        newDate.setFullYear(year);
        newDate.setMonth(month);
        newDate.setDate(day);

        return { eventDate: newDate };
    }),
    setEventTime: (time: string) => set((state) => {
        console.log('TIME = ', time);

        const hours = parseInt(time.split(':')[0]);
        const minutes = parseInt(time.split(':')[1]);

        const newDate = new Date(state.eventDate);
        newDate.setHours(hours, minutes);

        return { eventDate: newDate };
    }),

    eventYYYYMMDD: () => {
        return get().eventDate.toISOString().split('T')[0];
    },
    eventHHMM: () => {
        const hours = get().eventDate.getHours().toString().padStart(2, '0');
        const minutes = get().eventDate.getMinutes().toString().padStart(2, '0');

        return `${hours}:${minutes}`;
    }
}))