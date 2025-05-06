import { createClient } from "@/utils/supabase/server";
import RunningChart from "@/components/RunningChart";
import WeightsChart from "@/components/WeightsChart";
import Navbar from "@/components/Navbar";
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import InputLabel from '@mui/material/InputLabel';


export default async function WorkoutDetails(context) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { params } = context;

  const { data: workout } = await supabase
    .from("workouts")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single();

  const { data: runs } = await supabase
    .from("workouts")
    .select("*")
    .eq("type", "Run")
    .eq("user_id", user.id)

  const { data: weights } = await supabase
    .from("workouts")
    .select("*")
    .eq("type", "Weights")
    .eq("user_id", user.id)

  return (
    <div>
      <h1>{workout.type}</h1>
      <p><strong>{workout.name}</strong></p>
      <p><strong>Date:</strong> {workout.start_time.split("T")[0]} at {workout.start_time.split("T")[1]}</p>
      <p><strong>Location:</strong> {workout.location}</p>
      {workout.type === "Run" ? <p><strong>Distance:</strong> {workout.miles} miles</p> : null}
      <p><strong>Duration:</strong> {workout.duration} </p>
      <p><strong>Notes:</strong> {workout.notes || "No notes"}</p>

      <h2>Workout Chart</h2>
        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={workout.start_time}
          label="View"
          onChange={handleChange}
        >
          <MenuItem value={10}>Week</MenuItem>
          <MenuItem value={20}>Month</MenuItem>
          <MenuItem value={30}>YTD</MenuItem>
        </Select> */}
      {workout.type === "Run" ? <RunningChart data={runs} /> : <WeightsChart data={weights} />}
      <Navbar />
    </div>
  );
}
