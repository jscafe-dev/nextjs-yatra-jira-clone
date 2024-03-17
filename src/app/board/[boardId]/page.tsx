import { fetchBoard } from "@/app/actions/board"
import { Board } from "@/components/Board"

interface BoardPageProps {
    params: {
        boardId: string
    }
}

const BoardPage = async ({ params }: BoardPageProps) => {
    const { data } = await fetchBoard(params.boardId)
    console.log(data)
    return (
        <div className="pt-16 px-0 sm:px-3 sm:ml-[250px]">
            <Board boardColumns={data.boardColumn} boardTickets={data.boardTickets} />
        </div>
    )
}

export default BoardPage