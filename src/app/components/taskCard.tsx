'use client';
import React, { useState } from 'react';
import { Task } from '../../../typesTasks';



interface Props {
  title: string;
  columnId: 'pendiente' | 'en_progreso' | 'completada';
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onDropTask: (taskId: string, newStatus: Task['status']) => void;
  bgColor?: string;
  textColor: string;


}
export const TaskCard: React.FC<Props> = ({ title, columnId, tasks, onDropTask, bgColor = "bg-gray-100", textColor, onEdit, onDelete }) => {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const taskId = String(e.dataTransfer.getData('text/plain'));
    onDropTask(taskId, columnId);
    setIsOver(false);
  };

  const handleDragEnter = () => setIsOver(true);
  const handleDragLeave = () => setIsOver(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData('text/plain', id);

  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'pendiente':
        return 'bg-red-500';
      case 'en_progreso':
        return 'bg-yellow-400';
      case 'completada':
        return 'bg-green-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusTextColor = (status: Task['status']) => {
    switch (status) {
      case 'pendiente':
        return 'text-red-700';
      case 'en_progreso':
        return 'text-yellow-500';
      case 'completada':
        return 'text-green-700';
      default:
        return 'text-gray-700';
    }
  };


  const statuses: Task['status'][] = ['pendiente', 'en_progreso', 'completada'];

  const getNextStatus = (status: Task['status']) => {
    const idx = statuses.indexOf(status);
    return statuses[idx + 1] ?? status;
  };

  const getPreviousStatus = (status: Task['status']) => {
    const idx = statuses.indexOf(status);
    return statuses[idx - 1] ?? status;
  };


  return (
    <div
      className={`w-full sm:w-[30%] min-h-[300px] p-4 rounded-lg shadow ${bgColor} ${isOver ? 'ring-2 ring-blue-400' : ''}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <h2 className={`text-xl font-semibold mb-3 ${textColor}`}>{title}</h2>
      <div className="flex flex-col gap-2">
        {tasks.map(task => (

          <div
            key={task.id}
            draggable
            onDragStart={(e) => handleDragStart(e, task.id)}
            className="relative group bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-move"
          >
            <span
              className={`w-3 h-3 rounded-full absolute top-3 right-3 ${getStatusColor(task.status)}`}
              title={task.status}
            />
            <h3 className="font-bold">{task.title}</h3>
            <p>Descripción:{task.description}</p>
            <p className="text-sm text-gray-600">👤Asignado a: {task.assignedTo || 'No asignado'}</p>
            <p className={`text-sm italic ${getStatusTextColor(task.status)}`}>
              Estado: {task.status}
            </p>

            {/* Botones de cambiar estado solo en mobile */}
            <div className="flex sm:hidden justify-between mb-3 mt-1 gap-2">
              {task.status !== 'pendiente' && (
                <button
                  onClick={() => onDropTask(task.id, getPreviousStatus(task.status))}
                  className="px-2 py-1 text-xs bg-gray-200 text-gray-800 rounded"
                >
                  ← Atrás
                </button>
              )}
              {task.status !== 'completada' && (
                <button
                  onClick={() => onDropTask(task.id, getNextStatus(task.status))}
                  className="px-2 py-1 text-xs bg-blue-200 text-blue-800 rounded"
                >
                  Avanzar →
                </button>
              )}
            </div>

            <div className="absolute pt-8 bottom-2 right-2 flex gap-2 opacity-100 sm:mt-8 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
              {/* Editar */}
              <button onClick={() => onEdit(task)} title="Editar">
                <svg className="w-4 h-4 text-blue-600 hover:text-blue-800" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z" />
                  <path d="M3 21h18" />
                </svg>
              </button>

              {/* Borrar */}
              <button onClick={() => onDelete(task.id)} title="Eliminar">
                <svg className="w-4 h-4 text-red-500 hover:text-red-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M6 7h12M9 7v10m6-10v10M4 7h16l-1 12a2 2 0 01-2 2H7a2 2 0 01-2-2L4 7zM10 4h4a1 1 0 011 1v1H9V5a1 1 0 011-1z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

