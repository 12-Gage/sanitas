import AccountForm from './account-form'
import { supabase } from '@/utils/supabaseClient'

export default async function Account() {

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return <AccountForm user={user} />
}