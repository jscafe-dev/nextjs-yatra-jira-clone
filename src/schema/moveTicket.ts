import { z } from "zod";

export const schema = z.object({
  boardId: z.string(),
  position: z.number(),
  boardColumnId: z.string(),
  ticketId: z.string(),
});
