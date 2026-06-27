'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WaxSeal } from './WaxSeal'
import { FloatingFlowers } from './FloatingFlowers'

interface EnvelopeProps {
  recipientName: string
  onOpen: () => void
  isOpening?: boolean
}

export const Envelope: React.FC<EnvelopeProps> = ({
  recipientName,
  onOpen,
  isOpening = false,
}) => {
  const [sealBroken, setSealBroken] = useState(false)

  const handleSealClick = () => {
    setSealBroken(true)
    setTimeout(() => {
      onOpen()
    }, 1500)
  }

  return (
    <motion.div
      className="relative w-full max-w-2xl mx-auto aspect-video rounded-sm shadow-envelope"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      {/* Envelope Body */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cream via-ivory to-paper-beige border-2 border-vintage-silver rounded-sm"
        style={{
          boxShadow:
            '0 15px 40px rgba(94, 114, 138, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
        }}
        animate={isOpening ? { rotateX: 180, opacity: 0 } : {}}
        transition={{ duration: 1.5 }}
      >
        {/* Paper Texture Overlay */}
        <div
          className="absolute inset-0 opacity-20 rounded-sm"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><filter id=%22noise%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 result=%22noise%22/></filter><rect width=%22100%22 height=%22100%22 fill=%22%23FBF8F3%22 filter=%22url(%23noise)%22/></svg>')`,
          }}
        />

        {/* Envelope Flap */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-ivory to-cream border-b border-vintage-silver"
          style={{
            transformOrigin: 'top',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
          animate={sealBroken ? { rotateX: 90 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        />

        {/* Recipient Address */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
          <div className="text-center">
            <p className="elegant-text text-sm text-vintage-blue-gray mb-2">To:</p>
            <h2 className="serif-title text-3xl md:text-4xl text-vintage-faded-navy">
              {recipientName}
            </h2>
          </div>

          {/* Decorative Elements */}
          <div className="flex gap-3 items-center justify-center">
            <div className="w-12 h-px bg-vintage-dusty-blue opacity-40" />
            <span className="text-vintage-dusty-blue opacity-60">✦</span>
            <div className="w-12 h-px bg-vintage-dusty-blue opacity-40" />
          </div>

          {/* Postage Stamp */}
          <div
            className="absolute top-8 right-8 w-20 h-24 border-2 border-dashed border-vintage-dusty-blue bg-vintage-sky-blue opacity-70 flex items-center justify-center rounded-none"
            style={{
              transform: 'rotate(15deg)',
            }}
          >
            <span className="text-2xl">✉️</span>
          </div>
        </div>

        {/* Wax Seal */}
        <WaxSeal isOpen={sealBroken} onClick={handleSealClick} />
      </motion.div>

      {/* Floating Flowers */}
      <FloatingFlowers isVisible={sealBroken} count={12} />

      {/* Click Prompt */}
      <AnimatePresence>
        {!sealBroken && (
          <motion.div
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 1 }}
          >
            <p className="elegant-text text-sm text-vintage-dusty-blue animate-pulse">
              Click the wax seal to open
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
