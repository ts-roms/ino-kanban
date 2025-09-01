import { Column } from "../@types/column";

export const initialColumns: Column[] = [
  { id: 'todo', name: 'To Do', tickets: [] },
  { id: 'in-progress', name: 'In Progress', tickets: [] },
  { id: 'done', name: 'Done', tickets: [] },
]