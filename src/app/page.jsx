'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import WorkoutCard from '@/components/WorkoutCard'
import Navbar from '@/components/Navbar' 
import { supabase } from '@/utils/supabaseClient'

export default function Home() {
  const [user, setUser] = useState(null)
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      console.log("Logged-in user ID:", user.id);
      if (!user) {
        router.push('/login') // Redirect to login if not authenticated
      } else {
        setUser(user)
      }
    }
    checkUser()
  }, [router])

  useEffect(() => {
    const fetchWorkouts = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login"); // Redirect if not logged in
        return;
      }

      const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      console.log("Fetched workouts:", data, "Error:", error);

      if (error) {
        console.error("Error fetching workouts:", error);
      } else {
        console.log("Fetched workouts:", data);
        setWorkouts(data); 
      }

      setLoading(false);
    };

    fetchWorkouts();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold">Welcome to Sanitas Analytics</h1>
      {user && <p className="mt-2 text-lg">Hello, {user.email}!</p>}
      <h2 className="text-xl font-bold mt-4">Your Workouts:</h2>
        <div>
        {loading ? (
        <p>Loading...</p>
      ) : workouts.length > 0 ? (
        workouts.map((workout) => <WorkoutCard key={workout.id} workout={workout} />)
      ) : (
        <p>No workouts found.</p>
      )}
        </div>
      <button
        onClick={async () => {
          await supabase.auth.signOut()
          router.push('/login') 
        }}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Sign Out
      </button>
      <Navbar />
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