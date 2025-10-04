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
    <div 
      className="fixed inset-0 pointer-events-none z-30 hidden dark:block"
      style={{
        background: isVisible 
          ? `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, 
             rgba(255, 255, 255, 0.08) 0%, 
             rgba(255, 255, 255, 0.06) 15%, 
             rgba(255, 255, 255, 0.04) 25%, 
             rgba(255, 255, 255, 0.025) 35%, 
             rgba(255, 255, 255, 0.015) 45%, 
             rgba(255, 255, 255, 0.008) 55%, 
             rgba(255, 255, 255, 0.004) 65%, 
             rgba(255, 255, 255, 0.002) 75%, 
             rgba(255, 255, 255, 0.001) 85%, 
             transparent 100%)`
          : 'transparent',
        transition: 'background 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
        filter: 'blur(0.5px)'
      }}
    />
  );
}