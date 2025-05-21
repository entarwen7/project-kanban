'use client';
import { Task } from '../../../typesTasks';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onStatusChange: (id: number, newStatus: Task['status']) => void;
}

export const TaskColumn = ({ title, tasks, onStatusChange }: TaskColumnProps) => {
  const getNextStatus = (status: Task['status']): Task['status'] | null => {
    if (status === 'pendiente') return 'en_progreso';
    if (status === 'en_progreso') return 'completada';
    return null;
  };

  return (
    <div className="p-4 bg-gray-100 rounded w-1/3">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {tasks.map((task) => {
        const nextStatus = getNextStatus(task.status);
        return (
          <div key={task.id} className="bg-white p-4 mb-3 rounded shadow">
            <h3 className="font-bold">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            <span className="text-xs text-blue-500">Responsable: {task.assignedTo}</span>
            {nextStatus && (
              <button
                className="mt-2 px-2 py-1 text-sm bg-blue-500 text-white rounded"
                onClick={() => onStatusChange(task.id, nextStatus)}
              >
                Mover a {nextStatus.replace('_', ' ')}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};
