"use client"

import { ReactNode } from "react"

interface ButtonProps {
    onClick?: () => void,
    children: ReactNode
}
export const Button = (props: ButtonProps) => {
    const { onClick, children } = props

    return (
        <button onClick={onClick} data-testid="button-test">{children}</button>
    )
}