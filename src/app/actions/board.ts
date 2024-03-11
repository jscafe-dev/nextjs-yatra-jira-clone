"use server";
import { prisma } from "@/lib/prisma";
import type { Board } from "@prisma/client";

export async function getAllBoard() {
  return (await prisma.board.findMany({
    select: {
      id: true,
      title: true,
    },
  })) as Board[];
}
