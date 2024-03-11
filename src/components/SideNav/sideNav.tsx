import { getAllBoard } from "@/app/actions/board"
import { SideNavItem } from "./sideNavItem"
import { Separator } from "./sideNavSeparator"
import { auth } from "@/lib/auth"

const SideNav = async () => {
    const session = await auth()
    if (!session) return <></>
    const boardsData = await getAllBoard()
    return (
        <div className="fixed w-full sm:w-[250px] sidebar-bg h-[calc(100vh-60px)] mt-[60px]">
            {boardsData.map((board) =>
                <>
                    <SideNavItem key={board.id} title={board.title} id={board.id} />
                    <Separator />
                </>
            )}
        </div>
    )
}

export { SideNav }