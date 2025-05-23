'use client';
import { useState } from 'react';
import { useTaskContext } from '../context/tasksContext';

import { Task } from '../../../typesTasks';
import { TaskCard } from './taskCard';
import { CreateTaskModal } from '../components/newtasks';

export default function KanbanBoard() {
  const { tasks, updateTaskStatus, addTask, deleteTask, editTask } = useTaskContext();

  const [modalOpen, setModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);


  const handleDropTask = (taskId: string, status: Task['status']) => {
    updateTaskStatus(taskId, status);
  };


  return (

    <div className="p-4">
      <div className="px-4 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <h1 className="text-2xl font-bold ">Tablero de Tareas</h1>
        <button
          id="btnNuevaTarea" onClick={() => setModalOpen(true)}
          className="bg-[#5782f2] hover:bg-[#4367ee] text-white px-4 py-2 rounded-lg shadow transition-colors duration-200 text-sm sm:text-base"
        >
          + Nueva tarea
        </button>
      </div>
      <div className="px-4 sm:px-8 mb-6 text-gray-500 text-sm sm:text-base text-left leading-relaxed">
        <p>
          Utiliza este tablero para organizar y asignar tareas dentro del equipo de trabajo.
          Puedes crear nuevas tareas, editarlas o eliminarlas según sea necesario.
        </p>
        <p className="mt-1">
          *Para avanzar una tarea o cambiar su estado, simplemente arrástrala de una columna a otra.
        </p>
      </div>

      <CreateTaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={(task) => {
          addTask(task);
          setModalOpen(false);
        }}
        onEdit={editTask}
        taskToEdit={taskToEdit}
        onDelete={() => { }}
        onDrop={() => { }}
      />

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <TaskCard
          title="Pendientes"
          columnId="pendiente"
          bgColor="bg-[#EDEFFF]"
          textColor="text-[#5A51D1]"
          tasks={tasks.filter(t => t.status === 'pendiente')}
          onDropTask={handleDropTask}
          onEdit={(task) => {
            setTaskToEdit(task);
            setModalOpen(true);
          }}
          onDelete={deleteTask}
        />
        <TaskCard
          title="En Progreso"
          columnId="en_progreso"
          bgColor="bg-[#E8F6F8]"
          textColor="text-[#3698B8]"
          tasks={tasks.filter(t => t.status === 'en_progreso')}
          onDropTask={handleDropTask}
          onEdit={(task) => {
            setTaskToEdit(task);
            setModalOpen(true);
          }}
          onDelete={deleteTask}
        />
        <TaskCard
          title="Completadas"
          columnId="completada"
          bgColor="bg-[#E9F9EF]"
          textColor="text-[#3BAA74]"
          tasks={tasks.filter(t => t.status === 'completada')}
          onDropTask={handleDropTask}
          onEdit={(task) => {
            setTaskToEdit(task);
            setModalOpen(true);
          }}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
}
