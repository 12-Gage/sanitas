'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import {
  Avatar,
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper
} from '@mui/material'
import Navbar from '@/components/Navbar'

export default function ProfilePage() {
  const supabase = createClient()
  const [user, setUser] = useState(null)
  const [bio, setBio] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)

        const { data: profile } = await supabase
          .from('profiles')
          .select('bio, firstname, lastname')
          .eq('id', user.id)
          .single()

        setBio(profile?.bio || '')
        setFirstname(profile?.firstname || '')
        setLastname(profile?.lastname || '')
      }
      setLoading(false)
    }

    fetchUser()
  }, [])

  const handleSave = async () => {
    await supabase
      .from('profiles')
      .upsert({ id: user.id, bio, firstname, lastname })
  }

  if (loading) return <p>Loading...</p>
  if (!user) return <p>You must be logged in to view this page.</p>

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pb: 8,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Avatar sx={{ width: 80, height: 80 }}>
              {user.email?.[0]?.toUpperCase()}
            </Avatar>
            <Typography variant="h5">
              {firstname || 'First'} {lastname || 'Last'}
            </Typography>
            <Typography color="textSecondary">{user.email}</Typography>

            <TextField
              label="First Name"
              fullWidth
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <TextField
              label="Last Name"
              fullWidth
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <TextField
              label="Bio"
              multiline
              rows={4}
              fullWidth
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />

            <Button variant="contained" onClick={handleSave}>
              Save Profile
            </Button>
          </Box>
        </Paper>
      </Container>
      <Navbar />
    </Box>
  )
}
