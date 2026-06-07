import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { customSessionStorage } from '../storages/index';

export interface _Task {
    id: string;
    title: string;
    status: _TaskStatus;
}

export type _TaskStatus = 'open' | 'in-progress' | 'done';

interface _TaskState {
    tasks: Record<string, _Task>;
    getTaskByStatus: (status: _TaskStatus) => _Task[];
    addTask: (title: string, status: _TaskStatus) => void;

    //* TIPOS DEL DRAG & DROP
    draggingTaskId?: string;
    setDraggingTaskId: (taskId: string) => void;
    removeDraggingTaskId: () => void;

    //* TIPO PARA ACTUALIZAR LA TAREA
    changeTaskStatus: (taskId: string, status: _TaskStatus) => void;
    onTaskDrop: (status: _TaskStatus) => void;
}

const storeApi: StateCreator<
    _TaskState,
    [
        ["zustand/devtools", never],
        ["zustand/persist", unknown],
        ["zustand/immer", never],
    ]
> = (set, get) => ({
    tasks: {
        'ABC-1': { id: 'ABC-1', title: 'Task 1', status: 'open' },
        'ABC-2': { id: 'ABC-2', title: 'Task 2', status: 'in-progress' },
        'ABC-3': { id: 'ABC-3', title: 'Task 3', status: 'open' },
        'ABC-4': { id: 'ABC-4', title: 'Task 4', status: 'done' },
        'ABC-5': { id: 'ABC-5', title: 'Task 5', status: 'open' },
    },
    getTaskByStatus: (status: _TaskStatus) => Object.values(get().tasks).filter((task) => task.status === status),
    addTask: (title: string, status: _TaskStatus) => {
        const newTask: _Task = { id: String(Date.now()), status, title };

        //* COMO SE HACE CON MIDDLEWARE IMMER PROPIO DE ZUSTAND
        set((state) => {state.tasks[newTask.id] = newTask})
        
        //? Como se hace con el spred
        /* set((state) => ({
            tasks: {
                ...state.tasks,
                [newTask.id]: newTask,
            },
        })); */
    },
    /* //* VALORES INICIALES DEL DRAG & DROP */
    draggingTaskId: undefined,
    removeDraggingTaskId: () => set(({ draggingTaskId: undefined })),
    setDraggingTaskId: (draggingTaskId: string) => set(({ draggingTaskId })),
    
    //* VALORES INICIALES PARA ACTUALIZAR ESTATUS DE UNA TAREA
    changeTaskStatus: (taskId: string, status: _TaskStatus) => {
        /* const task = get().tasks[taskId];
        task.status = status; */

        set((state) => {
            state.tasks[taskId] = {
                ...state.tasks[taskId],
                status,
            }
        })
    },
    onTaskDrop: (status: _TaskStatus) => {
        const taskId = get().draggingTaskId;
        if (!taskId) return;

        get().changeTaskStatus(taskId, status);
        get().removeDraggingTaskId();
    }
});

export const useTaskStore = create<_TaskState>()(
    devtools(
        persist(
            immer(storeApi),
            {
                name: 'task-persist',
                storage: customSessionStorage,
            }
        )
    )
);