"use client";

import React, { useEffect, useState } from 'react';

export default function FlashlightEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Dark Mode Flashlight */}
      <div 
        className="fixed inset-0 pointer-events-none z-30 hidden dark:block"
        style={{
          background: isVisible 
            ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, 
               rgba(255, 255, 255, 0.12) 0%, 
               rgba(255, 255, 255, 0.10) 10%, 
               rgba(255, 255, 255, 0.08) 20%, 
               rgba(255, 255, 255, 0.06) 30%, 
               rgba(255, 255, 255, 0.04) 40%, 
               rgba(255, 255, 255, 0.025) 50%, 
               rgba(255, 255, 255, 0.015) 60%, 
               rgba(255, 255, 255, 0.008) 70%, 
               rgba(255, 255, 255, 0.004) 80%, 
               rgba(255, 255, 255, 0.002) 90%, 
               transparent 100%)`
            : 'transparent',
          transition: 'background 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          filter: 'blur(0.3px)'
        }}
      />
      
      {/* Light Mode Flashlight */}
       <div 
         className="fixed inset-0 pointer-events-none z-30 block dark:hidden"
         style={{
           background: isVisible 
             ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, 
                rgba(0, 0, 0, 0.15) 0%, 
                rgba(0, 0, 0, 0.12) 10%, 
                rgba(0, 0, 0, 0.10) 20%, 
                rgba(0, 0, 0, 0.08) 30%, 
                rgba(0, 0, 0, 0.06) 40%, 
                rgba(0, 0, 0, 0.04) 50%, 
                rgba(0, 0, 0, 0.03) 60%, 
                rgba(0, 0, 0, 0.02) 70%, 
                rgba(0, 0, 0, 0.01) 80%, 
                rgba(0, 0, 0, 0.005) 90%, 
                transparent 100%)`
             : 'transparent',
           transition: 'background 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
           filter: 'blur(0.3px)'
         }}
       />
    </>
  );
}