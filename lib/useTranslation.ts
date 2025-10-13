"use client"

import { useLanguage } from "@/components/utilities/language-provider"
import { translations } from "./translations"

export function useTranslation() {
  const { language } = useLanguage()
  
  return translations[language as keyof typeof translations]
}

export type TranslationType = typeof translations.en