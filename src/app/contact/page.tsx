'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      // In a real application, this would send to a backend
      toast.success('Thank you for reaching out! We will get back to you soon.')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Toaster position="bottom-center" />
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
              Contact Us
            </h1>
            <p className="elegant-text text-vintage-dusty-blue">
              We'd love to hear from you
            </p>
          </div>

          {/* Content */}
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* Contact Info */}
            <div className="bg-gradient-to-br from-cream via-ivory to-paper-beige rounded-sm shadow-vintage p-8">
              <h2 className="serif-heading text-2xl mb-6 text-vintage-faded-navy">Get in Touch</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="elegant-text font-semibold text-vintage-faded-navy mb-2">Email</h3>
                  <a
                    href="mailto:kungnasabikosana@gmail.com"
                    className="elegant-text text-vintage-dusty-blue hover:text-vintage-faded-navy transition-colors"
                  >
                    kungnasabikosana@gmail.com
                  </a>
                </div>

                <div>
                  <h3 className="elegant-text font-semibold text-vintage-faded-navy mb-2">Follow Us</h3>
                  <div className="space-y-2">
                    <a
                      href="https://www.tiktok.com/@kungnasabikosana.letters"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block elegant-text text-vintage-dusty-blue hover:text-vintage-faded-navy transition-colors"
                    >
                      TikTok: kungnasabikosana.letters
                    </a>
                    <a
                      href="https://www.facebook.com/kungnasabikosana.letters.co"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block elegant-text text-vintage-dusty-blue hover:text-vintage-faded-navy transition-colors"
                    >
                      Facebook: kungnasabikosana.letters.co
                    </a>
                    <a
                      href="https://www.instagram.com/kungnasabikosana.letters.co"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block elegant-text text-vintage-dusty-blue hover:text-vintage-faded-navy transition-colors"
                    >
                      Instagram: kungnasabikosana.letters.co
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-cream via-ivory to-paper-beige rounded-sm shadow-vintage p-8 space-y-4">
              <div>
                <label className="block elegant-text text-sm text-vintage-faded-navy mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="input-vintage"
                  required
                />
              </div>

              <div>
                <label className="block elegant-text text-sm text-vintage-faded-navy mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  className="input-vintage"
                  required
                />
              </div>

              <div>
                <label className="block elegant-text text-sm text-vintage-faded-navy mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  rows={4}
                  className="w-full px-4 py-3 bg-ivory border-b-2 border-vintage-dusty-blue focus:outline-none focus:border-vintage-faded-navy transition-colors font-elegant text-vintage-faded-navy placeholder-vintage-blue-gray placeholder-opacity-60 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-vintage-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
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
    </>
  )
}
