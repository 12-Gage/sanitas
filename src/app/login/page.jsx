'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function Login() {
  const supabase = createClient()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      router.push('/')
    }
  }

  const handleSignUp = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      alert('Check your email to confirm your account!')
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold">Sign In / Sign Up</h1>
      
      <input
        type="email"
        placeholder="Email"
        className="mt-4 p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      <input
        type="password"
        placeholder="Password"
        className="mt-2 p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <button
        onClick={handleSignIn}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        disabled={loading}
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </button>
      
      <button
        onClick={handleSignUp}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        disabled={loading}
      >
        {loading ? 'Signing Up...' : 'Sign Up'}
      </button>
    </main>
  )
}
