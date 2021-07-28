import { StopWatchStateMachineEntries } from "./interfaces";

export const stopWatchMachine = (
  { handleReset, handleStart, handlePause }: StopWatchStateMachineEntries
) => 
  ({
    initial: 'idle',
    states: {
      idle: {
        on: {
          START: 'running',
        },
        effect: handleReset,
      },
      running: {
        on : {
          PAUSE: 'paused',
        },
        effect: handleStart,
      },
      paused: {
        on: {
          RESET: 'idle',
          START: 'running'
        },
        effect: handlePause,
      }
    },
  });

export const formatTime = (time: number) => {
  const dateTimer = new Date(time);

  const minutes = `0${dateTimer.getUTCMinutes()}`;
  const seconds = `0${dateTimer.getUTCSeconds()}`;
  const milliseconds = `0${dateTimer.getUTCMilliseconds()}`;

  return `${minutes.slice(-2)}:${seconds.slice(-2)}:${milliseconds.slice(-3, -1)}`;
}