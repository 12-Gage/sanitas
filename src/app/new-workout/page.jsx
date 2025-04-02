'use client'

import { useState } from 'react'
import { supabase } from '@/utils/supabaseClient'
import { useRouter } from 'next/navigation'

export default function NewWorkout() {
    const router = useRouter()
    const [user, setUser] = useState(null)

}

