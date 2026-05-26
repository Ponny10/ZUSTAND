import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { customSessionStorage } from "../storages";

type _Person = {
    firstName: string;
    lastName: string;
}

type _ActionsPerson = {
    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;
}

// * StateCreator sirve para definir el estado de manera independiente y agregarlo a un store customizado, por ejemplo con persist.

// * Se agrega [["zustand/devtools", never], ['zustand/persist', unknown]] como parte del tipado del estado para las herramientas devtools


const personState: StateCreator<_Person & _ActionsPerson, [["zustand/devtools", never], ['zustand/persist', unknown]]> = (set) => ({
    firstName: '',
    lastName: '',
    setFirstName: (value: string) => set(({ firstName: value }),undefined, 'setFirstName'),
    setLastName: (value: string) => set(({ lastName: value }),undefined, 'setLastName'),
});

//* devtools: para visualizar el state en el navegador, como redux
//* persist: persistencia de de datos en sessionStorage

export const usePersonStore = create<_Person & _ActionsPerson>()(
    devtools(
        persist(personState, { name: 'person-storage', storage: customSessionStorage }),
    ),
);