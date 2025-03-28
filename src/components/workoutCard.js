import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';


export default function WorkoutCard({workout}) {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {workout.type}
            </Typography>
            <Typography variant="body2">
                <strong>Date:</strong> {workout.created_at} <br />
                <strong>Location:</strong> {workout.location} <br />
                <strong>Duration:</strong> {workout.duration} <br />
                <strong>Notes:</strong> {workout.notes || 'No notes'}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }