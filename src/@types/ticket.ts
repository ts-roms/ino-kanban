

export type Ticket = {
  id: string;
  columnId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  priority?: 'low' | 'medium' | 'high';
}