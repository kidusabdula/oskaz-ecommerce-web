"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { useDropdownOverlay } from "@/context/DropdownOverlayContext";

const DropdownOverlay = () => {
  const { isVisible } = useDropdownOverlay();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="products-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-0 top-[6rem] bottom-0 bg-black/25 backdrop-blur-sm z-[999] pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
};

export default DropdownOverlay;