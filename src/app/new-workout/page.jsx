'use client'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function NewWorkout() {
    const router = useRouter()

    return (
        <div>
            <h1>Record New Workout</h1>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => router.push('/new-run-workout')}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Create New Run Workout
                        </Typography>
                        <Typography variant="body2">
                            Click here to create a new run workout.
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => router.push('/new-weights-workout')}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Create New Weights Workout
                        </Typography>
                        <Typography variant="body2">
                            Click here to create a new weights workout.
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Navbar />
        </div>
    )
}

