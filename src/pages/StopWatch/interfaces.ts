import { keyofObject } from "../../hooks/useMachine/interfaces";
import { stopWatchMachine } from "./props";

type StopWatchMachineStatesReturn = ReturnType<typeof stopWatchMachine>['states'];

type PossibleEventsEvent = keyofObject<StopWatchMachineStatesReturn[keyof StopWatchMachineStatesReturn]['on']>;

export type PossibleEvents = { event: PossibleEventsEvent; title: string };

export type StopWatchStateMachineEntries = {
  handleReset: () => void;
  handleStart: () => void;
  handlePause: () => void;
}