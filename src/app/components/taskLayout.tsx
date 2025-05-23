import React, { useState } from 'react';
import { useTaskContext } from '../context/tasksContext';
import { TaskCard } from './taskCard';

import { CreateTaskModal } from './newtasks';
import { Task } from '../../../typesTasks';

const TasksLayout = () => {
    const { tasks, addTask, editTask, deleteTask, updateTaskStatus } = useTaskContext();

    const [modalOpen, setModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

    const openCreateModal = () => {
        setTaskToEdit(null);
        setModalOpen(true);
    };

    const openEditModal = (task: Task) => {
        setTaskToEdit(task);
        setModalOpen(true);
    };

    const handleCreateTask = (taskData: Omit<Task, 'id'>) => {
        addTask(taskData);
        setModalOpen(false);
    };

    const handleEditTask = (task: Task) => {

        if (!task.id) {
            console.error("La tarea no tiene un ID. No se puede editar.");
            return;
        }
        editTask(task);
        setModalOpen(false);    
    };

    const handleDeleteTask = (id: string) => {
        if (confirm('¿Seguro quieres borrar esta tarea?')) {
            deleteTask(id);
        }
    };

    const handleDropTask = (taskId: string, newStatus: Task['status']) => {
        updateTaskStatus(taskId, newStatus);
    };

    return (
        <div className="p-4">
            <button
                onClick={openCreateModal}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
                Crear Nueva Tarea
            </button>

            <div className="flex gap-4 flex-wrap">
                {['pendiente', 'en_progreso', 'completada'].map((status) => (
                    <TaskCard
                        key={status}
                        title={status === 'pendiente' ? 'Pendientes' : status === 'en_progreso' ? 'En Progreso' : 'Completadas'}
                        columnId={status as Task['status']}
                        tasks={tasks.filter(task => task.status === status)}
                        onDropTask={handleDropTask}
                        textColor="text-black"
                        onEdit={openEditModal}
                        onDelete={handleDeleteTask}

                    />
                ))}
            </div>

            <CreateTaskModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onCreate={handleCreateTask}
                onEdit={handleEditTask}
                onDelete={deleteTask}
                onDrop={handleDropTask}
                taskToEdit={taskToEdit || undefined}
            />
        </div>
    );
};

export default TasksLayout;
