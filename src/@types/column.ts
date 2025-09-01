import { Ticket } from "./ticket";

export type Column = {
  id: string;
  name: string;
  tickets: Ticket[]
}