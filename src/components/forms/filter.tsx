import { Ticket } from "@kanban/@types/ticket"
import { Button, Input } from "../ui"

type Props = {
  setTickets: (tickets: Ticket[]) => void;
  // tickets: Ticket[];
  setSearch: (search: string) => void;
  search: string;
  setSelectedTag: (tag: string) => void;
  selectedTag?: string;
  tags: string[]
  setLoading: (loading: boolean) => void
  loading: boolean
}

export const SearchForm = ({ setTickets, setSearch, search, setSelectedTag, selectedTag, tags, setLoading, loading }: Props) => {

  const loadTickets = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tickets");
      const data = await res.json();
      setTickets(data);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
      <Input type="text" placeholder="Search by name"
        value={search}
        onChange={(e: { target: { value: string; }; }) => setSearch(e.target.value)}
        className="px-3 py-2 border rounded-lg w-full md:w-60"
      />
      <select
        value={selectedTag}
        onChange={(e) => setSelectedTag(e.target.value)}
        className="px-3 py-2 border rounded-lg  w-full md:w-60"
      >
        {tags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      <Button
        onClick={loadTickets}
        disabled={loading}
      >
        {loading ? "Loading..." : "Load Tickets"}
      </Button>
    </div>
  )
}