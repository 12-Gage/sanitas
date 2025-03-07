'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login') // Redirect to login if not authenticated
      } else {
        setUser(user)
      }
    }

    checkUser()
  }, [router])

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold">Welcome to My Fitness App</h1>
      {user && <p className="mt-2 text-lg">Hello, {user.email}!</p>}
      <button
        onClick={async () => {
          await supabase.auth.signOut()
          router.push('/login') // Redirect to login after logout
        }}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Sign Out
      </button>
    </main>
  )



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
        router.push('/')
      }
    }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold">Sign In</h1>
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
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        disabled={loading}
      >
        {loading ? 'Signing Up...' : 'Sign Up'}
      </button>
    </main>
  )
  }