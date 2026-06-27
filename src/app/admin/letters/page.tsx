'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import { generateCode } from '@/lib/utils'

function LettersContent() {
  const [letters, setLetters] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    recipient_name: '',
    message: '',
    music_url: '',
    music_type: 'spotify',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { logout } = useAdminAuth()

  useEffect(() => {
    fetchLetters()
  }, [])

  const fetchLetters = async () => {
    try {
      const response = await fetch('/api/admin/letters')
      if (response.ok) {
        const data = await response.json()
        setLetters(data.letters || [])
      }
    } catch (error) {
      toast.error('Failed to load letters')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const code = generateCode()
      const response = await fetch('/api/admin/letters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          letter_code: code,
          status: 'sent',
        }),
      })

      if (!response.ok) {
        toast.error('Failed to create letter')
        return
      }

      toast.success('Letter created successfully!')
      setFormData({
        recipient_name: '',
        message: '',
        music_url: '',
        music_type: 'spotify',
      })
      setShowForm(false)
      await fetchLetters()
    } catch (error) {
      toast.error('Failed to create letter')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Toaster position="bottom-center" />
      <div className="min-h-screen p-4 md:p-8">
        {/* Header */}
        <motion.div
          className="flex justify-between items-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <Link href="/admin/dashboard" className="elegant-text text-vintage-dusty-blue hover:text-vintage-faded-navy mb-2">
              ← Dashboard
            </Link>
            <h1 className="serif-title text-4xl text-vintage-faded-navy">
              Manage Letters
            </h1>
          </div>
          <button
            onClick={logout}
            className="btn-vintage px-4 py-2 text-sm"
          >
            Logout
          </button>
        </motion.div>

        {/* Create Letter Button */}
        <motion.button
          onClick={() => setShowForm(!showForm)}
          className="btn-vintage-primary mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {showForm ? 'Cancel' : '✎ Create New Letter'}
        </motion.button>

        {/* Create Form */}
        {showForm && (
          <motion.div
            className="bg-gradient-to-br from-cream via-ivory to-paper-beige rounded-sm shadow-vintage p-8 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block elegant-text text-sm text-vintage-faded-navy mb-2">
                  Recipient Name
                </label>
                <input
                  type="text"
                  name="recipient_name"
                  value={formData.recipient_name}
                  onChange={handleInputChange}
                  placeholder="e.g., Maria"
                  className="input-vintage"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block elegant-text text-sm text-vintage-faded-navy mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Write your letter..."
                  rows={6}
                  className="w-full px-4 py-3 bg-ivory border-b-2 border-vintage-dusty-blue focus:outline-none focus:border-vintage-faded-navy transition-colors font-elegant text-vintage-faded-navy placeholder-vintage-blue-gray placeholder-opacity-60 resize-none"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block elegant-text text-sm text-vintage-faded-navy mb-2">
                    Music Type
                  </label>
                  <select
                    name="music_type"
                    value={formData.music_type}
                    onChange={handleInputChange}
                    className="input-vintage"
                    disabled={isSubmitting}
                  >
                    <option value="spotify">Spotify</option>
                    <option value="youtube">YouTube</option>
                    <option value="uploaded">Uploaded</option>
                  </select>
                </div>

                <div>
                  <label className="block elegant-text text-sm text-vintage-faded-navy mb-2">
                    Music URL (optional)
                  </label>
                  <input
                    type="url"
                    name="music_url"
                    value={formData.music_url}
                    onChange={handleInputChange}
                    placeholder="https://..."
                    className="input-vintage"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-vintage-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating...' : 'Create Letter'}
              </button>
            </form>
          </motion.div>
        )}

        {/* Letters List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {isLoading ? (
            <p className="elegant-text text-center text-vintage-blue-gray">Loading letters...</p>
          ) : letters.length === 0 ? (
            <p className="elegant-text text-center text-vintage-blue-gray">No letters yet. Create your first one!</p>
          ) : (
            <div className="space-y-4">
              {letters.map((letter, index) => (
                <motion.div
                  key={letter.id}
                  className="bg-gradient-to-br from-cream via-ivory to-paper-beige rounded-sm shadow-vintage p-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="serif-heading text-lg text-vintage-faded-navy">
                        {letter.recipient_name}
                      </h3>
                      <p className="elegant-text text-sm text-vintage-blue-gray mt-1">
                        Code: {letter.letter_code}
                      </p>
                      <p className="elegant-text text-xs text-vintage-dusty-blue mt-2">
                        Status: {letter.status} {letter.is_opened && '• Opened'}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-vintage-dusty-blue text-cream elegant-text text-xs rounded-full">
                        {letter.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </>
  )
}

export default function AdminLetters() {
  return (
    <ProtectedRoute>
      <LettersContent />
    </ProtectedRoute>
  )
}
