// hooks/useTasks.ts
import { useEffect, useState } from 'react';
import { Task } from '../../../typesTasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tasks", err);
        setLoading(false);
      });
  }, []);

  return { tasks, loading };
};
