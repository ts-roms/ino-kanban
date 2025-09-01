'use client';

import { KanbanBoard } from "./features/boards";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <KanbanBoard />
    </main>
  );
}
