import { useRef, useState } from 'react';
import { useMachine } from '@xstate/react';

import { formatTime, stopWatchMachine } from './props';

export const StopWatch = () => {
  const [time, setTime] = useState(0);
  const intervalID = useRef<NodeJS.Timeout>();
  
  const handleStart = () => {
    intervalID.current = setInterval(() => setTime(t => t + 10), 10);
  } 

  const handlePause = () => {
    clearInterval(intervalID.current as NodeJS.Timeout);
  } 

  const handleReset = () => {
    handlePause();
    setTime(0);
  }
  
  const [machine, send] = useMachine(() => stopWatchMachine({ 
    handleReset, 
    handleStart, 
    handlePause, 
  }));

  return (
    <div>
      <div>{formatTime(new Date(time))}</div>

      <div>
        <button
          disabled={!machine.nextEvents.includes('START')}
          type="button"
          onClick={() => send('START')}
        >
          Start
        </button>
        
        <button
          disabled={!machine.nextEvents.includes('PAUSE')}
          type="button"
          onClick={() => send('PAUSE')}
        >
          Pause
        </button>
        
        <button
          disabled={!machine.nextEvents.includes('RESET')}
          type="button"
          onClick={() => send('RESET')}
        >
          Reset
        </button>
      </div>
    </div>
  );
}