import { useRef, useState } from 'react';
import { useMachine } from '../../hooks/useMachine';
import { POSSIBLE_EVENTS } from './constants';

import { formatTime, stopWatchMachine } from './props';

export const StopWatch = () => {
  const [time, setTime] = useState(0);
  const intervalID = useRef<NodeJS.Timeout>();
  
  const handleStart = () => {
    intervalID.current = setInterval(() => setTime(t => t + 10), 10);
  } 

  const handlePause = () => {
    intervalID?.current && clearInterval(intervalID.current);
  } 

  const handleReset = () => {
    intervalID?.current && clearInterval(intervalID.current);
    setTime(0);
  }
  
  const [machine, send] = useMachine(stopWatchMachine({
    handleReset, 
    handleStart, 
    handlePause, 
  }));

  return (
    <div>
      <div>{formatTime(time)}</div>

      <div>
        {POSSIBLE_EVENTS.map(({ event, title }) => (
          <button
            disabled={!machine.nextEvents.includes(event)}
            type="button"
            onClick={() => send(event)}
            key={event}
          >
            {title}
          </button>
        ))}
      </div>
    </div>
  );
}