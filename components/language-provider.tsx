"use client"

import * as React from "react"

type Language = "en" | "am"

type LanguageProviderProps = {
  children: React.ReactNode
  defaultLanguage?: Language
  storageKey?: string
}

type LanguageProviderState = {
  language: Language
  setLanguage: (language: Language) => void
}

const initialState: LanguageProviderState = {
  language: "en",
  setLanguage: () => null,
}

const LanguageProviderContext = React.createContext<LanguageProviderState>(initialState)

export function LanguageProvider({
  children,
  defaultLanguage = "en",
  storageKey = "oskaz-language",
  ...props
}: LanguageProviderProps) {
  const [language, setLanguageState] = React.useState<Language>(defaultLanguage)

  React.useEffect(() => {
    const savedLanguage = localStorage?.getItem(storageKey) as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'am')) {
      setLanguageState(savedLanguage)
    }
  }, [storageKey])

  React.useEffect(() => {
    const root = document.documentElement
    root.classList.remove("lang-en", "lang-am")
    root.classList.add(`lang-${language}`)
  }, [language])

  const setLanguage = React.useCallback((newLanguage: Language) => {
    localStorage?.setItem(storageKey, newLanguage)
    setLanguageState(newLanguage)
  }, [storageKey])

  const value = {
    language,
    setLanguage,
  }

  return (
    <LanguageProviderContext.Provider {...props} value={value}>
      {children}
    </LanguageProviderContext.Provider>
  )
}

export const useLanguage = () => {
  const context = React.useContext(LanguageProviderContext)

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider")

  return context
}