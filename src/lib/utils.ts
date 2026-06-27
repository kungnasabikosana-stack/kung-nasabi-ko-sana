import { v4 as uuidv4 } from 'uuid'

export const generateUUID = (): string => {
  return uuidv4()
}

export const generateCode = (): string => {
  const prefix = 'KS'
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, '0')
  return `${prefix}-${year}-${random}`
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateLetterCode = (code: string): boolean => {
  const codeRegex = /^KS-\d{4}-\d{5}$/
  return codeRegex.test(code.toUpperCase())
}

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '')
}

export const formatDate = (date: Date | string): string => {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const formatTime = (date: Date | string): string => {
  const d = new Date(date)
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
