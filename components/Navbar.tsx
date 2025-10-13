"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  Search as SearchIcon,
  ShoppingBag,
  ChevronDown,
  X,
  Package,
} from "lucide-react";
import { ThemeDropdown } from "./utilities/theme-dropdown";
import { LanguageDropdown } from "./utilities/language-dropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import ProductsDropdown from "./Products-Dropdown";
import CartDropdown from "./cart/Cart-Dropdown";
import { useCart } from "@/context/CartContext";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const { state, setIsOpen } = useCart();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/items/categories");
        const data = await response.json();
        if (data.success && data.data.categories) {
          setCategories(
            data.data.categories.map((cat: { name: string }) => cat.name)
          );
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      setScrollProgress((scrollPosition / totalHeight) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
        <nav
         suppressHydrationWarning
          className={`h-16 w-full max-w-8xl mx-auto flex items-center justify-between px-6 shadow-sm backdrop-blur-md transition-all duration-500 rounded-2xl ${
            isDarkMode ? "dark:bg-card" : "bg-card"
          }`}
        >
          {/* Scroll Progress Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/70 to-transparent pointer-events-none rounded-2xl"
            style={{
              width: `${scrollProgress}%`,
              opacity: scrollProgress > 0 ? (isDarkMode ? 0.35 : 1) : 0,
            }}
          />

          {/* LEFT: LOGO */}
          <div className="flex-shrink-0 relative z-10">
            <Link href="/" className="flex items-center group">
              <div className="text-3xl font-semibold text-foreground tracking-wide flex items-center transition-all duration-500 ease-out group-hover:scale-110 group-hover:text-primary">
                <span className="text-5xl font-black mr-1 leading-none transform transition-all duration-700 ease-out group-hover:rotate-12 group-hover:scale-125">
                  ኦ
                </span>
                <span className="font-bold tracking-wider transition-all duration-500 ease-out group-hover:tracking-widest">
                  SKAZ
                </span>
                <span className="text-sm ml-1">®</span>
              </div>
            </Link>
          </div>

          {/* CENTER: MAIN MENU */}
          <div className="hidden lg:flex items-center justify-center gap-10 relative z-10">
            <Link
              href="/"
              className="px-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
            >
              Home
            </Link>
            <ProductsDropdown />
            <Link
              href="/about"
              className="px-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="px-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="px-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
            >
              Contact Us
            </Link>
          </div>

          {/* RIGHT: SEARCH BAR & UTILITIES */}
          <div className="flex items-center space-x-4 relative z-10">
            <div className="flex-1 max-w-md hidden md:block">
              <div
                className={`relative w-full transition-all duration-300 ${
                  isSearchFocused ? "scale-105" : ""
                }`}
              >
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={`h-11 pr-10 rounded-full border-none shadow-sm ${
                    isDarkMode ? "bg-muted/60" : "bg-muted"
                  } focus-visible:ring-primary/40 focus-visible:ring-2 transition-all`}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-10 top-1/2 -translate-y-1/2 h-6 w-6"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
                <SearchIcon
                  className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                    isSearchFocused ? "text-primary" : "text-muted-foreground"
                  }`}
                />
              </div>
            </div>

            {/* Desktop Utilities */}
            <div className="hidden lg:flex items-center space-x-3">
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <div className="flex items-center space-x-2">
                  <SignInButton mode="modal">
                    <Button variant="ghost" size="sm" className="text-sm">
                      Login
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button size="sm" className="text-sm">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </div>
              </SignedOut>

              {/* Orders Button */}
              <Link href="/user-orders">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 relative hover:bg-muted transition-all duration-300 hover:scale-110 text-blue-600 dark:text-blue-400"
                >
                  <Package className="h-5 w-5" />
                </Button>
              </Link>

              {/* Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 relative hover:bg-muted transition-all duration-300 hover:scale-110"
                onClick={() => setIsOpen(true)}
              >
                <ShoppingBag className="h-4 w-4" />
                {state.totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full text-xs text-destructive-foreground flex items-center justify-center">
                    {state.totalItems > 9 ? "9+" : state.totalItems}
                  </span>
                )}
              </Button>

              <ThemeDropdown />
              <LanguageDropdown />
            </div>

            {/* MOBILE MENU */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden h-8 w-8 hover:bg-muted transition-all duration-500 hover:scale-110"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className={`${isDarkMode ? "dark:bg-sidebar" : "bg-card"}`}
              >
                <div className="flex flex-col space-y-4 mt-8">
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground text-base font-medium transition-all duration-300 py-2 px-3 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between text-muted-foreground hover:text-foreground text-base font-medium"
                      >
                        Products <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-52">
                      {categories.map((category, i) => (
                        <DropdownMenuItem key={i} asChild>
                          <Link
                            href={`/products?category=${encodeURIComponent(
                              category
                            )}`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {category}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-foreground text-base font-medium py-2 px-3 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>

                  <Link
                    href="/blog"
                    className="text-muted-foreground hover:text-foreground text-base font-medium py-2 px-3 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Blog
                  </Link>

                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground text-base font-medium py-2 px-3 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact Us
                  </Link>

                  {/* Orders Mobile */}
                  <Link
                    href="/user-orders"
                    className="text-blue-600 dark:text-blue-400 flex items-center gap-2 py-2 px-3 text-base font-medium hover:text-blue-700 dark:hover:text-blue-300 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Package className="h-5 w-5" /> My Orders
                  </Link>

                  {/* Mobile Search */}
                  <div className="relative mt-4">
                    <Input
                      placeholder="Search Product"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10"
                    />
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-10 top-1/2 -translate-y-1/2 h-6 w-6"
                        onClick={() => setSearchQuery("")}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                    <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>

                  {/* Mobile utilities */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <SignedIn>
                      <div className="flex items-center space-x-2">
                        <UserButton afterSignOutUrl="/" />
                        <span className="text-sm">Account</span>
                      </div>
                    </SignedIn>
                    <SignedOut>
                      <div className="flex items-center space-x-2">
                        <SignInButton mode="modal">
                          <Button variant="ghost" size="sm">
                            Login
                          </Button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                          <Button size="sm">Sign Up</Button>
                        </SignUpButton>
                      </div>
                    </SignedOut>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 relative hover:bg-muted transition-all duration-300 hover:scale-110"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full text-xs text-destructive-foreground flex items-center justify-center">
                        {state.totalItems > 9 ? "9+" : state.totalItems}
                      </span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>

      {/* CartDropdown component */}
      <CartDropdown />
    </>
  );
};

export default Navbar;
