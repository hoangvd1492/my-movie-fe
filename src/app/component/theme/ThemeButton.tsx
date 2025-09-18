import dynamic from 'next/dynamic'


import { useTheme } from '../theme/ThemeProvider';
import { Moon, Sun } from 'lucide-react';


function ThemeButton() {
    const { theme, setTheme } = useTheme()

    const handleSetTheme = () => theme === 'dark' ? setTheme('light') : setTheme('dark')

    return (
        <div className='cursor-pointer'
            onClick={handleSetTheme}>
            {theme === 'dark' ? <Moon /> : <Sun />}
        </div>
    )
}

export const ThemeBtn = dynamic(() => Promise.resolve(ThemeButton), { ssr: false })