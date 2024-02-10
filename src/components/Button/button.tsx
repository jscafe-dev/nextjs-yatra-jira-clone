interface ButtonProps {
    onClick?: () => void
}
export const Button = (props: ButtonProps) => {
    const { onClick } = props
    return (
        <button onClick={onClick} data-testid="button-test">button</button>
    )
}