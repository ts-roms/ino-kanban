import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd"
import { Column } from "@kanban/@types/column"
import { Ticket } from "@kanban/@types/ticket"
import { initialColumns } from "@kanban/constant/columns"
import { useEffect, useState } from "react"
import { SearchForm } from "@kanban/components/forms"
import { TicketCard } from "./ticket"
import { nextPriority } from "@kanban/utils/priority"


export const KanbanBoard = () => {

  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/tickets.json")
        if (!res.ok) throw new Error("Failed to fetch tickets")
        const data: Ticket[] = await res.json()

        // Example: put all tickets into "To Do" initially
        setColumns((prev) =>
          prev.map((col) =>
            col.id === "todo" ? { ...col, tickets: data } : col
          )
        )

      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])



  // Handle drag and drop
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const { source, destination } = result
    setColumns((prev) => {
      const updated = [...prev]
      const sourceCol = updated.find((c) => c.id === source.droppableId)!
      const destCol = updated.find((c) => c.id === destination.droppableId)!

      const [movedTicket] = sourceCol.tickets.splice(source.index, 1)
      destCol.tickets.splice(destination.index, 0, movedTicket)

      localStorage.setItem("kanban", JSON.stringify(updated))
      return updated
    })

  }


  const handleTogglePriority = (id: string) => {
    setColumns((prev) => {
      const updated = { ...prev };

      for (const colId in updated) {
        updated[colId].tickets = updated[colId].tickets.map((t) =>
          t.id === id
            ? {
              ...t,
              priority: nextPriority(t.priority)
            }
            : t
        );
      }

      localStorage.setItem("kanban-columns", JSON.stringify(updated));
      return updated;
    });
  };


  if (loading) {
    return <p className="p-4 text-gray-500">Loading Tickets</p>
  }

  if (error) {
    return <p className="p-4 text-red-500">Error: {error}</p>
  }

  // Flatten all tickets across all columns
  const allTickets = Object.values(columns).flatMap((col) => col.tickets || []);
  // Extract all unique tags
  const allTags = Array.from(
    new Set(allTickets.flatMap((t) => t?.tags ?? [])) // TODO: handle undefined
  );

  // Filter tickets based on search + selected tag
  const filteredTickets = allTickets.filter((ticket) => {
    const matchesSearch = ticket.name.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag ? ticket.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });


  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-gray-500">Kanban Board</h1>
      {/* Search Form Filter */}
      <SearchForm
        setTickets={setTickets}
        loading={loading}
        setLoading={setLoading}
        setSearch={setSearch}
        search={search}
        setSelectedTag={setSelectedTag}
        selectedTag={selectedTag}
        tags={allTags}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((col: Column) => (
            <Droppable droppableId={col.id} key={col.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white rounded-xl shadow p-4 flex flex-col min-h-[300px]"
                >
                  <h2 className="text-lg font-semibold mb-4">{col.name}</h2>
                  <div className="flex-1 space-y-3">
                    {col.tickets.length === 0 ? (<p className="text-sm text-gray-400">No tickets here</p>) :
                      (filteredTickets.filter((t: Ticket) => t.columnId === col.id)
                        .map((ticket: Ticket, index) => (
                          <Draggable
                            key={ticket.id}
                            draggableId={ticket.id}
                            index={index}
                          >
                            {(provided) => (
                              <TicketCard
                                ticket={ticket}
                                ref={provided.innerRef}
                                draggableProps={provided.draggableProps}
                                dragHandleProps={provided.dragHandleProps}
                                onTogglePriority={handleTogglePriority}
                              />
                            )}
                          </Draggable>
                        )))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

    </>
  )
}