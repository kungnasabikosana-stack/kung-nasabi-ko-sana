'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface WaxSealProps {
  isOpen: boolean
  onClick: () => void
}

export const WaxSeal: React.FC<WaxSealProps> = ({ isOpen, onClick }) => {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #D4A574, #8B6F47)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
        }}
        animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        {/* Seal Pattern */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-2xl font-cursive text-cream opacity-70">✦</span>
          </div>
        </div>

        {/* Highlight */}
        <div className="absolute inset-0 rounded-full opacity-30 bg-gradient-to-br from-white via-transparent to-transparent" />
      </motion.div>

      {isOpen && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Seal fragments */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #D4A574, #8B6F47)',
              }}
              initial={{
                x: 0,
                y: 0,
                opacity: 1,
              }}
              animate={{
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 100,
                opacity: 0,
              }}
              transition={{
                duration: 1,
                delay: Math.random() * 0.3,
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
