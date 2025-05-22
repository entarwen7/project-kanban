'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { Task } from '../../../typesTasks';

interface TaskContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  updateTaskStatus: (id: number, status: Task['status']) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
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

  const updateTaskStatus = (id: number, status: Task['status']) => {
    setTasks(prev =>
      prev.map(task => task.id === id ? { ...task, status } : task)
    );
  };

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now(), // ID temporal
      status: 'pendiente',
    };
    setTasks(prev => [...prev, newTask]);
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, updateTaskStatus, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTaskContext debe usarse dentro de TaskProvider');
  return context;
};
