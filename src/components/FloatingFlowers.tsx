'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

interface FlowerPetal {
  id: number
  delay: number
  duration: number
  startX: number
  startY: number
  endX: number
  endY: number
  rotate: number
  symbol: string
}

interface FloatingFlowersProps {
  count?: number
  isVisible?: boolean
}

const FLOWER_SYMBOLS = ['🌸', '🌼', '🌿', '✿', '❀', '🌾']

export const FloatingFlowers: React.FC<FloatingFlowersProps> = ({
  count = 15,
  isVisible = true,
}) => {
  const petals = useMemo<FlowerPetal[]>(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      delay: Math.random() * 0.5,
      duration: 4 + Math.random() * 3,
      startX: Math.random() * 100 - 50,
      startY: -20,
      endX: Math.random() * 100 - 50,
      endY: 100 + Math.random() * 20,
      rotate: Math.random() * 360,
      symbol: FLOWER_SYMBOLS[Math.floor(Math.random() * FLOWER_SYMBOLS.length)],
    }))
  }, [count])

  if (!isVisible) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute text-2xl opacity-60"
          initial={{
            x: petal.startX + '%',
            y: petal.startY + '%',
            rotate: 0,
            opacity: 0,
          }}
          animate={{
            x: petal.endX + '%',
            y: petal.endY + '%',
            rotate: petal.rotate,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            ease: 'easeIn',
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          {petal.symbol}
        </motion.div>
      ))}
    </div>
  )
}
