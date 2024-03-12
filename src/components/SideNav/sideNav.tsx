import { getAllBoard } from "@/app/actions/board"
import { SideNavItem } from "./sideNavItem"
import { Separator } from "./sideNavSeparator"
import { auth } from "@/lib/auth"
import cx from 'classnames'

interface SideNavProps {
    isMobileView?: boolean;
}
const SideNav = async (props: SideNavProps) => {
    const { isMobileView = false } = props
    const session = await auth()
    if (!session) return <></>
    const boardsData = await getAllBoard()
    return (
        <div className={cx("w-full sm:w-[250px] sidebar-bg", {
            ['hidden sm:block fixed mt-[60px] h-[calc(100vh-60px)]']: !isMobileView
        })}>
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