'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function ConfirmEmail() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState('Confirming your email...')
  const supabase = createClient()

  useEffect(() => {
    const confirmEmail = async () => {
      const token = searchParams.get('token_hash')

      if (!token) {
        setStatus('Invalid confirmation link.')
        return
      }

      const { error } = await supabase.auth.exchangeCodeForSession(token)

      if (error) {
        setStatus('Email confirmation failed! ' + error.message)
      } else {
        setStatus('Email confirmed! Redirecting...')
        setTimeout(() => {
          router.push('/') // Redirect to home page
        }, 2000)
      }
    }

    confirmEmail()
  }, [router, searchParams])

  return <p>{status}</p>
}
