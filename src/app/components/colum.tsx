'use client';
import { Task } from '../../../typesTasks';
import Button from '../components/button';

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
    <div className="p-4 bg-gray-100 rounded flex-grow min-w-[280px] max-w-full">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {tasks.map((task) => {
        const nextStatus = getNextStatus(task.status);
        return (
          <div key={task.id} className="rounded-3xl p-3 mb-4 bg-white"
            style={{
              boxShadow:
                "0px 6px 6px 0px #dae6ff, -2px -4px 10px 2px rgba(255, 255, 255, 0.25)",
            }}>
            <h3 className="font-bold">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            <p className="text-xs text-blue-500">Responsable: {task.assignedTo}</p>
            {nextStatus && (
              <Button
                id="btn1"
                color="pendiente"
                onClick={() => onStatusChange(task.id, nextStatus)}
              >
                Mover a {nextStatus.replace('_', ' ')}
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
};
