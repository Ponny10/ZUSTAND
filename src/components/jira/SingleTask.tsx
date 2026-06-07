
import { IoReorderTwoOutline } from 'react-icons/io5'
import { _Task, useTaskStore } from '../../store'

type _SingleTaskProps = {
    task: _Task;
};

export const SingleTask = ({ task }: _SingleTaskProps) => {
    const removeDraggingTaskId = useTaskStore((state) => state.removeDraggingTaskId);
    const setDraggingTaskId = useTaskStore((state) => state.setDraggingTaskId);

    return (
        <div
            className="mt-5 flex items-center justify-between p-2"
            draggable
            onDragStart={() => setDraggingTaskId(task.id)}
            onDragEnd={() => removeDraggingTaskId()}
        >
            <div className="flex items-center justify-center gap-2">
                <p className="text-base font-bold text-navy-700">
                    {task.title}
                </p>
            </div>
            <span className=" h-6 w-6 text-navy-700 cursor-pointer">
                <IoReorderTwoOutline />
            </span>
        </div>
    )
}
