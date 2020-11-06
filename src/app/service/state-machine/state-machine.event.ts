import { EventObject } from 'xstate';

export interface StateMachineEvent<TPayload> extends EventObject {
  payload?: TPayload;
}
