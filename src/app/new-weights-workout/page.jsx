'use client'

import Navbar from '@/components/Navbar'
import Stopwatch from '@/components/stopwatch/Stopwatch'

export default function NewWeightsWorkout() {

    return (
        <div>
            <h1>Record New Weights Workout</h1>
            <p>Click the button to start the stopwatch.
                Click finish to record time.
            </p>
            <Stopwatch />
            <Navbar />
        </div>
    )
}

