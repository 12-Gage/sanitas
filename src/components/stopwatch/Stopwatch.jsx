import React, { use, useEffect, useState } from "react";
import "./Stopwatch.css";
import { Button } from "@mui/material";
import StopwatchDisplay from "./StopwatchDisplay";
import { usePathname, useRouter } from "next/navigation";

const Stopwatch = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isRunning, setIsRunning] = useState(false);
  const [value, setValue] = useState(0);
  const [startTime, setStartTime] = useState(null);

  function getLocalDateTimeFormatted(date) {
    const pad = (n, z = 2) => String(n).padStart(z, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
           `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${pad(date.getMilliseconds(), 3)}`;
  }
  

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
              setStartTime(new Date())
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
            if (value === 0) {
              alert("Please start the stopwatch before finishing.");
              return;

            }
            setIsRunning(false);
            const formattedLocalDate = startTime ? getLocalDateTimeFormatted(startTime) : '';
            router.push(`${pathname}/record?time=${value}&date=${formattedLocalDate}`);
          }}
        >
          Finish
        </Button>
      </div>
    </div>
  );
};

export default Stopwatch;
