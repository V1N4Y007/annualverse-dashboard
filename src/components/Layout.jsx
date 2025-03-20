
import React from "react";
import { Navbar } from "./Navbar";
import { motion } from "framer-motion";

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="pt-16 page-container py-6"
      >
        {children}
      </motion.main>
    </div>
  );
};
