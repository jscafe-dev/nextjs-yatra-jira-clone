"use client"
import { useState } from "react";
import type { ReactNode } from 'react'
import {
    Drawer,
} from "@material-tailwind/react";
import { Component1Icon } from '@radix-ui/react-icons'
import { useWindowDimensions } from "@/hooks/useWindowDimensions";

interface SideNavMobileProps {
    children: ReactNode
}

const SideNavMobile = (props: SideNavMobileProps) => {
    const { children } = props
    const [open, setOpen] = useState(false);
    const { isDesktop } = useWindowDimensions()
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
    if (isDesktop) return <></>
    return (
        <>
            <Component1Icon height={30} width={30} className="tex-white absolute z-[2] left-3 top-3" onClick={openDrawer} />
            <Drawer open={open} onClose={closeDrawer} className="sidebar-bg" placement="bottom" placeholder={undefined}>
                {children}
            </Drawer>
        </>
    )
}

export { SideNavMobile }