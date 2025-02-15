"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext.js";
import ProtectedRoute from "../components/ProtectedRoute.js";
import axios from "axios";

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const [workoutType, setWorkoutType] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  // ✅ Fetch Workouts from API
  useEffect(() => {
    if (!token) return;
    axios
      .get("http://localhost:8000/api/workouts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setWorkouts(response.data);
      })
      .catch((error) => console.error("Error fetching workouts:", error));
  }, [token]);

  // ✅ Handle Workout Selection
  const handleSelectWorkout = (workoutId) => {
    setSelectedWorkouts((prev) =>
      prev.includes(workoutId)
        ? prev.filter((id) => id !== workoutId)
        : [...prev, workoutId]
    );
  };

  return (
    <ProtectedRoute>
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Welcome, {user?.username || "Guest"}</h1>

          {/* ✅ Display Available Workouts */}
          <h2>Available Workouts</h2>
          {workouts.length === 0 ? (
            <p>No workouts available.</p>
          ) : (
            <ul>
              {workouts.map((workout) => (
                <li key={workout.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedWorkouts.includes(workout.id)}
                      onChange={() => handleSelectWorkout(workout.id)}
                    />
                    {workout.name} - {workout.description}
                  </label>
                </li>
              ))}
            </ul>
          )}

          <button onClick={logout} className={styles.primary}>
            Logout
          </button>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Home;