import { createJSONStorage, type StateStorage } from "zustand/middleware";

const sessionStorageAPI: StateStorage = {
    getItem: function (name: string): string | null | Promise<string | null> {
        const data = sessionStorage.getItem(name);
        return data;
    },
    setItem: function (name: string, value: string): void {
        sessionStorage.setItem(name, value);
    },
    removeItem: function (name: string): void {
        console.log('remove ', {name});
        
    }
}

export const customSessionStorage = createJSONStorage(() => sessionStorageAPI);