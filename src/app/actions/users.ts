"use server";
import { prisma } from "@/lib/prisma";

export const getUsers = async () => {
  return await prisma.user.findMany();
};
