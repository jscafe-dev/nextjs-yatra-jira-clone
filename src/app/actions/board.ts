"use server";
import { prisma } from "@/lib/prisma";
import type { Board, BoardTicket } from "@prisma/client";

export async function getAllBoard() {
  return (await prisma.board.findMany({
    select: {
      id: true,
      title: true,
    },
  })) as Board[];
}

export async function fetchBoard(boardId: string, skip = 0, take = 10) {
  if (!boardId) {
    throw Error("Fields are missing");
  }
  const board = prisma.board.findUniqueOrThrow({
    where: {
      id: boardId,
    },
  });

  const boardColumn = prisma.boardColumn.findMany({
    where: {
      boardId,
    },
  });

  const boardTickets = prisma.boardTicket.findMany({
    where: {
      boardId,
    },
    include: {
      assignedUser: {
        select: {
          name: true,
        },
      },
    },
    skip: Number(skip),
    take: Number(take),
  });

  const data = await Promise.all([board, boardColumn, boardTickets]);

  return {
    data: {
      board: data[0],
      boardColumn: data[1],
      boardTickets: data[2],
    },
  };
}

export const updateTicketAtBackend = async (ticketsToUpdate: BoardTicket[]) => {
  const transactions = ticketsToUpdate.map((ticket) => {
    return prisma.boardTicket.update({
      where: {
        id: ticket.id,
      },
      data: {
        boardColumnId: ticket.boardColumnId,
        position: ticket.position,
      },
    });
  });
  const updatedTickets = await prisma.$transaction(transactions);
};
