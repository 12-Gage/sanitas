import { createClient } from "@/utils/supabase/server";

export default async function WorkoutDetails(context) {
  const { params } = context;
  
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: workout } = await supabase
    .from("workouts")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id) 
    .single();

  return (
    <div>
      <h1>{workout.type}</h1>
      <p><strong>Date:</strong> {workout.created_at}</p>
      <p><strong>Duration:</strong> {workout.duration} </p>
      <p><strong>Notes:</strong> {workout.notes || "No notes"}</p>
    </div>
  );
}
