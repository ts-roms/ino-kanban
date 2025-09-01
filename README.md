# Kanban Board

A simple Kanban board built with **Next.js**, **React**, and **TypeScript** inside an **Nx monorepo**.  
It demonstrates core features such as columns, tickets with tags, priority levels, and local persistence.

---

## Demo (Vercel App)

```bash
 https://ino-kanban-1as8qmti2-roms-dev.vercel.app/
```

## 🚀 How to Run the Project

### Prerequisites

- Node.js 18+
- npm or yarn
- Nx CLI installed globally (optional):

```bash

git clone https://github.com/ts-roms/ino-kanban.git
cd kanban-board

# Install dependencies
npm install

# Run the application
npm run dev

# Run the test
npm run test

Open [http://localhost:3000] with your browser to see the result

```

## Technical Decisions

- State Management: Zustand for lightweight global state and localStorage persistence
- Styling: Tailwind CSS fo simplicity and responsiveness
- Testing: Jest for unit tests (fast, integrated with next.js)

## Future Improvements

- Adding assignee
- Editing Details
- Additional Error handling for dragging ticket
- Utilize zustand store for state management
- CRUD Ticket functionality
