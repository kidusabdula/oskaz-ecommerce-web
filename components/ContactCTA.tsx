"use client"

import Link from "next/link"
import { Mail, Send, PhoneCall, Linkedin } from "lucide-react"

export default function ContactCTA() {
  return (
    <section id="contact" className="mx-auto w-full max-w-6xl px-4 md:px-6">
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-black/40 backdrop-blur-sm p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Let’s build your solution.
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Simple, clear, and responsive. Reach us on email, Telegram, or phone.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="mailto:info@oskaz.com"
              aria-label="Email Oskaz"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <Mail className="h-4 w-4" />
              Email
            </Link>
            <Link
              href="https://t.me/abualiya"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <Send className="h-4 w-4" />
              Telegram
            </Link>
            <Link
              href="tel:+251900000000"
              aria-label="Call Oskaz"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <PhoneCall className="h-4 w-4" />
              Call
            </Link>
            <Link
              href="https://www.linkedin.com/in/hussen-yesuf-9a261a216/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}