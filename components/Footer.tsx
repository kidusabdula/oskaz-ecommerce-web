import Link from "next/link"
import Image from "next/image"
import { Linkedin, Send, PhoneCall } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9">
                <Image src="/oskaz-logo.svg" alt="Oskaz Import Logo" fill className="object-contain" />
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">ኦSKAZ®</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Modern tech imports and tailored solutions for businesses.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Solutions</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li><Link href="#smart-boards" className="hover:text-gray-900 dark:hover:text-white">Smart Boards</Link></li>
              <li><Link href="#digital-displays" className="hover:text-gray-900 dark:hover:text-white">Digital Displays</Link></li>
              <li><Link href="#power-solutions" className="hover:text-gray-900 dark:hover:text-white">Power Solutions</Link></li>
              <li><Link href="#kiosk-systems" className="hover:text-gray-900 dark:hover:text-white">Kiosk Systems</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li><Link href="/about" className="hover:text-gray-900 dark:hover:text-white">About Us</Link></li>
              <li><Link href="#clients" className="hover:text-gray-900 dark:hover:text-white">Clients & Recognition</Link></li>
              <li><Link href="#testimonials" className="hover:text-gray-900 dark:hover:text-white">Testimonials</Link></li>
              <li><Link href="#quality" className="hover:text-gray-900 dark:hover:text-white">Quality Commitment</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li><Link href="mailto:info@oskaz.com" className="hover:text-gray-900 dark:hover:text-white" aria-label="Email info@oskaz.com">info@oskaz.com</Link></li>
              <li><Link href="tel:+251900000000" className="hover:text-gray-900 dark:hover:text-white" aria-label="Phone +251 900 000 000">+251 900 000 000</Link></li>
              <li><Link href="#inquiry" className="hover:text-gray-900 dark:hover:text-white">Inquiry</Link></li>
            </ul>
            <div className="mt-4 flex items-center gap-3">
              <Link
                href="https://www.linkedin.com/in/hussen-yesuf-9a261a216/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://t.me/abualiya"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
              >
                <Send className="h-5 w-5" />
              </Link>
              <Link
                href="tel:+251900000000"
                aria-label="Call Oskaz"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
              >
                <PhoneCall className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Oskaz Import. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <Link href="#privacy" className="hover:text-gray-900 dark:hover:text-white">Privacy</Link>
            <span className="opacity-40">•</span>
            <Link href="#terms" className="hover:text-gray-900 dark:hover:text-white">Terms</Link>
            <span className="opacity-40">•</span>
            <Link href="#contact" className="hover:text-gray-900 dark:hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}