'use client';
import { useState } from 'react';
import { useTaskContext } from '../context/tasksContext';

import { Task } from '../../../typesTasks';
import { TaskCard } from './taskCard';
import { CreateTaskModal } from '../components/newtasks';

export default function KanbanBoard() {
  const { tasks, updateTaskStatus, addTask } = useTaskContext();

  const [modalOpen, setModalOpen] = useState(false);

  const handleDropTask = (taskId: string, status: Task['status']) => {
    updateTaskStatus(taskId, status);
  };


  return (

    <div className="p-6">
      <div className="px-4 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <h1 className="text-2xl font-bold ">Tablero de Tareas</h1>
        <button
          id="btnNuevaTarea" onClick={() => setModalOpen(true)}
          className="bg-[#5782f2] hover:bg-[#4367ee] text-white px-4 py-2 rounded-lg shadow transition-colors duration-200 text-sm sm:text-base"
        >
          + Nueva tarea
        </button>
      </div>
      
      <CreateTaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={(task) => {
          addTask(task);
          setModalOpen(false);
        }}
      />
      
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <TaskCard title="Pendientes" columnId="pendiente" bgColor="bg-pink-100" tasks={tasks.filter(t => t.status === 'pendiente')} onDropTask={handleDropTask} />
        <TaskCard title="En Progreso" columnId="en_progreso" bgColor="bg-yellow-100" tasks={tasks.filter(t => t.status === 'en_progreso')} onDropTask={handleDropTask} />
        <TaskCard title="Completadas" columnId="completada" bgColor="bg-green-100" tasks={tasks.filter(t => t.status === 'completada')} onDropTask={handleDropTask} />
      </div>
    </div>



  );
}
