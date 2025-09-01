import { nextPriority } from "@kanban/utils/priority";

type Ticket = {
  id: string;
  name: string;
  priority?: "high" | "medium" | "low";
};

const togglePriority = (tickets: Ticket[], id: string): Ticket[] => {
  return tickets.map((t) =>
    t.id === id ? { ...t, priority: nextPriority(t.priority) } : t
  );
};

describe("togglePriority", () => {
  it("updates correct ticket priority", () => {
    const tickets: Ticket[] = [
      { id: "1", name: "Test 1", priority: "high" },
      { id: "2", name: "Test 2", priority: "low" },
    ];

    const updated = togglePriority(tickets, "1");

    expect(updated.find((t) => t.id === "1")?.priority).toBe("medium");
    expect(updated.find((t) => t.id === "2")?.priority).toBe("low"); // unchanged
  });

  it("sets default high if no priority", () => {
    const tickets: Ticket[] = [{ id: "1", name: "Test 1" }];
    const updated = togglePriority(tickets, "1");

    expect(updated[0].priority).toBe("high");
  });
});