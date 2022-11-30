import React from "react"
import Theme, { ITheme } from "../theme"

type ThemeHook = {
    children: React.ReactNode,
    theme?: ITheme
}

export const ThemeContext = React.createContext({theme: Theme})

export const ThemeProvider = ({children, theme = Theme}: ThemeHook) => {
    return <ThemeContext.Provider value={{theme}}>{children}</ThemeContext.Provider>
}

export default function useTheme(): ITheme {
    const {theme} = React.useContext(ThemeContext)
    return theme;
}