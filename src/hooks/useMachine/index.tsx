import { Dispatch, useEffect, useReducer } from "react";
import { keyofObject, MachineConfig } from "./interfaces";

export const useMachine = <Config extends MachineConfig>(config: Config) => {
  type State = keyof Config['states'];
  type Event = keyofObject<Config['states'][State]['on']>;

  type MachineState = {
    current: State;
    nextEvents: Event[];
  }

  const initialState: MachineState = {
    current: config.initial,
    nextEvents: Object.keys(config.states[config.initial].on) as Event[],
  }

  const [machineState, send] = useReducer((state: MachineState, event: Event) => {
    const currentStateNode = config.states[state.current as string];
    const nextState = currentStateNode.on[event];

    if (!nextState) return state;

    return {
      current: nextState,
      nextEvents: Object.keys(config.states[nextState].on) as Event[],
    }
  }, initialState);

  useEffect(() => {
    return config.states[machineState.current as string]?.effect?.();
    // eslint-disable-next-line
  }, [machineState.current]);

  return [machineState, send] as [MachineState, Dispatch<Event>];
}