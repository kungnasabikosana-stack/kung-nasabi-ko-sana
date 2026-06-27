'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { Envelope } from '@/components/Envelope'
import { Letter } from '@/components/Letter'
import { VinylPlayer } from '@/components/VinylPlayer'
import { getLetterByCode, getLetterByName, logLetterAccess } from '@/lib/supabase'
import toast, { Toaster } from 'react-hot-toast'
import Link from 'next/link'

export default function LetterPage() {
  const searchParams = useSearchParams()
  const [letter, setLetter] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLetter = async () => {
      const name = searchParams.get('name')
      const code = searchParams.get('code')

      try {
        let fetchedLetter = null

        if (code) {
          fetchedLetter = await getLetterByCode(code, name || '')
        } else if (name) {
          fetchedLetter = await getLetterByName(name)
        }

        if (!fetchedLetter) {
          setError('Letter not found. Please check your name or code and try again.')
        } else {
          setLetter(fetchedLetter)
          // Log access
          try {
            await logLetterAccess(fetchedLetter.id)
          } catch (err) {
            console.error('Failed to log access:', err)
          }
        }
      } catch (err) {
        setError('An error occurred while retrieving your letter.')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    if (searchParams.toString()) {
      fetchLetter()
    }
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <p className="elegant-text text-lg text-vintage-faded-navy mb-4">Loading your letter...</p>
            <motion.div
              className="w-8 h-8 border-2 border-vintage-dusty-blue border-t-transparent rounded-full mx-auto"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Toaster position="bottom-center" />
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="serif-title text-4xl md:text-5xl text-vintage-faded-navy mb-4">
            Letter Not Found
          </h1>
          <p className="elegant-text text-lg text-vintage-dusty-blue mb-8">{error}</p>
          <Link href="/" className="btn-vintage-primary inline-block">
            Return to Home
          </Link>
        </motion.div>
      </div>
    )
  }

  if (!letter) {
    return null
  }

  return (
    <>
      <Toaster position="bottom-center" />
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 py-12">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-vintage-dusty-blue rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-3xl">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="serif-title text-4xl md:text-5xl text-vintage-faded-navy mb-2">
              Kung Nasabi Ko Sana
            </h1>
            <p className="elegant-text text-vintage-dusty-blue italic">
              A letter for {letter.recipient_name}
            </p>
          </motion.div>

          {/* Envelope or Letter */}
          {!isEnvelopeOpen ? (
            <Envelope
              recipientName={letter.recipient_name}
              onOpen={() => setIsEnvelopeOpen(true)}
            />
          ) : (
            <>
              <Letter
                recipientName={letter.recipient_name}
                message={letter.message}
                isVisible={isEnvelopeOpen}
              />

              {/* Vinyl Player */}
              {letter.music_url && (
                <VinylPlayer
                  music={{
                    title: letter.music_title || 'Your Song',
                    artist: letter.music_artist,
                    url: letter.music_url,
                    type: letter.music_type || 'spotify',
                  }}
                />
              )}
            </>
          )}

          {/* Back Button */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <Link
              href="/"
              className="elegant-text text-vintage-dusty-blue hover:text-vintage-faded-navy transition-colors underline"
            >
              ← Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  )
}
