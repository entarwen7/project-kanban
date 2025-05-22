import { useState } from 'react';
import { Task } from '../../../typesTasks';
import Card from '../components/card';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (task: Omit<Task, 'id'>) => void;
}

export const CreateTaskModal = ({ isOpen, onClose, onCreate }: Props) => {
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

  if (!isOpen) return null;

  return (

    <Card>
      <div className="fixed inset-0 bg-black bg-opacity-100 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Crear Nueva Tarea</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block">Título</label>
              <input
                className="border w-full rounded p-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block">Descripción</label>
              <input
                className="border w-full rounded p-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label className="block">Responsable</label>
              <input
                className="border w-full rounded p-2"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded border border-gray-400"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
    </Card >
  );
};
