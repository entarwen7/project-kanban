'use client';
import React, { useState } from 'react';
import { Task } from '../../../typesTasks';


interface Props {
  title: string;
  columnId: 'pendiente' | 'en_progreso' | 'completada';
  tasks: Task[];
  onDropTask: (taskId: string, newStatus: Task['status']) => void;
  bgColor?: string;

}
export const TaskCard: React.FC<Props> = ({ title, columnId, tasks, onDropTask, bgColor = "bg-gray-100" }) => {
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

  return (
    <div
      className={`w-full sm:w-[30%] min-h-[300px] p-4 rounded-lg shadow ${bgColor} ${isOver ? 'ring-2 ring-blue-400' : ''}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <div className="flex flex-col gap-2">
        {tasks.map(task => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => handleDragStart(e, task.id)}
            className="bg-white p-3 rounded shadow mb-2 cursor-move"
          >
            <h3 className="font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <p className="text-sm text-gray-600">Asignado a: {task.assignedTo || 'No asignado'}</p>
            <p className="text-sm text-gray-500 italic">Estado: {task.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

