"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search, ShoppingBag, Bell, User } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeDropdown } from "./theme-dropdown";
import { LanguageToggle } from "./language-toggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { theme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = Math.min(scrollTop / docHeight, 1);
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to calculate text color based on element position and fill progress
  const getElementTextColor = (elementPosition: 'left' | 'center' | 'right') => {
    // The fill overlay expands from left to right with width = scrollProgress * 100%
    const fillWidthPercentage = scrollProgress * 100;
    
    // Define the start positions of elements (as percentages of navbar width)
    // These represent where each element group begins
    const elementStartPositions = {
      left: 0,     // Logo starts immediately (0% from left)
      center: 35,  // Navigation links start around 35% from left
      right: 75    // Right-side buttons start around 75% from left
    };
    
    const elementStartPos = elementStartPositions[elementPosition];
    
    // Element changes color when the fill overlay reaches its start position
    const isElementTouched = fillWidthPercentage >= elementStartPos;
    
    if (isElementTouched && scrollProgress > 0.01) {
      // Only change text color in dark mode when fill overlay touches
      // In light mode, keep the default text color
      if (theme === 'dark') {
        return 'rgb(255, 255, 255)'; // White text for dark mode
      }
      // For light mode, return undefined to use default color
    }
    
    return undefined; // Use default color
  };

  // Enhanced hover handling with better timing
  const handleMouseEnter = (item: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 300); // Increased delay for better stability
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
      {/* Enhanced Background Overlay with subtle blur and dark overlay */}
      <AnimatePresence>
        {hoveredItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-[9990]" 
          />
        )}
      </AnimatePresence>
      
      {/* Enhanced Gradient overlay at the top - Dark mode only */}
      <div className="fixed top-0 left-0 right-0 h-32 z-[9991] pointer-events-none">
        {/* Dark mode - enhanced blur effect */}
        <div className="hidden dark:block h-full bg-black/10"></div>
      </div>
      
      <nav className="fixed top-4 left-4 right-4 z-[9992] bg-gradient-to-b from-white/99 via-white/97 to-white/94 dark:bg-gradient-to-b dark:from-black/97 dark:via-black/99 dark:to-gray-900/97 rounded-2xl border border-gray-200/70 dark:border-gray-800/70 transition-all duration-700 ease-out shadow-[0_12px_40px_rgba(0,0,0,0.15),0_4px_12px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-1px_0_rgba(0,0,0,0.08)] dark:shadow-[0_24px_48px_rgba(0,0,0,0.95),0_12px_20px_rgba(0,0,0,0.8),inset_0_2px_0_rgba(255,255,255,0.1),inset_0_-2px_0_rgba(0,0,0,0.4),inset_0_0_0_1px_rgba(255,255,255,0.08)] overflow-visible">
        {/* Enhanced Fill overlays with smoother animations */}
        {theme === 'dark' && (
          <div 
            className="absolute inset-0 rounded-2xl transition-all duration-500 ease-out"
            style={{
              background: `linear-gradient(90deg, rgba(79, 79, 79, 0.8) 0%, rgba(79, 79, 79, 0.7) 70%, rgba(79, 79, 79, 0.5) 100%)`,
              width: `${scrollProgress * 100}%`,
              transformOrigin: 'left center',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.2)'
            }}
          />
        )}
        {theme === 'light' && (
          <div 
            className="absolute inset-0 rounded-2xl transition-all duration-500 ease-out"
            style={{
              background: `linear-gradient(90deg, rgba(79, 79, 79, 0.7) 0%, rgba(79, 79, 79, 0.6) 70%, rgba(79, 79, 79, 0.4) 100%)`,
              width: `${scrollProgress * 100}%`,
              transformOrigin: 'left center',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.1)'
            }}
          />
        )}
        
      <div className="relative max-w-7xl mx-auto pl-6 pr-6 z-10">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 mr-8">
            <Link href="/" className="flex items-center group">
              <div 
                className="text-3xl font-semibold text-gray-900 dark:text-white tracking-wide flex items-center transition-all duration-500 ease-out group-hover:scale-110 group-hover:text-blue-600 dark:group-hover:text-blue-400 animate-modern-rotate"
                style={{ color: getElementTextColor('left') }}
              >
                <span 
                  className="text-5xl font-black mr-1 leading-none transform transition-all duration-700 ease-out group-hover:rotate-12 group-hover:scale-125"
                  style={{ color: getElementTextColor('left') }}
                >ኦ</span>
                <span 
                  className="font-bold tracking-wider transform transition-all duration-500 ease-out group-hover:tracking-widest"
                  style={{ color: getElementTextColor('left') }}
                >SKAZ</span>
                <span 
                  className="text-sm font-normal ml-1 transform transition-all duration-500 ease-out"
                  style={{ color: getElementTextColor('left') }}
                >®</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center flex-1 justify-evenly px-4">
            <Link
              href="/home"
              className="relative text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm font-medium hover:font-semibold transition-all duration-500 ease-out tracking-wide hover:scale-110 hover:tracking-wider group overflow-hidden"
            >
              <span 
                className="relative z-10 transition-all duration-300"
                style={{ color: getElementTextColor('center') }}
              >PRODUCTS</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-lg"></div>
            </Link>
            
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/services"
                className="relative text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm font-medium hover:font-semibold transition-all duration-500 ease-out tracking-wide hover:scale-110 hover:tracking-wider group overflow-hidden"
              >
                <span 
                  className="relative z-10 transition-all duration-300"
                  style={{ color: getElementTextColor('center') }}
                >SERVICES</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-lg"></div>
              </Link>
              
              <AnimatePresence>
                {hoveredItem === 'services' && (
                  <>
                    {/* Invisible bridge area */}
                    <div 
                      className="fixed top-20 left-1/2 -translate-x-1/2 w-[1000px] h-6 z-[9998]"
                      onMouseEnter={() => handleMouseEnter('services')}
                      onMouseLeave={handleMouseLeave}
                    />
                    <motion.div 
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="fixed top-[6.5rem] left-1/2 -translate-x-1/2 w-[1000px] bg-white/99 dark:bg-black/99 rounded-2xl shadow-2xl dark:shadow-black/80 border border-gray-200/60 dark:border-gray-700/60 p-8 z-[9999]"
                      onMouseEnter={() => handleMouseEnter('services')}
                      onMouseLeave={handleMouseLeave}
                    >
                  <div className="grid grid-cols-4 gap-6">
                    {dropdownContent.services.items.map((item, index) => (
                      <div key={index} className="group cursor-pointer transform transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2">
                        <div className="bg-gray-100 dark:bg-gray-800/50 rounded-xl h-40 mb-4 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-700/50 transition-all duration-500 ease-out group-hover:shadow-lg group-hover:scale-105 overflow-hidden relative">
                          <div className="w-20 h-20 bg-blue-500 rounded-lg flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-3 group-hover:bg-blue-600">
                            <span className="text-white text-sm font-bold transition-all duration-300 group-hover:scale-110">{item.title.split(' ')[0]}</span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-500 ease-out group-hover:scale-105">{item.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 transition-all duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300">{item.description}</p>
                        <div className="space-y-1">
                          {item.categories.map((category, idx) => (
                            <div key={idx} className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 cursor-pointer hover:scale-105 hover:translate-x-1">{category}</div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Solutions Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('solutions')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/solutions"
                className="relative text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm font-medium hover:font-semibold transition-all duration-500 ease-out tracking-wide hover:scale-110 hover:tracking-wider group overflow-hidden"
              >
                <span 
                  className="relative z-10 transition-all duration-300"
                  style={{ color: getElementTextColor('center') }}
                >SOLUTIONS</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-lg"></div>
              </Link>
              
              <AnimatePresence>
                {hoveredItem === 'solutions' && (
                  <>
                    {/* Invisible bridge area */}
                    <div 
                      className="fixed top-20 left-1/2 -translate-x-1/2 w-[800px] h-6 z-[9998]"
                      onMouseEnter={() => handleMouseEnter('solutions')}
                      onMouseLeave={handleMouseLeave}
                    />
                    <motion.div 
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="fixed top-[6.5rem] left-1/2 -translate-x-1/2 w-[800px] bg-white/99 dark:bg-black/99 rounded-2xl shadow-2xl dark:shadow-black/80 border border-gray-200/60 dark:border-gray-700/60 p-8 z-[9999]"
                      onMouseEnter={() => handleMouseEnter('solutions')}
                      onMouseLeave={handleMouseLeave}
                    >
                   <div className="grid grid-cols-3 gap-6">
                     {dropdownContent.solutions.items.map((item, index) => (
                       <div key={index} className="group cursor-pointer transform transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2">
                          <div className="bg-gray-100 dark:bg-gray-800/50 rounded-xl h-40 mb-4 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-700/50 transition-all duration-500 ease-out group-hover:shadow-lg group-hover:scale-105 overflow-hidden relative">
                           <div className="w-20 h-20 bg-green-500 rounded-lg flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-3 group-hover:bg-green-600">
                             <span className="text-white text-sm font-bold transition-all duration-300 group-hover:scale-110">{item.title.split(' ')[0]}</span>
                           </div>
                           <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                         </div>
                         <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-all duration-500 ease-out group-hover:scale-105">{item.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 transition-all duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300">{item.description}</p>
                         <div className="space-y-1">
                           {item.categories.map((category, idx) => (
                             <div key={idx} className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 cursor-pointer hover:scale-105 hover:translate-x-1">{category}</div>
                           ))}
                         </div>
                       </div>
                     ))}
                   </div>
                 </motion.div>
                   </>
                 )}
               </AnimatePresence>
             </div>

             {/* Industries Dropdown */}
             <div 
               className="relative"
               onMouseEnter={() => handleMouseEnter('industries')}
               onMouseLeave={handleMouseLeave}
             >
               <Link
                 href="/industries"
                 className="relative text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm font-medium hover:font-semibold transition-all duration-500 ease-out tracking-wide hover:scale-110 hover:tracking-wider group overflow-hidden"
               >
                 <span 
                    className="relative z-10 transition-all duration-300"
                    style={{ color: getElementTextColor('center') }}
                  >INDUSTRIES</span>
                 <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-lg"></div>
               </Link>
               
               <AnimatePresence>
                 {hoveredItem === 'industries' && (
                   <>
                     {/* Invisible bridge area */}
                     <div 
                       className="fixed top-20 left-1/2 -translate-x-1/2 w-[800px] h-6 z-[9998]"
                       onMouseEnter={() => handleMouseEnter('industries')}
                       onMouseLeave={handleMouseLeave}
                     />
                     <motion.div 
                       initial={{ opacity: 0, y: -10, scale: 0.95 }}
                       animate={{ opacity: 1, y: 0, scale: 1 }}
                       exit={{ opacity: 0, y: -10, scale: 0.95 }}
                       transition={{ duration: 0.2, ease: "easeOut" }}
                       className="fixed top-[6.5rem] left-1/2 -translate-x-1/2 w-[800px] bg-white/99 dark:bg-black/99 rounded-2xl shadow-2xl dark:shadow-black/80 border border-gray-200/60 dark:border-gray-700/60 p-8 z-[9999]"
                       onMouseEnter={() => handleMouseEnter('industries')}
                       onMouseLeave={handleMouseLeave}
                     >
                    <div className="grid grid-cols-3 gap-6">
                      {dropdownContent.industries.items.map((item, index) => (
                        <div key={index} className="group cursor-pointer transform transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2">
                           <div className="bg-gray-100 dark:bg-gray-800/50 rounded-xl h-40 mb-4 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-700/50 transition-all duration-500 ease-out group-hover:shadow-lg group-hover:scale-105 overflow-hidden relative">
                            <div className="w-20 h-20 bg-purple-500 rounded-lg flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-3 group-hover:bg-purple-600">
                              <span className="text-white text-sm font-bold transition-all duration-300 group-hover:scale-110">{item.title.split(' ')[0]}</span>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          </div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-all duration-500 ease-out group-hover:scale-105">{item.title}</h3>
                           <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 transition-all duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300">{item.description}</p>
                          <div className="space-y-1">
                            {item.categories.map((category, idx) => (
                              <div key={idx} className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 cursor-pointer hover:scale-105 hover:translate-x-1">{category}</div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                    </>
                  )}
                </AnimatePresence>
             </div>

             <Link
               href="/about"
               className="relative text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm font-medium hover:font-semibold transition-all duration-500 ease-out tracking-wide hover:scale-110 hover:tracking-wider group overflow-hidden"
             >
               <span className="relative z-10 transition-all duration-300">ABOUT</span>
               <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-lg"></div>
             </Link>
             
            
             
             <Link
               href="/sale"
               className="relative text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-semibold hover:font-bold transition-all duration-500 ease-out tracking-wide hover:scale-125 hover:tracking-wider bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 group overflow-hidden hover:shadow-lg hover:-translate-y-0.5"
             >
               <span className="relative z-10 transition-all duration-300">SALE</span>
               <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-lg"></div>
             </Link>
           </div>

           {/* Right side icons */}
           <div className="flex items-center space-x-4 flex-shrink-0 ml-auto">
             <button className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 ease-out hover:scale-125 hover:rotate-12 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg">
               <Bell className="h-5 w-5" />
             </button>
             
             <button className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 ease-out hover:scale-125 hover:rotate-12 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg">
               <User className="h-5 w-5" />
             </button>
             
             <button 
               className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 ease-out hover:scale-125 hover:rotate-12 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg"
               style={{ color: getElementTextColor('right') }}
             >
               <Search className="h-5 w-5" />
             </button>
             
             <Link 
               href="/inquiry" 
               className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 ease-out hover:scale-125 hover:rotate-12 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg relative"
               style={{ color: getElementTextColor('right') }}
             >
               <ShoppingBag className="h-5 w-5" />
             </Link>

             {/* Theme & Language Controls - Hidden on mobile */}
             <div className="hidden md:flex items-center space-x-2">
               <LanguageToggle />
               <ThemeDropdown />
             </div>

             {/* Mobile menu button */}
             <button
               onClick={toggleMenu}
               className="lg:hidden text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-500 ease-out hover:scale-125 hover:rotate-180 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg"
               style={{ color: getElementTextColor('right') }}
               aria-label="Toggle menu"
             >
               {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
             </button>
           </div>
         </div>
       </div>

       {/* Mobile menu */}
          {isMenuOpen && (
            <div className="lg:hidden bg-white/95 dark:bg-black/95 border-t border-gray-200/50 dark:border-gray-700/50 rounded-b-2xl mx-4 shadow-xl dark:shadow-2xl dark:shadow-black/50 dark:ring-1 dark:ring-gray-600/20 transition-all duration-500 ease-out animate-in slide-in-from-top-4 fade-in-0">
              <div className="px-4 pt-4 pb-6 space-y-4">
             <Link
               href="/home"
               className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-base font-medium transition-all duration-300 ease-out py-2 hover:scale-105 hover:translate-x-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 px-3 rounded-lg"
               onClick={() => setIsMenuOpen(false)}
             >
               Best Sellers
             </Link>
             <Link
               href="/services"
               className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-base font-medium transition-all duration-300 ease-out py-2 hover:scale-105 hover:translate-x-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 px-3 rounded-lg"
               onClick={() => setIsMenuOpen(false)}
             >
               Services
             </Link>
             <Link
               href="/solutions"
               className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-base font-medium transition-all duration-300 ease-out py-2 hover:scale-105 hover:translate-x-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 px-3 rounded-lg"
               onClick={() => setIsMenuOpen(false)}
             >
               Solutions
             </Link>
             <Link
               href="/industries"
               className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-base font-medium transition-all duration-300 ease-out py-2 hover:scale-105 hover:translate-x-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 px-3 rounded-lg"
               onClick={() => setIsMenuOpen(false)}
             >
               Industries
             </Link>
             <Link
               href="/about"
               className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-base font-medium transition-all duration-300 ease-out py-2 hover:scale-105 hover:translate-x-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 px-3 rounded-lg"
               onClick={() => setIsMenuOpen(false)}
             >
               About
             </Link>
             
             {/* Theme & Language controls in mobile menu */}
             <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
               <div className="flex items-center space-x-2">
                 <span className="text-sm text-gray-600 dark:text-gray-400">Language:</span>
                 <LanguageToggle />
               </div>
               <div className="flex items-center space-x-2">
                 <span className="text-sm text-gray-600 dark:text-gray-400">Theme:</span>
                 <ThemeDropdown />
               </div>
             </div>
           </div>
         </div>
       )}
     </nav>
    </>
  );
};

export default Navbar;