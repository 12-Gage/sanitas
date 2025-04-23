import { createClient } from "@/utils/supabase/server";
import RunningChart from "@/components/RunningChart";
import { getWeekRange } from '@/components/DateRanges'

export default async function WorkoutDetails(context) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { params } = context;
  const { start, end } = getWeekRange()

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

 
  return (
    <div>
      <h1>{workout.type}</h1>
      <p><strong>{workout.name}</strong></p>
      <p><strong>Date:</strong> {workout.created_at.split('T')[0]}</p>
      <p><strong>Location:</strong> {workout.location}</p>
      <p><strong>Distance:</strong> {workout.miles} miles</p>
      <p><strong>Duration:</strong> {workout.duration} </p>
      <p><strong>Notes:</strong> {workout.notes || "No notes"}</p>

      <h2>Workout Chart</h2>
      <RunningChart data={runs}/>
      
    </div>
  );
}
