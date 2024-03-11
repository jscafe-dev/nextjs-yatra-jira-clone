"use client";

import { usePathname, useRouter } from "next/navigation";
import cx from 'classnames'

interface SideNavItemInterface {
    id: string,
    title: string
}

const SideNavItem = (props: SideNavItemInterface) => {
    const { id, title } = props
    const path = usePathname()
    const router = useRouter()
    const boardId = path.split('/')[2]
    return (
        <div className={cx("p-4 hover:bg-blue-300 hover:dark:bg-blue-800 cursor-pointer font-semibold text-sm", {
            'bg-blue-800': boardId === id
        })} onClick={() => router.push(`/board/${id}`)}>{title}</div>
    )
}

export { SideNavItem }