'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import { sanitizeInput } from '@/lib/utils'

export default function Home() {
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'name' | 'code'>('name')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const searchParam = activeTab === 'name'
        ? `?name=${encodeURIComponent(sanitizeInput(name))}`
        : `?code=${encodeURIComponent(sanitizeInput(code))}`

      router.push(`/letter${searchParam}`)
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <>
      <Toaster position="bottom-center" />
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-vintage-dusty-blue rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <motion.div
          className="relative z-10 w-full max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Logo/Header */}
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="serif-title text-5xl md:text-6xl text-vintage-faded-navy mb-2">
                Kung Nasabi
              </h1>
              <h2 className="serif-title text-4xl md:text-5xl text-vintage-dusty-blue mb-4">
                Ko Sana
              </h2>
            </motion.div>

            <motion.p
              className="cursive-text text-lg md:text-xl text-vintage-dusty-blue mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Digital letters. Delivered with care.
            </motion.p>

            <motion.div
              className="flex gap-2 justify-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="w-8 h-px bg-vintage-dusty-blue opacity-40" />
              <span className="text-vintage-dusty-blue opacity-60">✦</span>
              <div className="w-8 h-px bg-vintage-dusty-blue opacity-40" />
            </motion.div>
          </div>

          {/* Welcome Message */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <p className="elegant-text text-base md:text-lg text-vintage-faded-navy leading-relaxed">
              A letter awaits you… Enter your unique name to reveal your message.
            </p>
          </motion.div>

          {/* Form Section */}
          <motion.div
            className="bg-gradient-to-br from-cream via-ivory to-paper-beige rounded-sm shadow-vintage p-8 md:p-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {/* Tab Selection */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setActiveTab('name')}
                className={`flex-1 py-2 text-center transition-all duration-300 ${
                  activeTab === 'name'
                    ? 'border-b-2 border-vintage-dusty-blue elegant-text text-vintage-faded-navy font-semibold'
                    : 'border-b-2 border-transparent elegant-text text-vintage-blue-gray hover:text-vintage-faded-navy'
                }`}
              >
                By Name
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`flex-1 py-2 text-center transition-all duration-300 ${
                  activeTab === 'code'
                    ? 'border-b-2 border-vintage-dusty-blue elegant-text text-vintage-faded-navy font-semibold'
                    : 'border-b-2 border-transparent elegant-text text-vintage-blue-gray hover:text-vintage-faded-navy'
                }`}
              >
                By Code
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {activeTab === 'name' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block elegant-text text-sm text-vintage-faded-navy mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name..."
                    className="input-vintage"
                    required={activeTab === 'name'}
                    disabled={isLoading}
                  />
                </motion.div>
              )}

              {activeTab === 'code' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block elegant-text text-sm text-vintage-faded-navy mb-2">
                    Letter Code
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="e.g., KS-2026-00123"
                    className="input-vintage"
                    required={activeTab === 'code'}
                    disabled={isLoading}
                  />
                  <p className="elegant-text text-xs text-vintage-blue-gray mt-2 italic">
                    Format: KS-YYYY-XXXXX
                  </p>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading || (!name && !code)}
                className="btn-vintage-primary w-full mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? 'Opening Letter...' : 'Open Letter'}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-vintage-silver" />
              <span className="elegant-text text-sm text-vintage-blue-gray">or</span>
              <div className="flex-1 h-px bg-vintage-silver" />
            </div>

            {/* About/Contact Links */}
            <div className="flex gap-4 justify-center text-center">
              <Link
                href="/about"
                className="elegant-text text-sm text-vintage-dusty-blue hover:text-vintage-faded-navy transition-colors underline"
              >
                About
              </Link>
              <span className="text-vintage-silver">•</span>
              <Link
                href="/contact"
                className="elegant-text text-sm text-vintage-dusty-blue hover:text-vintage-faded-navy transition-colors underline"
              >
                Contact
              </Link>
            </div>
          </motion.div>

          {/* Footer Info */}
          <motion.div
            className="text-center mt-12 text-vintage-blue-gray elegant-text text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <p>📮 Every letter is preserved with care</p>
            <p className="mt-2 italic">"A memory. Beautifully preserved and delivered with love."</p>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
