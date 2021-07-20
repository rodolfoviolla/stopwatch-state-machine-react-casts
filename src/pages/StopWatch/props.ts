import { createMachine } from "xstate";

type StopWatchStateMachineEntries = {
  handleReset: () => void;
  handleStart: () => void;
  handlePause: () => void;
}

export const stopWatchMachine = ({ handleReset, handleStart, handlePause }: StopWatchStateMachineEntries) => 
  createMachine({
    initial: 'idle',
    states: {
      idle: {
        on: {
          START: 'running',
        },
        entry: () => handleReset(),
      },
      running: {
        on : {
          PAUSE: 'paused',
        },
        entry: () => handleStart(),
      },
      paused: {
        on: {
          RESET: 'idle',
          START: 'running'
        },
        entry: () => handlePause(),
      },
    },
  });

export const formatTime = (dateTimer: Date) => {
  const minutes = `0${dateTimer.getUTCMinutes()}`;
  const seconds = `0${dateTimer.getUTCSeconds()}`;
  const milliseconds = `0${dateTimer.getUTCMilliseconds()}`;

  return `${minutes.slice(-2)}:${seconds.slice(-2)}:${milliseconds.slice(-3, -1)}`;
}