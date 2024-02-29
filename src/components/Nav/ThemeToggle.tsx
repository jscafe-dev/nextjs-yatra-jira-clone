import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()
    return (
        <div className="text-white cursor-pointer sm:mr-3">
            {theme === 'dark' ?
                <MoonIcon height={25} width={25} onClick={() => setTheme('light')} /> :
                <SunIcon height={25} width={25} onClick={() => setTheme('dark')} />
            }
        </div>
    )
}

export default ThemeToggle