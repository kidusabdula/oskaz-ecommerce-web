"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Search as SearchIcon,
  ShoppingBag,
  User,
  ChevronDown,
  X,
} from "lucide-react";
import { ThemeDropdown } from "./theme-dropdown";
import { LanguageDropdown } from "./language-dropdown";
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

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currency, setCurrency] = useState<"usd" | "etb">("usd");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  //const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  React.useEffect(() => {
    const saved = localStorage?.getItem("oskaz-currency") as "usd" | "etb";
    if (saved) setCurrency(saved);
    const root = document.documentElement;
    root.classList.remove("currency-usd", "currency-etb");
    root.classList.add(`currency-${currency}`);
  }, [currency]);

  const handleCurrencyChange = (newCurrency: "usd" | "etb") => {
    setCurrency(newCurrency);
    localStorage?.setItem("oskaz-currency", newCurrency);
  };

  const dropdownContent = {
    services: {
      title: "Our Services",
      items: [
        { title: "Import Services" },
        { title: "Export Services" },
        { title: "Logistics Solutions" },
        { title: "Trade Consulting" },
      ],
    },
    solutions: {
      title: "Trade Solutions",
      items: [
        { title: "Supply Chain" },
        { title: "Compliance" },
        { title: "Technology" },
      ],
    },
    industries: {
      title: "Industries We Serve",
      items: [
        { title: "Manufacturing" },
        { title: "Electronics" },
        { title: "Textiles" },
      ],
    },
  };

  return (
    <>
      {/* Top Utility Bar */}
      <div
        className={`fixed top-0 left-0 right-0 h-12 z-40 ${
          isDarkMode ? "dark:bg-background" : "bg-muted/80"
        } flex items-center justify-between px-4 text-xs font-medium transition-all duration-300`}
      >
        <div className="flex items-center space-x-2">
          <LanguageDropdown />
          <div className="h-4 w-px bg-border mx-2" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                {currency.toUpperCase()}{" "}
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-20">
              <DropdownMenuItem onClick={() => handleCurrencyChange("usd")}>
                USD
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCurrencyChange("etb")}>
                ETB
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="text-muted-foreground hidden sm:block">
          Free Shipping On Orders Over ETB 10000
        </div>

        <div className="flex items-center space-x-4 text-sm">
          <Link
            href="/flash-sale"
            className="hover:text-primary transition-colors"
          >
            Flash Sale
          </Link>
          <Link
            href="/track-order"
            className="hover:text-primary transition-colors"
          >
            Track Order
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-primary transition-colors"
          >
            Contact
          </Link>
          <Link href="/blog" className="hover:text-primary transition-colors">
            Blog
          </Link>
          <ThemeDropdown className="h-8 w-8" />
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`fixed top-12 left-0 right-0 h-16 z-50 ${
          isDarkMode ? "dark:bg-card" : "bg-card"
        } backdrop-blur-md shadow-sm transition-all duration-500 flex items-center justify-between px-6`}
      >
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center group">
            <div className="text-3xl font-semibold text-foreground tracking-wide flex items-center transition-all duration-500 ease-out group-hover:scale-110 group-hover:text-primary">
              <span className="text-5xl font-black mr-1 leading-none transform transition-all duration-700 ease-out group-hover:rotate-12 group-hover:scale-125">
                ኦ
              </span>
              <span className="font-bold tracking-wider transform transition-all duration-500 ease-out group-hover:tracking-widest">
                SKAZ
              </span>
              <span className="text-sm font-normal ml-1 transform transition-all duration-500 ease-out">
                ®
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Nav Links */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link
            href="/home"
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-all duration-300 hover:scale-105"
          >
            Best Sellers
          </Link>

          {/* SERVICES */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-all duration-300 hover:scale-105"
              >
                Services <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {dropdownContent.services.items.map((item, i) => (
                <DropdownMenuItem key={i} asChild>
                  <Link
                    href={`/services/${item.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* SOLUTIONS */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-all duration-300 hover:scale-105"
              >
                Solutions <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {dropdownContent.solutions.items.map((item, i) => (
                <DropdownMenuItem key={i} asChild>
                  <Link
                    href={`/solutions/${item.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* INDUSTRIES */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-all duration-300 hover:scale-105"
              >
                Industries <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {dropdownContent.industries.items.map((item, i) => (
                <DropdownMenuItem key={i} asChild>
                  <Link
                    href={`/industries/${item.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/tracking"
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-all duration-300 hover:scale-105"
          >
            Tracking & Reports
          </Link>
          <Link
            href="/more"
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-all duration-300 hover:scale-105"
          >
            More
          </Link>
          <Link
            href="/sale"
            className={`text-primary hover:text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 ${
              isDarkMode
                ? "bg-primary/20 hover:bg-primary/30"
                : "bg-primary/10 hover:bg-primary/20"
            }`}
          >
            SALE
          </Link>
        </div>

        {/* Center Right: Search Bar */}
        <div className="flex-1 max-w-md mx-6">
          <div
            className={`relative w-full transition-all duration-300 ${
              isSearchFocused ? "scale-105" : ""
            }`}
          >
            <Input
              placeholder="Search Product"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`h-11 pr-10 rounded-full border-none shadow-sm ${
                isDarkMode ? "bg-muted/60" : "bg-muted"
              } focus-visible:ring-primary/40 focus-visible:ring-2 transition-all ${
                isSearchFocused
                  ? "ring-2 ring-primary/30 shadow-md"
                  : "shadow-sm"
              }`}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-10 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full hover:bg-transparent"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
            <SearchIcon
              className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                isSearchFocused ? "text-primary" : "text-muted-foreground"
              } transition-colors`}
            />
          </div>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-muted transition-all duration-300 hover:scale-110"
          >
            <User className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 relative hover:bg-muted transition-all duration-300 hover:scale-110"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full text-xs text-destructive-foreground flex items-center justify-center">
              0
            </span>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-8 w-8 hover:bg-muted transition-all duration-500 hover:scale-110 hover:rotate-180"
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
                  href="/home"
                  className="text-muted-foreground hover:text-foreground text-base font-medium transition-all duration-300 py-2 hover:scale-105 hover:translate-x-2 px-3 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Best Sellers
                </Link>
                <Link
                  href="/tracking"
                  className="text-muted-foreground hover:text-foreground text-base font-medium transition-all duration-300 py-2 hover:scale-105 hover:translate-x-2 px-3 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tracking & Reports
                </Link>
                <Link
                  href="/more"
                  className="text-muted-foreground hover:text-foreground text-base font-medium transition-all duration-300 py-2 hover:scale-105 hover:translate-x-2 px-3 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  More
                </Link>
                <Link
                  href="/sale"
                  className="text-primary hover:text-primary-foreground hover:bg-primary/10 text-base font-semibold transition-all duration-300 py-2 hover:scale-105 hover:translate-x-2 px-3 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sale
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

                <div className="flex items-center justify-end pt-4 space-x-2">
                  <ThemeDropdown />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
