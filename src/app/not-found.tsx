import React from 'react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center">
        <h1 className="serif-title text-6xl md:text-8xl text-vintage-faded-navy mb-4">404</h1>
        <p className="elegant-text text-2xl md:text-3xl text-vintage-dusty-blue mb-6">
          This page could not be found
        </p>
        <p className="elegant-text text-vintage-blue-gray mb-8 max-w-md">
          The letter you're looking for seems to have gotten lost in the mail. Please check the address and try again.
        </p>
        <a
          href="/"
          className="btn-vintage-primary inline-block"
        >
          Return Home
        </a>
      </div>
    </div>
  )
}
