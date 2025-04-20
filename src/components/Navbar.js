import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function Navbar() {
  const supabase = createClient();
  const router = useRouter();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        onClick={async () => {
            router.push('/new-workout');
        }}
        label="New Workout"
        value="newworkout"
        icon={<AddIcon />}
      />
      <BottomNavigationAction
        label="Profile"
        value="profile"
        icon={<AccountBoxIcon />}
      />
    </BottomNavigation>
  );
}