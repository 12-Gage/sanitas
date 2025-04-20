// 'use client'
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import CardActionArea from '@mui/material/CardActionArea';
// import { useState } from 'react'
// import { createClient } from '@/utils/supabase/client'
// import { useRouter } from 'next/navigation'

// export default function NewWorkout() {
//     const supabase = createClient()
//     const router = useRouter()
//     const [user, setUser] = useState(null)
// }

// return (
//     <div>
//         <h1>Record New Workout</h1>
//         <Card sx={{ maxWidth: 345 }}>
//             <CardActionArea onClick={() => router.push('/new-run-workout')}>
//                 <CardContent>
//                     <Typography gutterBottom variant="h5" component="div">
//                         Create New Run Workout
//                     </Typography>
//                     <Typography variant="body2">
//                         Click here to create a new workout.
//                     </Typography>
//                 </CardContent>
//             </CardActionArea>
//         </Card>
//         <Card sx={{ maxWidth: 345 }}>
//             <CardActionArea onClick={() => router.push('/new-weights-workout')}>
//                 <CardContent>
//                     <Typography gutterBottom variant="h5" component="div">
//                         Create New Weights Workout
//                     </Typography>
//                     <Typography variant="body2">
//                         Click here to create a new workout.
//                     </Typography>
//                 </CardContent>
//             </CardActionArea>
//         </Card>
//     </div>
// )


