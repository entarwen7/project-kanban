import { useState } from 'react';
import { Task } from '../../../typesTasks';

interface Props {
  onCreate: (task: Omit<Task, 'id'>) => void;
}

export const CreateTaskForm = ({ onCreate }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !assignedTo) return;
    onCreate({ title, description, status: 'pendiente', assignedTo });
    setTitle('');
    setDescription('');
    setAssignedTo('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-end">
      <div>
        <label className="block">Título</label>
        <input
          className="border rounded p-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label className="block">Descripción</label>
        <input
          className="border rounded p-1"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label className="block">Responsable</label>
        <input
          className="border rounded p-1"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        />
      </div>
      <button className="bg-green-600 text-white px-3 py-1 rounded" type="submit">
        Crear Tarea
      </button>
    </form>
  );
};
