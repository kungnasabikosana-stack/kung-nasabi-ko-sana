export type Letter = {
  id: string
  recipient_name: string
  letter_code: string
  message: string
  music_url?: string
  music_type?: 'spotify' | 'youtube' | 'uploaded'
  status: 'draft' | 'scheduled' | 'sent'
  created_at: string
  sent_at?: string
  opened_at?: string
  is_opened: boolean
  author_id: string
}

export type LetterDraft = {
  id: string
  recipient_name: string
  message: string
  music_url?: string
  music_type?: 'spotify' | 'youtube' | 'uploaded'
  created_at: string
  author_id: string
}

export type AccessLog = {
  id: string
  letter_id: string
  accessed_at: string
  user_ip?: string
  user_agent?: string
}

export type AdminUser = {
  id: string
  email: string
  password_hash: string
  created_at: string
  last_login?: string
}
