"use client"
import type { BoardColumn, BoardTicket, User } from "@prisma/client"
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import type { OnDragEndResponder } from '@hello-pangea/dnd'
import { Ticket } from "./index"
import { useState } from "react";
import cx from 'classnames'
import { updateTicketAtBackend } from "@/app/actions/board";
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
    const [tickets, setTickets] = useState(boardTickets)
    const fetTicketForColumn = (columnId: string) => {
        return tickets.filter((ticket) => ticket.boardColumnId === columnId).sort((a, b) => a.position - b.position)
    }

    const handleDragEnd: OnDragEndResponder = (result) => {
        const currentTickets = JSON.parse(JSON.stringify(tickets))
        const updatedTickets = currentTickets.map((ticket: BoardTicketWithUser) => {
            if (ticket.id === result.draggableId) {
                return { ...ticket, boardColumnId: result.destination?.droppableId, position: result.destination?.index }
            } else if (ticket.boardColumnId === result.destination?.droppableId && ticket.position >= result.destination?.index) {
                return { ...ticket, position: ticket.position + 1 }
            } else if (ticket.boardColumnId === result.source.droppableId && ticket.position > result.source.index) {
                return { ...ticket, position: ticket.position - 1 }
            }
            return ticket
        })
        setTickets(updatedTickets)
        updateTicketAtBackend(updatedTickets)
    }
    return (
        <DragDropContext
            onDragEnd={handleDragEnd}
        >
            <div className="flex flex-col sm:flex-row gap-3">
                {boardColumns.map((column) => (
                    <Droppable key={column.id} droppableId={column.id}>
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} className={cx("grow basis-full background-neutral-static p-2", { ['background-board-drop']: snapshot.isDraggingOver })} {...provided.droppableProps}>
                                <div className="text-subtlest font-semibold text-sm mb-5">{column.label}</div>
                                <div>{fetTicketForColumn(column.id).map((ticket, index) => <Ticket key={ticket.id} id={ticket.id} index={index} title={ticket.title} assignee={ticket.assignedUser.name} storyPoints={ticket.storyPoints} />)}</div>
                            </div>
                        )}
                    </Droppable>
                )
                )}
            </div>
        </DragDropContext >
    )
}

export { Board }