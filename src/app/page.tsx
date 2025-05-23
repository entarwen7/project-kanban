
import KanbanBoard from "./components/kanbanBoard";
import { TaskProvider } from '../app/context/tasksContext';


export default function Home() {
    return (
        <TaskProvider>
            <main className="min-h-screen bg-[#f5f5f5] text-[#333] font-sans">

                {/* Header */}
                <header className="bg-black text-white px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-center sm:justify-between gap-2 sm:gap-6">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl sm:text-2xl font-bold">Tablero Kanban</h1>
                    </div>
                </header>

                {/* Tablero Kanban */}
                <section className="px-4 sm:px-8 pb-8 mt-4">
                    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md overflow-x-auto">
                        <KanbanBoard />
                    </div>
                </section>
            </main>
        </TaskProvider>
    );
}
