'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Link from 'next/link'

function AnalyticsContent() {
  const [stats, setStats] = useState({
    totalLetters: 0,
    openedLetters: 0,
    openRate: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const { logout } = useAdminAuth()

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/letters')
      if (response.ok) {
        const data = await response.json()
        const letters = data.letters || []
        const opened = letters.filter((l: any) => l.is_opened).length
        const total = letters.length
        const rate = total > 0 ? Math.round((opened / total) * 100) : 0

        setStats({
          totalLetters: total,
          openedLetters: opened,
          openRate: rate,
        })
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
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
            Analytics
          </h1>
        </div>
        <button
          onClick={logout}
          className="btn-vintage px-4 py-2 text-sm"
        >
          Logout
        </button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: 'Total Letters Sent', value: stats.totalLetters },
          { title: 'Letters Opened', value: stats.openedLetters },
          { title: 'Open Rate', value: `${stats.openRate}%` },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-br from-cream via-ivory to-paper-beige rounded-sm shadow-vintage p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <p className="elegant-text text-sm text-vintage-blue-gray mb-3">
              {stat.title}
            </p>
            <p className="serif-title text-5xl text-vintage-faded-navy">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <motion.div
        className="bg-gradient-to-br from-cream via-ivory to-paper-beige rounded-sm shadow-vintage p-8 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2 className="serif-heading text-2xl text-vintage-faded-navy mb-6">
          Performance Overview
        </h2>
        <div className="h-64 flex items-center justify-center bg-vintage-cream rounded">
          <p className="elegant-text text-vintage-blue-gray">
            {isLoading ? 'Loading chart data...' : 'Chart visualization will be displayed here'}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default function AdminAnalytics() {
  return (
    <ProtectedRoute>
      <AnalyticsContent />
    </ProtectedRoute>
  )
}
