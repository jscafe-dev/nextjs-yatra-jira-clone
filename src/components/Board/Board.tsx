import type { BoardColumn, BoardTicket, User } from "@prisma/client"
import { Ticket } from "./index"

interface BoardTicketWithUser extends BoardTicket {
    assignedUser: {
        name: string;
    };
}


interface BoardProps {
    boardColumns: BoardColumn[],
    boardTickets: BoardTicketWithUser[]
}

const Board = (props: BoardProps) => {
    const { boardColumns, boardTickets } = props
    const fetTicketForColumn = (columnId: string) => {
        return boardTickets.filter((ticket) => ticket.boardColumnId === columnId)
    }
    return (
        <div className="flex flex-col sm:flex-row gap-3">
            {boardColumns.map((column) => <div key={column.id} className="grow basis-full background-neutral-static p-2">
                <div className="text-subtlest font-semibold text-sm mb-5">{column.label}</div>
                <div>{fetTicketForColumn(column.id).map((ticket) => <Ticket key={ticket.id} title={ticket.title} assignee={ticket.assignedUser.name} storyPoints={ticket.storyPoints} />)}</div>
            </div>)}
        </div>
    )
}

export { Board }