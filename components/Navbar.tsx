"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search, ShoppingBag, Bell, User } from "lucide-react";
import { ThemeDropdown } from "./theme-dropdown";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Helper functions for better hover handling
  const handleMouseEnter = (item: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 150); // 150ms delay before closing
  };

  // Dropdown content for each navigation item
  const dropdownContent = {
    services: {
      title: "Our Services",
      items: [
        {
          title: "Import Services",
          description: "Global sourcing and import solutions",
          image: "/placeholder-import.jpg",
          categories: ["Air Freight", "Sea Freight", "Express Delivery", "Customs Clearance"]
        },
        {
          title: "Export Services", 
          description: "International export and logistics",
          image: "/placeholder-export.jpg",
          categories: ["Documentation", "Packaging", "Shipping", "Insurance"]
        },
        {
          title: "Logistics Solutions",
          description: "End-to-end supply chain management",
          image: "/placeholder-logistics.jpg", 
          categories: ["Warehousing", "Distribution", "Tracking", "Consulting"]
        },
        {
          title: "Trade Consulting",
          description: "Expert guidance for international trade",
          image: "/placeholder-consulting.jpg",
          categories: ["Market Analysis", "Compliance", "Risk Assessment", "Strategy"]
        }
      ]
    },
    solutions: {
      title: "Trade Solutions",
      items: [
        {
          title: "Supply Chain",
          description: "Optimize your global supply chain",
          image: "/placeholder-supply.jpg",
          categories: ["Planning", "Optimization", "Visibility", "Analytics"]
        },
        {
          title: "Compliance",
          description: "Navigate international regulations",
          image: "/placeholder-compliance.jpg",
          categories: ["Documentation", "Certifications", "Audits", "Training"]
        },
        {
          title: "Technology",
          description: "Digital trade solutions",
          image: "/placeholder-tech.jpg",
          categories: ["Tracking Systems", "API Integration", "Automation", "Reporting"]
        }
      ]
    },
    industries: {
      title: "Industries We Serve",
      items: [
        {
          title: "Manufacturing",
          description: "Industrial equipment and machinery",
          image: "/placeholder-manufacturing.jpg",
          categories: ["Heavy Machinery", "Components", "Raw Materials", "Tools"]
        },
        {
          title: "Electronics",
          description: "Consumer and industrial electronics",
          image: "/placeholder-electronics.jpg",
          categories: ["Consumer Goods", "Components", "Semiconductors", "Accessories"]
        },
        {
          title: "Textiles",
          description: "Fashion and textile imports",
          image: "/placeholder-textiles.jpg",
          categories: ["Apparel", "Fabrics", "Accessories", "Home Textiles"]
        }
      ]
    }
  };

  return (
    <>
      {/* Background Overlay */}
      {hoveredItem && (
        <div className="fixed inset-0 bg-gray-900/40 dark:bg-gray-900/60 z-30 transition-opacity duration-300" />
      )}
      
      {/* Gradient overlay at the top */}
      <div className="fixed top-0 left-0 right-0 h-12 z-40 pointer-events-none">
        <div className="h-full bg-gradient-to-b from-gray-900/80 via-gray-600/50 to-gray-200/20"></div>
      </div>
      
      <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md fixed top-12 left-4 right-0 z-50 shadow-xl dark:shadow-2xl dark:shadow-gray-900/50 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 dark:ring-1 dark:ring-gray-600/20">
      <div className="max-w-7xl mx-auto pl-6 pr-0">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 mr-8">
            <Link href="/" className="flex items-center">
              <div className="text-3xl font-semibold text-gray-900 dark:text-white tracking-wide flex items-center">
                <span className="text-5xl font-black mr-1 leading-none">ኦ</span>
                <span className="font-bold tracking-wider">SKAZ</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center flex-1 justify-evenly px-4">
            <Link
              href="/best-sellers"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm font-medium hover:font-semibold transition-all duration-300 tracking-wide hover:scale-105"
            >
              BEST SELLERS
            </Link>
            
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/services"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm font-medium hover:font-semibold transition-all duration-300 tracking-wide hover:scale-105"
              >
                SERVICES
              </Link>
              
              {hoveredItem === 'services' && (
                  <>
                    {/* Invisible bridge area */}
                    <div 
                      className="fixed top-16 left-1/2 transform -translate-x-1/2 w-[1000px] h-12 z-40"
                      onMouseEnter={() => handleMouseEnter('services')}
                      onMouseLeave={handleMouseLeave}
                    />
                    <div 
                      className="fixed top-20 left-1/2 transform -translate-x-1/2 w-[1000px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl dark:shadow-gray-900/60 border border-gray-200/50 dark:border-gray-700/50 p-8 z-50 transition-all duration-200 ease-in-out"
                      onMouseEnter={() => handleMouseEnter('services')}
                      onMouseLeave={handleMouseLeave}
                    >
                  <div className="grid grid-cols-4 gap-6">
                    {dropdownContent.services.items.map((item, index) => (
                      <div key={index} className="group cursor-pointer">
                        <div className="bg-gray-100 dark:bg-gray-800/50 rounded-xl h-40 mb-4 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-700/50 transition-colors">
                          <div className="w-20 h-20 bg-blue-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm font-bold">{item.title.split(' ')[0]}</span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{item.description}</p>
                        <div className="space-y-1">
                          {item.categories.map((category, idx) => (
                            <div key={idx} className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">{category}</div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                  </>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('solutions')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/solutions"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm font-medium hover:font-semibold transition-all duration-300 tracking-wide hover:scale-105"
              >
                SOLUTIONS
              </Link>
              
              {hoveredItem === 'solutions' && (
                  <>
                    {/* Invisible bridge area */}
                    <div 
                      className="fixed top-16 left-1/2 transform -translate-x-1/2 w-[800px] h-12 z-40"
                      onMouseEnter={() => handleMouseEnter('solutions')}
                      onMouseLeave={handleMouseLeave}
                    />
                    <div 
                      className="fixed top-20 left-1/2 transform -translate-x-1/2 w-[800px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl dark:shadow-gray-900/60 border border-gray-200/50 dark:border-gray-700/50 p-8 z-50 transition-all duration-200 ease-in-out"
                      onMouseEnter={() => handleMouseEnter('solutions')}
                      onMouseLeave={handleMouseLeave}
                    >
                   <div className="grid grid-cols-3 gap-6">
                     {dropdownContent.solutions.items.map((item, index) => (
                       <div key={index} className="group cursor-pointer">
                          <div className="bg-gray-100 dark:bg-gray-800/50 rounded-xl h-40 mb-4 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-700/50 transition-colors">
                           <div className="w-20 h-20 bg-green-500 rounded-lg flex items-center justify-center">
                             <span className="text-white text-sm font-bold">{item.title.split(' ')[0]}</span>
                           </div>
                         </div>
                         <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{item.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{item.description}</p>
                         <div className="space-y-1">
                           {item.categories.map((category, idx) => (
                             <div key={idx} className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors cursor-pointer">{category}</div>
                           ))}
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
                   </>
               )}
            </div>

            {/* Industries Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('industries')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/industries"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm font-medium hover:font-semibold transition-all duration-300 tracking-wide hover:scale-105"
              >
                INDUSTRIES
              </Link>
              
              {hoveredItem === 'industries' && (
                  <>
                    {/* Invisible bridge area */}
                    <div 
                      className="fixed top-16 left-1/2 transform -translate-x-1/2 w-[800px] h-12 z-40"
                      onMouseEnter={() => handleMouseEnter('industries')}
                      onMouseLeave={handleMouseLeave}
                    />
                    <div 
                      className="fixed top-20 left-1/2 transform -translate-x-1/2 w-[800px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl dark:shadow-gray-900/60 border border-gray-200/50 dark:border-gray-700/50 p-8 z-50 transition-all duration-200 ease-in-out"
                      onMouseEnter={() => handleMouseEnter('industries')}
                      onMouseLeave={handleMouseLeave}
                    >
                   <div className="grid grid-cols-3 gap-6">
                     {dropdownContent.industries.items.map((item, index) => (
                       <div key={index} className="group cursor-pointer">
                          <div className="bg-gray-100 dark:bg-gray-800/50 rounded-xl h-40 mb-4 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-700/50 transition-colors">
                           <div className="w-20 h-20 bg-purple-500 rounded-lg flex items-center justify-center">
                             <span className="text-white text-sm font-bold">{item.title.split(' ')[0]}</span>
                           </div>
                         </div>
                         <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{item.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{item.description}</p>
                         <div className="space-y-1">
                           {item.categories.map((category, idx) => (
                             <div key={idx} className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer">{category}</div>
                           ))}
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
                   </>
               )}
            </div>

            <Link
              href="/tracking"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm font-medium hover:font-semibold transition-all duration-300 tracking-wide hover:scale-105"
            >
              TRACKING & REPORTS
            </Link>
            
            <Link
              href="/more"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm font-medium hover:font-semibold transition-all duration-300 tracking-wide hover:scale-105"
            >
              MORE
            </Link>
            
            <Link
              href="/sale"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-semibold hover:font-bold transition-all duration-300 tracking-wide hover:scale-110 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30"
            >
              SALE
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4 flex-shrink-0 ml-auto">
            <button className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            
            <button className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <User className="h-5 w-5" />
            </button>
            
            <button className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Search className="h-5 w-5" />
            </button>
            
            <Link href="/inquiry" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors relative">
              <ShoppingBag className="h-5 w-5" />
            </Link>

            {/* Theme Controls - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-2">
              <ThemeDropdown />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
         {isMenuOpen && (
           <div className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 rounded-b-2xl mx-4 shadow-xl dark:shadow-2xl dark:shadow-gray-900/50 dark:ring-1 dark:ring-gray-600/20">
             <div className="px-4 pt-4 pb-6 space-y-4">
            <Link
              href="/best-sellers"
              className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-base font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Best Sellers
            </Link>
            <Link
              href="/services"
              className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-base font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/solutions"
              className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-base font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Solutions
            </Link>
            <Link
              href="/industries"
              className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-base font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Industries
            </Link>
            <Link
              href="/tracking"
              className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-base font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Tracking & Reports
            </Link>
            
            {/* Theme controls in mobile menu */}
            <div className="flex items-center space-x-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <span className="text-sm text-gray-600 dark:text-gray-400">Theme:</span>
              <ThemeDropdown />
            </div>
          </div>
        </div>
      )}
    </nav>
    </>
  );
};

export default Navbar;