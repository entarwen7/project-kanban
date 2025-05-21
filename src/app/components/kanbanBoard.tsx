'use client';
import { useEffect, useState } from 'react';
import { Task } from '../../../typesTasks';
import { TaskColumn } from '../components/colum';
import { CreateTaskForm } from '../components/newtasks';

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);
    const data = await res.json();
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleStatusChange = async (id: number, newStatus: Task['status']) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchTasks(); // Refresca tareas
  };

  const handleNewTask = async (task: Omit<Task, 'id'>) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    fetchTasks();
  };

  if (loading) return <div>Cargando tareas...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tablero de Tareas</h1>
      <CreateTaskForm onCreate={handleNewTask} />
      <div className="flex gap-4 mt-6">
        <TaskColumn title="Pendientes" tasks={tasks.filter(t => t.status === 'pendiente')} onStatusChange={handleStatusChange} />
        <TaskColumn title="En Progreso" tasks={tasks.filter(t => t.status === 'en_progreso')} onStatusChange={handleStatusChange} />
        <TaskColumn title="Completadas" tasks={tasks.filter(t => t.status === 'completada')} onStatusChange={handleStatusChange} />
      </div>
    </div>
  );
}
