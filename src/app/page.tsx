
import KanbanBoard from "./components/kanbanBoard";
import Card from "./components/card";
import { TaskProvider } from '../app/context/tasksContext';


export default function Home() {
    return (
        <TaskProvider>
            <section className='container mx-auto p-2'>
                <div className='flex flex-col items-center space-y-8'>
                    {/* Información básica */}
                    <Card>
                        <KanbanBoard />
                    </Card>                   
                </div>
            </section>
        </TaskProvider>
    );
}
