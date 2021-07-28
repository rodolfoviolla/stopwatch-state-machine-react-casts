type MachineStateEvent = {
  [key: string]: string;
};

type MachineStateConfig = {
  on: MachineStateEvent;
  effect: () => void | (() => void);
}

export type MachineConfig = {
  initial: string;
  states: {
    [key: string]: MachineStateConfig;
  }
}

export type keyofObject<Object> = Object extends MachineStateEvent ? keyof Object : never;