import { useState } from 'react';

const ModalContainer = () => {
    const [modalOpen, setModalOpen] = useState(false);

    interface TaskData {
        id?: number; 
        status: string;
        title: string;
        description?: string;
    }
        

    interface CreateTaskModalProps {
        isOpen: boolean;
        onClose: () => void;
        onCreate: (taskData: TaskData) => void;
    }

    const CreateTaskModal: React.FC<CreateTaskModalProps> = () => null;

    async function handleNewTask(task: TaskData) {
       
        console.log('New task created:', task);
        // You can add API calls or state updates here as needed
    }

    return (
        <CreateTaskModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onCreate={async (task) => {
                await handleNewTask(task);
                setModalOpen(false); 
            }}
        />
    );
};

export default ModalContainer;
