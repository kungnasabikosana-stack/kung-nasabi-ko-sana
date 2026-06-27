import { createClient } from '@supabase/supabase-js'
import type { Letter, LetterDraft, AccessLog, AdminUser } from '@/types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase configuration')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Letter Operations
export const getLetterByCode = async (code: string, name: string) => {
  const { data, error } = await supabase
    .from('letters')
    .select('*')
    .eq('letter_code', code.toUpperCase())
    .eq('recipient_name', name)
    .eq('status', 'sent')
    .single()

  if (error) return null
  return data as Letter
}

export const getLetterByName = async (name: string) => {
  const { data, error } = await supabase
    .from('letters')
    .select('*')
    .eq('recipient_name', name)
    .eq('status', 'sent')
    .single()

  if (error) return null
  return data as Letter
}

export const getAllLetters = async (authorId: string) => {
  const { data, error } = await supabase
    .from('letters')
    .select('*')
    .eq('author_id', authorId)
    .order('created_at', { ascending: false })

  if (error) return []
  return data as Letter[]
}

export const createLetter = async (letter: Omit<Letter, 'id' | 'created_at' | 'is_opened'>) => {
  const { data, error } = await supabase
    .from('letters')
    .insert([letter])
    .select()
    .single()

  if (error) throw error
  return data as Letter
}

export const updateLetter = async (id: string, updates: Partial<Letter>) => {
  const { data, error } = await supabase
    .from('letters')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Letter
}

export const deleteLetter = async (id: string) => {
  const { error } = await supabase
    .from('letters')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Access Log Operations
export const logLetterAccess = async (letterId: string) => {
  const { data, error } = await supabase
    .from('access_logs')
    .insert([
      {
        letter_id: letterId,
        accessed_at: new Date().toISOString(),
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data as AccessLog
}

export const getLetterAccessCount = async (letterId: string) => {
  const { count, error } = await supabase
    .from('access_logs')
    .select('*', { count: 'exact', head: true })
    .eq('letter_id', letterId)

  if (error) return 0
  return count || 0
}

// Analytics
export const getAnalytics = async (authorId: string) => {
  const { data: letters, error: lettersError } = await supabase
    .from('letters')
    .select('id, is_opened')
    .eq('author_id', authorId)
    .eq('status', 'sent')

  if (lettersError) return null

  const totalLetters = letters?.length || 0
  const openedLetters = letters?.filter(l => l.is_opened).length || 0
  const openRate = totalLetters > 0 ? (openedLetters / totalLetters) * 100 : 0

  return {
    totalLetters,
    openedLetters,
    openRate: Math.round(openRate),
  }
}
