import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const boardId = searchParams.get("boardId");
    const skip = searchParams.get("skip");
    const take = searchParams.get("take");
    if (!boardId || !skip || !take) {
      return Response.json(
        { error: { message: "Fields are missing" } },
        { status: 400 }
      );
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
      skip: Number(skip),
      take: Number(take),
    });

    const data = await Promise.all([board, boardColumn, boardTickets]);

    return Response.json(
      {
        data: {
          board: data[0],
          boardColumn: data[1],
          boardTickets: data[2],
        },
      },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return Response.json(
      { error: { message: "Something went wrong!" } },
      { status: 500 }
    );
  }
}
