const { PrismaClient, TicketStatus, BoardType } = require("@prisma/client");
const prisma = new PrismaClient();
async function users() {
  await prisma.user.deleteMany();
  await prisma.boardColumn.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.boardTicket.deleteMany();
  await prisma.board.deleteMany();

  const user1 = await prisma.user.upsert({
    where: { email: "abc1@gmail.com" },
    update: {},
    create: {
      email: "abc1@gmail.com",
      name: "John Cena",
    },
  });
  const user2 = await prisma.user.upsert({
    where: { email: "abc2@gmail.com" },
    update: {},
    create: {
      email: "abc2@gmail.com",
      name: "Kane",
    },
  });
  const user3 = await prisma.user.upsert({
    where: { email: "abc3@gmail.com" },
    update: {},
    create: {
      email: "abc3@gmail.com",
      name: "Rey Mysterio",
    },
  });
  const user4 = await prisma.user.upsert({
    where: { email: "abc4@gmail.com" },
    update: {},
    create: {
      email: "abc4@gmail.com",
      name: "Undertaker",
    },
  });
  const user5 = await prisma.user.upsert({
    where: { email: "abc5@gmail.com" },
    update: {},
    create: {
      email: "abc5@gmail.com",
      name: "Roman Reigns",
    },
  });
  const user6 = await prisma.user.upsert({
    where: { email: "abc6@gmail.com" },
    update: {},
    create: {
      email: "abc6@gmail.com",
      name: "Brock Lesnar",
    },
  });
  const user7 = await prisma.user.upsert({
    where: { email: "abc7@gmail.com" },
    update: {},
    create: {
      email: "abc7@gmail.com",
      name: "Seth Rollins",
    },
  });

  const board1 = await prisma.board.upsert({
    where: { id: "" },
    update: {},
    create: {
      title: "Sprint Board January",
      type: BoardType.SPRINT,
      description: "January Sprint items",
      startDate: new Date().toISOString(),
      endDate: new Date(
        new Date().getTime() + 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
    },
  });

  const board_1_column_1 = await prisma.boardColumn.create({
    data: {
      position: 0,
      label: TicketStatus.TODO,
      boardId: board1.id,
    },
  });
  const board_1_column_2 = await prisma.boardColumn.create({
    data: {
      position: 1,
      label: TicketStatus.IN_PROGRESS,
      boardId: board1.id,
    },
  });
  const board_1_column_3 = await prisma.boardColumn.create({
    data: {
      position: 2,
      label: TicketStatus.IN_REVIEW,
      boardId: board1.id,
    },
  });
  const board_1_column_4 = await prisma.boardColumn.create({
    data: {
      position: 3,
      label: TicketStatus.DONE,
      boardId: board1.id,
    },
  });

  await prisma.boardTicket.createMany({
    data: [
      {
        title: "Fix home page",
        description: "Some description",
        assignedTo: user1.id,
        reportedBy: user2.id,
        boardId: board1.id,
        boardColumnId: board_1_column_1.id,
        status: TicketStatus.TODO,
        position: 0,
        storyPoints: 5,
      },
      {
        title: "Add Unit Test",
        description: "Some description",
        assignedTo: user2.id,
        reportedBy: user3.id,
        boardId: board1.id,
        boardColumnId: board_1_column_1.id,
        status: TicketStatus.TODO,
        position: 1,
        storyPoints: 3,
      },
    ],
  });
  await prisma.boardTicket.createMany({
    data: [
      {
        title: "Perform Load Testing For Midnight Sale",
        description: "Some description",
        assignedTo: user4.id,
        reportedBy: user5.id,
        boardId: board1.id,
        boardColumnId: board_1_column_2.id,
        status: TicketStatus.IN_PROGRESS,
        position: 0,
        storyPoints: 5,
      },
      {
        title: "Fix login issues",
        description: "Some description",
        assignedTo: user6.id,
        reportedBy: user7.id,
        boardId: board1.id,
        boardColumnId: board_1_column_2.id,
        status: TicketStatus.IN_PROGRESS,
        position: 1,
        storyPoints: 5,
      },
    ],
  });
  await prisma.boardTicket.createMany({
    data: [
      {
        title: "QA sign off on new feature",
        description: "Some description",
        assignedTo: user1.id,
        reportedBy: user4.id,
        boardId: board1.id,
        boardColumnId: board_1_column_3.id,
        status: TicketStatus.IN_REVIEW,
        position: 0,
        storyPoints: 5,
      },
      {
        title: "End to end testing",
        description: "Some description",
        assignedTo: user2.id,
        reportedBy: user5.id,
        boardId: board1.id,
        boardColumnId: board_1_column_3.id,
        status: TicketStatus.IN_REVIEW,
        position: 1,
        storyPoints: 5,
      },
    ],
  });

  const board2 = await prisma.board.upsert({
    where: { id: "" },
    update: {},
    create: {
      title: "Sprint Board New Project",
      type: BoardType.KANBAN,
      description: "New Project Sprint items",
      startDate: new Date(
        new Date().getTime() + 10 * 24 * 60 * 60 * 1000
      ).toISOString(),
      endDate: new Date(
        new Date().getTime() + 17 * 24 * 60 * 60 * 1000
      ).toISOString(),
    },
  });

  const board_2_column_1 = await prisma.boardColumn.create({
    data: {
      position: 0,
      label: TicketStatus.TODO,
      boardId: board2.id,
    },
  });
  const board_2_column_2 = await prisma.boardColumn.create({
    data: {
      position: 1,
      label: TicketStatus.IN_PROGRESS,
      boardId: board2.id,
    },
  });
  const board_2_column_3 = await prisma.boardColumn.create({
    data: {
      position: 2,
      label: TicketStatus.IN_REVIEW,
      boardId: board2.id,
    },
  });
  const board_2_column_4 = await prisma.boardColumn.create({
    data: {
      position: 3,
      label: TicketStatus.DONE,
      boardId: board2.id,
    },
  });

  await prisma.boardTicket.createMany({
    data: [
      {
        title: "Automation Test failure",
        description: "Some description",
        assignedTo: user1.id,
        reportedBy: user2.id,
        boardId: board2.id,
        boardColumnId: board_2_column_1.id,
        status: TicketStatus.TODO,
        position: 0,
        storyPoints: 5,
      },
      {
        title: "POC on new feature",
        description: "Some description",
        assignedTo: user2.id,
        reportedBy: user3.id,
        boardId: board2.id,
        boardColumnId: board_2_column_1.id,
        status: TicketStatus.TODO,
        position: 1,
        storyPoints: 3,
      },
    ],
  });

  await prisma.boardTicket.createMany({
    data: [
      {
        title: "Performance testing on android",
        description: "Some description",
        assignedTo: user4.id,
        reportedBy: user5.id,
        boardId: board2.id,
        boardColumnId: board_2_column_2.id,
        status: TicketStatus.IN_PROGRESS,
        position: 0,
        storyPoints: 5,
      },
      {
        title: "Write unit test case",
        description: "Some description",
        assignedTo: user6.id,
        reportedBy: user7.id,
        boardId: board2.id,
        boardColumnId: board_2_column_2.id,
        status: TicketStatus.IN_PROGRESS,
        position: 1,
        storyPoints: 5,
      },
    ],
  });

  await prisma.boardTicket.createMany({
    data: [
      {
        title: "QA sign off on new feature",
        description: "Some description",
        assignedTo: user1.id,
        reportedBy: user4.id,
        boardId: board2.id,
        boardColumnId: board_2_column_3.id,
        status: TicketStatus.IN_REVIEW,
        position: 0,
        storyPoints: 5,
      },
      {
        title: "End to end testing",
        description: "Some description",
        assignedTo: user2.id,
        reportedBy: user5.id,
        boardId: board2.id,
        boardColumnId: board_2_column_3.id,
        status: TicketStatus.IN_REVIEW,
        position: 1,
        storyPoints: 5,
      },
    ],
  });
}

(async function generate() {
  try {
    await users();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
})();
