'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="serif-title text-5xl md:text-6xl text-vintage-faded-navy mb-4">
            About Us
          </h1>
          <p className="cursive-text text-lg text-vintage-dusty-blue">
            Digital letters. Delivered with care.
          </p>
        </div>

        {/* Content */}
        <motion.div
          className="bg-gradient-to-br from-cream via-ivory to-paper-beige rounded-sm shadow-vintage p-8 md:p-10 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div>
            <h2 className="serif-heading text-2xl mb-3 text-vintage-faded-navy">Our Story</h2>
            <p className="elegant-text text-vintage-faded-navy leading-relaxed">
              In a world of instant messages and fleeting conversations, we believe in the timeless beauty of handwritten letters. 
              Kung Nasabi Ko Sana is dedicated to preserving the intimate art of correspondence in a digital age.
            </p>
          </div>

          <div>
            <h2 className="serif-heading text-2xl mb-3 text-vintage-faded-navy">Our Mission</h2>
            <p className="elegant-text text-vintage-faded-navy leading-relaxed">
              To deliver meaningful messages with the care and attention they deserve. Each letter is a memory waiting to be discovered, 
              a sentiment preserved carefully, and a moment of connection delivered with love.
            </p>
          </div>

          <div>
            <h2 className="serif-heading text-2xl mb-3 text-vintage-faded-navy">The Experience</h2>
            <p className="elegant-text text-vintage-faded-navy leading-relaxed">
              Opening a letter from Kung Nasabi Ko Sana should feel like discovering a forgotten note hidden in a memory box. 
              It's an intimate journey through carefully crafted words, accompanied by the perfect soundtrack, and wrapped in the warmth 
              of genuine human connection.
            </p>
          </div>

          <div className="pt-6 border-t border-vintage-silver">
            <p className="elegant-text text-sm text-vintage-blue-gray italic text-center">
              "A memory. Beautifully preserved and delivered with care."
            </p>
          </div>
        </motion.div>

        {/* Back Link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link href="/" className="btn-vintage-primary">
            ← Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
