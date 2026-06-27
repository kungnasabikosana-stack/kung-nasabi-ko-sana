'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        toast.error('Invalid credentials')
        return
      }

      toast.success('Welcome back!')
      router.push('/admin/dashboard')
    } catch (error) {
      toast.error('Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Toaster position="bottom-center" />
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-br from-cream via-ivory to-paper-beige rounded-sm shadow-vintage p-8">
            <h1 className="serif-title text-3xl text-vintage-faded-navy mb-2 text-center">
              Admin Access
            </h1>
            <p className="elegant-text text-sm text-vintage-blue-gray text-center mb-8">
              This page does not exist
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block elegant-text text-sm text-vintage-faded-navy mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="input-vintage"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block elegant-text text-sm text-vintage-faded-navy mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-vintage"
                  required
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-vintage-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  )
}
