import React, { use, useEffect, useState } from "react";
import "./Stopwatch.css";
import { Button } from "@mui/material";
import StopwatchDisplay from "./StopwatchDisplay";
import { useRouter } from "next/navigation";

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [value, setValue] = useState(0);
  const router = useRouter();

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setValue((prevState) => prevState + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  return (
    <div className="stopwatch-container">
      <StopwatchDisplay value={value} />
      <div className="button-container">
        {isRunning ? (
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setIsRunning(false);
            }}
          >
            Stop
          </Button>
        ) : (
          <Button
            variant="outlined"
            onClick={() => {
              setIsRunning(true);
            }}
          >
            Start
          </Button>
        )}
        <Button
          variant="outlined"
          onClick={() => {
            setValue(0);
          }}
        >
          Reset
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setIsRunning(false);
            router.push("/new-run-workout/record");
          }}
        >
          Finish
        </Button>
      </div>
    </div>
  );
};

export default Stopwatch;
