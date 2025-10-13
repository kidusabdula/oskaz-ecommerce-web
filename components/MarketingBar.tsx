"use client"

import Link from "next/link"
import { Sparkles, ArrowRight } from "lucide-react"

export default function MarketingBar() {
  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="mt-6 mb-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-black/40 backdrop-blur-sm shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <p className="text-sm md:text-base text-gray-900 dark:text-white">
                Liked the site? Tailored software, built for you.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white hover:from-blue-700 hover:to-indigo-700 transition-colors"
                aria-label="Explore tailored software solutions"
              >
                Explore Solutions
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}