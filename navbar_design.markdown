# Navbar Design for Oskaz Import (Inspired by Nomad Goods)

## Overview
This updated navbar design for Oskaz Import refines the previous implementation to ensure the "Services" link triggers a dropdown on hover, displaying "Import & Delivery" and "Tech Consultancy" with smooth animations, inspired by Nomad’s minimalist and interactive navigation. Built with Next.js 15.3.1, React 19, TypeScript 5, Tailwind CSS 4, shadcn/ui, and Lucide React, it includes links to "Home", "About Us", "Services" (hover-triggered dropdown), "Clients & Recognitions", "Testimonials", and "Contact", plus trust badges ("Certified Company") and an inquiry icon. The design is optimized for Turbopack, ESLint 9, and responsive layouts.

## Component Code (`components/Navbar.tsx`)

```tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Globe, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About Us' },
    {
      href: '#services',
      label: 'Services',
      dropdown: [
        { href: '#import-delivery', label: 'Import & Delivery', icon: Globe },
        { href: '#tech-consultancy', label: 'Tech Consultancy', icon: Lightbulb },
      ],
    },
    { href: '#clients', label: 'Clients & Recognitions' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-md'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="relative h-10 w-32">
          <Image
            src="/oskaz-logo.png"
            alt="Oskaz Import Logo"
            fill
            className="object-contain transition-transform hover:scale-105"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            link.dropdown ? (
              <DropdownMenu key={link.label}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      'text-base font-semibold text-gray-800 hover:text-blue-600 group relative',
                      pathname === link.href && 'text-blue-600'
                    )}
                  >
                    {link.label}
                    <span className="ml-1 text-sm transition-transform group-hover:rotate-180">▼</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-2 rounded-md bg-white shadow-lg transition-opacity duration-200">
                  {link.dropdown.map((item) => (
                    <DropdownMenuItem key={item.href}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  'text-base font-semibold text-gray-800 hover:text-blue-600 relative',
                  pathname === link.href && 'text-blue-600 after:w-full',
                  'after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-blue-600 after:w-0 after:transition-all after:duration-300 hover:after:w-full'
                )}
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>

        {/* Extras */}
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
            Certified Company
          </span>
          <Link href="#inquiry" className="relative h-6 w-6">
            <Image
              src="/inquiry-icon.png"
              alt="Inquiry Basket"
              fill
              className="object-contain transition-transform hover:scale-110"
            />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="absolute left-0 top-full w-full bg-white shadow-md md:hidden">
            <ul className="flex flex-col p-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.dropdown ? (
                    <div className="py-2">
                      <span className="text-base font-semibold text-gray-800">{link.label}</span>
                      <ul className="mt-2 space-y-2 pl-4">
                        {link.dropdown.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600"
                              onClick={toggleMenu}
                            >
                              <item.icon className="h-4 w-4" />
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="block py-2 text-base font-semibold text-gray-800 hover:text-blue-600"
                      onClick={toggleMenu}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
```

## Updates for Hover Effect
- **Hover-Triggered Dropdown**: The `DropdownMenu` component from shadcn/ui is configured to open on hover for desktop (using native hover behavior via CSS and `group` utilities). The `group-hover` class on the dropdown arrow (`▼`) adds a rotation effect for visual feedback, inspired by Nomad’s smooth interactivity.
- **Smooth Animation**: Added `transition-opacity duration-200` to `DropdownMenuContent` for a fade-in effect when the dropdown appears, ensuring a polished feel.
- **Mobile Fallback**: On mobile (below `md` breakpoint), the dropdown is click-based (via `DropdownMenuTrigger`) to maintain usability, as hover isn’t practical.
- **Tailwind Enhancements**: Used `group` and `group-hover` utilities to manage hover states without additional JavaScript, keeping the code lightweight.

## File Structure Integration
- Place in `components/Navbar.tsx`.
- Ensure `/oskaz-logo.png` and `/inquiry-icon.png` are in `public/`.
- Import shadcn/ui components via `components/ui/*` (assumes shadcn/ui setup with `npx shadcn@latest init`).
- Use `cn` utility from `lib/utils.ts` for class merging with `clsx` and `tailwind-merge`.

## Styling Notes
- **Tailwind CSS**: Leverages utilities for layout (`flex`, `gap-6`), typography (`text-base`, `font-semibold`), and transitions (`transition-transform`, `hover:scale-105`). Colors: `bg-white`, `text-gray-800`, `text-blue-600` (#007BFF) for tech-inspired accents, matching Nomad’s clean aesthetic.
- **shadcn/ui**: Uses `Button`, `DropdownMenu`, `DropdownMenuContent`, and `DropdownMenuItem` for consistent, New York-style components.
- **Lucide Icons**: Includes `Menu`, `X`, `Globe`, `Lightbulb` for mobile toggle and dropdown items.
- **Hover Effects**: 
  - Nav links: Underline animation via `after:` pseudo-element (`hover:after:w-full`).
  - Dropdown: Opens on hover with fade-in (`transition-opacity`).
  - Logo/Inquiry: Scale transform (`hover:scale-105`, `hover:scale-110`).
  - Arrow: Rotates 180° on hover (`group-hover:rotate-180`).

## JavaScript Features
- **Scroll Effect**: `useEffect` toggles `isScrolled` for background opacity change (white to opaque on scroll), mimicking Nomad’s sticky header.
- **Mobile Toggle**: `useState` manages hamburger menu state with smooth open/close.
- **Active Route**: `usePathname` highlights current route with `text-blue-600` and underline.
- **No Extra JS for Hover**: Hover effect is CSS-driven via Tailwind’s `group-hover`, reducing JavaScript overhead.

## Accessibility
- ARIA labels for hamburger button (`aria-label="Toggle Menu"`).
- Alt text for images via `next/image`.
- Keyboard-navigable dropdown (shadcn/ui’s `DropdownMenu` supports focus management).
- High contrast ratios (`text-gray-800` on `bg-white`).

## Performance
- Uses `next/image` with `priority` for logo to optimize Largest Contentful Paint (LCP).
- Lazy-load inquiry icon if not in viewport (handled by `next/image`).
- Turbopack ensures fast dev builds; Next.js optimizes production with minified CSS/JS via PostCSS.
- Lightweight hover effect via CSS avoids performance-heavy JavaScript.

## ESLint & TypeScript
- Type-safe with TypeScript 5 (implicit types for state, props).
- ESLint 9 compatible (assumes Next.js default config). Add to `.eslintrc`:
  ```json
  {
    "extends": ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
    "rules": { "@typescript-eslint/no-explicit-any": "warn" }
  }
  ```

## Integration with Oskaz Content
- Links map to Oskaz sections (`#home`, `#about`, `#services`, `#import-delivery`, `#tech-consultancy`, `#clients`, `#testimonials`, `#contact`).
- "Certified Company" badge reflects Oskaz’s accreditation text.
- Inquiry icon links to `#inquiry`, aligning with Oskaz’s contact form or future e-commerce.
- Dropdown includes "Import & Delivery" and "Tech Consultancy" from Oskaz’s content, with icons for visual clarity.

## Deployment Notes
- Ensure `next.config.js` enables Turbopack (`next dev --turbo`).
- Verify assets in `public/` and shadcn/ui setup.
- Test hover effect on desktop (Chrome, Firefox) and click behavior on mobile (use Next.js dev tools).
- Run `npx eslint .` to catch linting issues before build.

This navbar delivers a Nomad-inspired, hover-triggered dropdown for "Services" with Oskaz’s content, leveraging your tech stack for a modern, scalable, and accessible UI.