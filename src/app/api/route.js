import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/client'

export async function GET() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Fetch the workouts of type 'Run' for this user
  const { data: workouts } = await supabase
    .from('workouts')
    .select('*')
    .eq('type', 'Run')
    .eq('user_id', user.id)

  return NextResponse.json({ workouts }, { status: 200 })
}
