import { useState, useEffect } from 'react';
import { Task } from '../../../typesTasks';
import Card from '../components/card';



interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (task: Omit<Task, 'id'>) => void;
  onEdit?: (taskData: Task) => void;
  onDelete: (id: string) => void;
  onDrop: (id: string, newStatus: Task['status']) => void;
  taskToEdit?: Task;
}

export const CreateTaskModal = ({ isOpen, onClose, onCreate, onEdit,
  taskToEdit }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState<'pendiente' | 'en_progreso' | 'completada'>('pendiente');


  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || '');
      setAssignedTo(taskToEdit.assignedTo || '');
      setStatus(taskToEdit.status);
    } else {
      setTitle('');
      setDescription('');
      setAssignedTo('');
      setStatus('pendiente');
    }
  }, [taskToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (taskToEdit && onEdit) {
      await onEdit({
        id: taskToEdit.id,
        title,
        description,
        assignedTo,
        status,
      });
    } else {
      await onCreate({ title, description, assignedTo, status });
    }

    onClose();
  };


  if (!isOpen) return null;

  const participants = [
    { name: 'Fabio Morales', email: 'fmorales@innerconsulting.com' },
    { name: 'Mariana Ruiz', email: 'mruiz@innerconsulting.com' },
    { name: 'Julian Ospina', email: 'jospina@innerconsulting.com' },
    { name: 'Liseth Arévalo', email: 'liseth.arevaloe@gamil.com' },
  ];


  return (

    <Card>
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {taskToEdit ? 'Editar Tarea' : 'Crear Nueva Tarea'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input
                className="border border-gray-300 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea
                className="border border-gray-300 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Responsable</label>
              <select
                className="border border-gray-300 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                required
              >
                <option value="">Seleccionar responsable</option>
                {participants.map((p) => (
                  <option key={p.email} value={p.email}>
                    {p.name}
                  </option>
                ))}
              </select>
              {assignedTo && (
                <p className="text-sm mt-1 font-semibold text-indigo-600">
                  Asignado a: {participants.find((p) => p.email === assignedTo)?.name || assignedTo}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select
                className={`border rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 ${status === 'pendiente'
                  ? 'bg-blue-100 focus:ring-blue-400'
                  : status === 'en_progreso'
                    ? 'bg-yellow-100 focus:ring-yellow-400'
                    : 'bg-green-100 focus:ring-green-400'
                  }`}
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as 'pendiente' | 'en_progreso' | 'completada')
                }
              >
                <option value="pendiente">🕒 Pendiente</option>
                <option value="en_progreso">⚙️ En progreso</option>
                <option value="completada">✅ Completada</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
              >
                {taskToEdit ? 'Guardar Cambios' : 'Crear Tarea'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Card >
  );
};
