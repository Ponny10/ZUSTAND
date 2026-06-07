import { DragEvent, useState } from 'react';

import { IoAddCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import classNames from 'classnames';
import Swal from 'sweetalert2'

import { _Task, _TaskStatus, useTaskStore } from '../../store';
import { SingleTask } from './SingleTask';

interface Props {
  tasks: _Task[];
  title: string;
  value: _TaskStatus;
}


export const JiraTasks = ({ tasks, title, value }: Props) => {

  const [onDragOver, setOnDragOver] = useState(false);

  const draggingTaskId = useTaskStore((state) => !!state.draggingTaskId);
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
  const addTask = useTaskStore((state) => state.addTask);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(true);
  }
  const handleOnDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
  }
  const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
    onTaskDrop(value);
  }

  const handleAddTask = async () => {
    const newTask = await Swal.fire({
      title: 'Agregar nueva tarea',
      input: 'text',
      inputLabel: 'Nombre de la tarea',
      showCancelButton: true,
      inputValidator(value) {
        if (!value) {
          return 'Nombre de la tarea obligatoria'
        }
      },
    })
    console.log('ADDTASK = ', newTask);

    if (newTask.value) {
      addTask(newTask.value, value);
    }

  }

  return (
    <div
      className={classNames("!text-black border-2 relative flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]", {
        'border-blue-500 border-dotted': draggingTaskId,
        'border-green-500 border-dotted': draggingTaskId && onDragOver
      })}
      /* //* Las siguientes opciones van de la mano con lo que se hace en <SingleTask/>
         //* Es para interceptar las opciones del drag & drop
       */
      onDragOver={handleDragOver}
      onDragLeave={handleOnDragLeave}
      onDrop={handleOnDrop}
    >



      {/* Task Header */}
      <div className="relative flex flex-row justify-between">

        <div className="flex items-center justify-center">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
              <IoCheckmarkCircleOutline style={{ fontSize: '50px' }} />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{title}</h4>
        </div>

        <button onClick={handleAddTask}>
          <IoAddCircleOutline />
        </button>

      </div>
      <div className="h-full w-full">
        {
          tasks.map((task) => <SingleTask key={task.id} task={task} />)
        }

      </div>
    </div>
  );
};