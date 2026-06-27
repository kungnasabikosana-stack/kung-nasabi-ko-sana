import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { updateLetter } from '@/lib/supabase'
import { cookies } from 'next/headers'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const id = params.id
    const updates = await request.json()

    const updated = await updateLetter(id, updates)

    return NextResponse.json({ letter: updated }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update letter' },
      { status: 500 }
    )
  }
}
