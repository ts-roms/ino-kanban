import { create } from "zustand"
import { createJSONStorage, devtools, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"


const initialState = {}

export const ticketStore = create()(
  persist((immer(devtools((_) => initialState, { name: 'TicketStore' }))), {
    name: 'TicketStore',
    storage: createJSONStorage(() => sessionStorage),
  })
)