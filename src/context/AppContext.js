"use client"

import { createContext, useContext, useState } from "react"

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {

  const [render, setrender] = useState(true)
  const [limit, setlimit] = useState(false)
  const [theme, setTheme] = useState("light");

  return (
    <AppContext.Provider value={{ render, setrender, theme, setTheme, limit, setlimit }}>
      {children}
    </AppContext.Provider>
  )
}

// Custom hook (BEST PRACTICE)
export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider")
  }
  return context
}