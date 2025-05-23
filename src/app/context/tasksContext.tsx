'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { Task } from '../../../typesTasks';

interface TaskContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  updateTaskStatus: (id: string, status: Task['status']) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  editTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);


  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);
      const data = await res.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const updateTaskStatus = async (id: string, status: Task['status']) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error('Error al actualizar');

      const updatedTask = await res.json();

      setTasks(prev =>
        prev.map(task => (task.id === id ? updatedTask : task))
      );
    } catch (error) {
      console.error('Error actualizando tarea en backend:', error);
    }
  };

  const addTask = async (task: Omit<Task, 'id'>) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, status: 'pendiente' }),
      });

      if (!res.ok) throw new Error('Error al crear tarea');

      const newTask = await res.json();
      setTasks(prev => [...prev, newTask]);
    } catch (error) {
      console.error('Error al crear tarea:', error);
    }
  };

  const editTask = async (updatedTask: Task) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${updatedTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });

      if (!res.ok) throw new Error('Error al editar tarea');

      const updatedFromBackend = await res.json();

      setTasks(prev =>
        prev.map(task =>
          task.id === updatedFromBackend.id ? updatedFromBackend : task
        )
      );

    } catch (error) {
      console.error('Error al editar la tarea:', error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Error al borrar tarea');

      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error al borrar la tarea:', error);
    }
  };



  return (
    <TaskContext.Provider value={{ tasks, setTasks, updateTaskStatus, addTask, editTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTaskContext debe usarse dentro de TaskProvider');
  return context;
};
