import { JiraTasks } from '../../components';
import { useTaskStore } from '../../store';

export const JiraPage = () => {
  const doneTask = useTaskStore().getTaskByStatus('done');
  const inProgressTask = useTaskStore().getTaskByStatus('in-progress');
  const pendingTask = useTaskStore().getTaskByStatus('open');

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <JiraTasks tasks={pendingTask} title='Pendientes' value='open' />

        <JiraTasks tasks={inProgressTask} title='Avanzando' value='in-progress' />

        <JiraTasks tasks={doneTask} title='Terminadas' value='done' />

      </div>





    </>
  );
};