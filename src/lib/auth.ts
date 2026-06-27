import { hash, compare } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const SALT_ROUNDS = 10

export const hashPassword = async (password: string): Promise<string> => {
  return hash(password, SALT_ROUNDS)
}

export const comparePasswords = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return compare(password, hash)
}

export const generateToken = (userId: string, email: string): string => {
  return sign(
    {
      userId,
      email,
    },
    JWT_SECRET,
    {
      expiresIn: '24h',
    }
  )
}

export const verifyToken = (token: string): { userId: string; email: string } | null => {
  try {
    const decoded = verify(token, JWT_SECRET) as {
      userId: string
      email: string
      iat: number
      exp: number
    }
    return {
      userId: decoded.userId,
      email: decoded.email,
    }
  } catch (error) {
    return null
  }
}

export const generateLetterCode = (): string => {
  const prefix = 'KS'
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0')
  return `${prefix}-${year}-${random}`
}
