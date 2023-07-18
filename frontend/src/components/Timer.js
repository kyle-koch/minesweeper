import React, { useEffect, useState } from 'react';

const Timer = ({ isActive }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  return <div>Time: {time}</div>;
};

export default Timer;