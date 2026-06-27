'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

interface LetterProps {
  recipientName: string
  message: string
  isVisible?: boolean
}

export const Letter: React.FC<LetterProps> = ({
  recipientName,
  message,
  isVisible = false,
}) => {
  return (
    <motion.div
      className="relative w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      {/* Letter Paper */}
      <div
        className="relative bg-cream paper-bg rounded-sm shadow-letter"
        style={{
          aspectRatio: '8.5 / 11',
          boxShadow: '0 10px 40px rgba(94, 114, 138, 0.2)',
        }}
      >
        {/* Deckled Edge Effect */}
        <div
          className="absolute inset-0 rounded-sm pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 0% 0%, transparent 2%, rgba(200, 150, 100, 0.1) 2.5%),
              radial-gradient(ellipse at 100% 0%, transparent 2%, rgba(200, 150, 100, 0.1) 2.5%),
              radial-gradient(ellipse at 0% 100%, transparent 2%, rgba(200, 150, 100, 0.1) 2.5%),
              radial-gradient(ellipse at 100% 100%, transparent 2%, rgba(200, 150, 100, 0.1) 2.5%)
            `,
            boxShadow: 'inset 0 0 8px rgba(200, 150, 100, 0.2)',
          }}
        />

        {/* Letter Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-8 md:p-12">
          {/* Opening Salutation */}
          <motion.div
            className="text-center mb-8 md:mb-12"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <p className="cursive-text text-2xl md:text-3xl text-vintage-faded-navy mb-2">
              Dear {recipientName},
            </p>
          </motion.div>

          {/* Letter Message */}
          <motion.div
            className="flex-1 flex items-center justify-center max-w-md md:max-w-lg"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <p
              className="elegant-text text-base md:text-lg text-vintage-faded-navy leading-relaxed text-center"
              style={{
                fontStyle: 'italic',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
              }}
            >
              {message}
            </p>
          </motion.div>

          {/* Closing */}
          <motion.div
            className="text-center mt-8 md:mt-12"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.9, duration: 1 }}
          >
            <p className="cursive-text text-xl md:text-2xl text-vintage-dusty-blue">
              With love,
            </p>
            <p className="elegant-text text-vintage-blue-gray mt-4 italic">✦</p>
          </motion.div>
        </div>

        {/* Aged Paper Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            opacity: 0.15,
          }}
        >
          <line x1="10%" y1="20%" x2="90%" y2="20%" stroke="#8798A8" strokeWidth="1" />
          <line x1="10%" y1="35%" x2="90%" y2="35%" stroke="#8798A8" strokeWidth="1" />
          <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#8798A8" strokeWidth="1" />
          <line x1="10%" y1="65%" x2="90%" y2="65%" stroke="#8798A8" strokeWidth="1" />
          <line x1="10%" y1="80%" x2="90%" y2="80%" stroke="#8798A8" strokeWidth="1" />
        </svg>
      </div>
    </motion.div>
  )
}
