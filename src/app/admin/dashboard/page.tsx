'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Link from 'next/link'

function DashboardContent() {
  const [stats, setStats] = useState({
    totalLetters: 0,
    openedLetters: 0,
    draftLetters: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const { logout } = useAdminAuth()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/letters')
        if (response.ok) {
          const data = await response.json()
          const letters = data.letters || []
          setStats({
            totalLetters: letters.length,
            openedLetters: letters.filter((l: any) => l.is_opened).length,
            draftLetters: letters.filter((l: any) => l.status === 'draft').length,
          })
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Top Navigation */}
      <motion.div
        className="flex justify-between items-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="serif-title text-4xl text-vintage-faded-navy">
          Admin Dashboard
        </h1>
        <button
          onClick={logout}
          className="btn-vintage px-4 py-2 text-sm"
        >
          Logout
        </button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          { title: 'Total Letters', value: stats.totalLetters },
          { title: 'Opened', value: stats.openedLetters },
          { title: 'Drafts', value: stats.draftLetters },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-br from-cream via-ivory to-paper-beige rounded-sm shadow-vintage p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <p className="elegant-text text-sm text-vintage-blue-gray mb-2">
              {stat.title}
            </p>
            <p className="serif-title text-4xl text-vintage-faded-navy">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Navigation Links */}
      <motion.div
        className="grid md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Link
          href="/admin/letters"
          className="bg-gradient-to-br from-cream via-ivory to-paper-beige rounded-sm shadow-vintage p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="serif-heading text-2xl text-vintage-faded-navy mb-2">
            Manage Letters
          </h2>
          <p className="elegant-text text-vintage-blue-gray">
            Create, edit, and delete letters
          </p>
        </Link>

        <Link
          href="/admin/analytics"
          className="bg-gradient-to-br from-cream via-ivory to-paper-beige rounded-sm shadow-vintage p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="serif-heading text-2xl text-vintage-faded-navy mb-2">
            Analytics
          </h2>
          <p className="elegant-text text-vintage-blue-gray">
            View detailed statistics and insights
          </p>
        </Link>
      </motion.div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
