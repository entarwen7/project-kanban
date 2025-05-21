import Image from "next/image";
import KanbanBoard from "./components/kanbanBoard";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-cimiento-50 to-cimiento-100">
      <h1 className="text-4xl font-bold text-cimiento-900">Bienvenido a la App de Tareas</h1>
      <p className="mt-4 text-lg text-cimiento-700">Gestiona tus tareas de manera eficiente.</p>
      <Image
        src="/images/hero.png"
        alt="Hero Image"
        width={500}
        height={300}
        className="mt-8 rounded-lg shadow-lg"
      />
      <div className="mt-8 w-full max-w-4xl">
        <KanbanBoard />
        </div>
    </div>
  );
}
