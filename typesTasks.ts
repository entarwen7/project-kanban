export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pendiente' | 'en_progreso' | 'completada';
  assignedTo: string;
}
export interface TaskForm {
  title: string;
  description: string;
  status: 'pendiente' | 'en_progreso' | 'completada';
  assignedTo: string;
}