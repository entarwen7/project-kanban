'use client';
import { useState } from 'react';
import { useTaskContext } from '../context/tasksContext';
import Button from '../components/button';

import { TaskColumn } from '../components/colum';
import { CreateTaskModal } from '../components/newtasks';

export default function KanbanBoard() {
  const { tasks, updateTaskStatus, addTask } = useTaskContext();
 
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tablero de Tareas</h1>
      <Button
        id='btnNuevaTarea'
        onClick={() => setModalOpen(true)}
        color='proceso'

      >
        Nueva Tarea
      </Button>

      <CreateTaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={(task) => {
          addTask(task); 
          setModalOpen(false);
        }}
      />

      <div className="flex flex-wrap gap-4 mt-6">
        <TaskColumn title="Pendientes" tasks={tasks.filter(t => t.status === 'pendiente')} onStatusChange={updateTaskStatus} />
        <TaskColumn title="En Progreso" tasks={tasks.filter(t => t.status === 'en_progreso')} onStatusChange={updateTaskStatus} />
        <TaskColumn title="Completadas" tasks={tasks.filter(t => t.status === 'completada')} onStatusChange={updateTaskStatus} />
      </div>
    </div>

  
  );
}
