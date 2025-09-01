import { forwardRef } from "react"
import { getTicketAge } from "@kanban/utils/date-util"
import { Tags } from "./tags"
import { Ticket } from "@kanban/@types/ticket"
import { Button } from "@kanban/components/ui"

type Props = {
  ticket: Ticket
  draggableProps?: React.HTMLAttributes<HTMLDivElement>
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement> | null
  onTogglePriority: (id: string) => void;
}

export const TicketCard = forwardRef<HTMLDivElement, Props>(
  ({ ticket, onTogglePriority, draggableProps, dragHandleProps }, ref) => {

    const lowPriorityColor = ticket.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
    const priorityColor = ticket.priority === "high" ? "bg-red-500" : lowPriorityColor;

    return (
      <div
        ref={ref}
        {...draggableProps}
        {...dragHandleProps}
        className={`p-3 rounded-md border shadow-sm bg-white  items-start ${ticket.priority === "high" ? "border-red-500" : "border-gray-200"
          }`}
      >
        <h3 className="font-medium">{ticket.name}</h3>
        <p className="text-sm text-gray-600">{ticket.description}</p>

        <div className="mt-2 flex flex-wrap gap-2">
          {ticket.tags.map((tag) => (
            <Tags tag={tag} key={tag} />
          ))}
        </div>

        <p className="mt-2 text-xs text-gray-400">
          Created: {getTicketAge(ticket.createdAt)}
        </p>
        <p className="text-xs text-gray-400">
          Updated: {getTicketAge(ticket.updatedAt)}
        </p>
        <Button
          className={`ml-2 px-2 py-1 text-xs rounded ${priorityColor} text-white`}
          onClick={() => onTogglePriority(ticket.id)}
        >
          {ticket.priority}
        </Button>
      </div>
    )
  }
)

TicketCard.displayName = "TicketCard"
