import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { _Person, createPersonSlice } from "./person.slice";
import { _GuestSlice, createGuestSlice } from "./guest.slice";
import { _DateSlice, createDateSlice } from "./date.slice";
import { _ConfirmationSlice, createConfirmationSlice } from "./confirmation.slice";

type _WeddingBoundStore = _Person & _GuestSlice & _DateSlice & _ConfirmationSlice;

export const useWeddingBoundStore = create<_WeddingBoundStore>()(
    devtools(
        (...res) => ({
            ...createPersonSlice(...res),
            ...createGuestSlice(...res),
            ...createDateSlice(...res),
            ...createConfirmationSlice(...res),
        }),
    )
)