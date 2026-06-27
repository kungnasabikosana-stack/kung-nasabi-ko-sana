'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface MusicPlayer {
  title: string
  artist?: string
  url: string
  type: 'spotify' | 'youtube' | 'uploaded'
}

interface VinylPlayerProps {
  music?: MusicPlayer
}

export const VinylPlayer: React.FC<VinylPlayerProps> = ({ music }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!music) return

    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play().catch(() => {
        // Auto-play might be blocked
        setIsPlaying(false)
      })
    } else {
      audio.pause()
    }
  }, [isPlaying, music])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  if (!music) return null

  const formattedTime = `${Math.floor(currentTime / 60)}:${String(Math.floor(currentTime % 60)).padStart(2, '0')}`
  const formattedDuration = `${Math.floor(duration / 60)}:${String(Math.floor(duration % 60)).padStart(2, '0')}`

  return (
    <motion.div
      className="relative w-full max-w-md mx-auto mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 1 }}
    >
      {/* Vintage Vinyl Player */}
      <div
        className="relative bg-gradient-to-br from-stone-900 to-stone-800 rounded-lg p-6 shadow-xl"
        style={{
          border: '2px solid #8B7355',
        }}
      >
        {/* Vinyl Record */}
        <div className="flex justify-center mb-6">
          <motion.div
            className="relative w-32 h-32 rounded-full bg-black shadow-lg flex items-center justify-center"
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{
              rotate: {
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
            style={{
              background: 'radial-gradient(circle at 30% 30%, #333, #000)',
            }}
          >
            {/* Vinyl Grooves */}
            <div className="absolute inset-0 rounded-full opacity-20 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-gray-500 opacity-30"
                  style={{
                    width: `${(i + 1) * 12}px`,
                    height: `${(i + 1) * 12}px`,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
            </div>

            {/* Center Label */}
            <div
              className="absolute w-12 h-12 rounded-full bg-vintage-dusty-blue flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle at 40% 40%, #A8D8E8, #8FAEC9)',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
              }}
            >
              <span className="text-xs font-serif text-cream font-bold">KS</span>
            </div>
          </motion.div>
        </div>

        {/* Song Info */}
        <div className="text-center mb-4">
          <h3 className="serif-title text-sm text-cream mb-1">{music.title}</h3>
          {music.artist && <p className="elegant-text text-xs text-vintage-sky-blue">{music.artist}</p>}
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgressChange}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            style={{
              accentColor: '#8FAEC9',
            }}
          />
          <div className="flex justify-between mt-2 text-xs text-gray-400 font-serif">
            <span>{formattedTime}</span>
            <span>{formattedDuration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-4">
          {/* Play/Pause Button */}
          <button
            onClick={handlePlayPause}
            className="w-12 h-12 rounded-full bg-vintage-dusty-blue hover:bg-vintage-faded-navy text-cream flex items-center justify-center transition-colors shadow-lg"
            aria-label="Play/Pause"
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            style={{
              accentColor: '#8FAEC9',
            }}
          />
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={music.type === 'uploaded' ? music.url : undefined}
        crossOrigin="anonymous"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
    </motion.div>
  )
}
