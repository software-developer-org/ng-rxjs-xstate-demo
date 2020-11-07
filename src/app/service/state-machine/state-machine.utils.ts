import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  interpret,
  Interpreter,
  Machine,

  StateMachine,
  StateSchema
} from 'xstate';
import { StateMachineEvent } from './state-machine.event';
import { StateMachineEvents } from './state-machine.events';
import { StateMachineStates } from './state-machine.states';

@Injectable({
  providedIn: 'root',
})
export class StateMachineUtils {
  public static createStateMachine<T>(): Interpreter<
    any,
    StateSchema<any>,
    StateMachineEvent<Observable<T>>
  > {
    const machine = this.createStateConfig<T>();
    return interpret(machine).start();
  }

  /**
   * State machine configuration
   */
  public static createStateConfig<T>(): StateMachine<
    any,
    StateSchema<any>,
    StateMachineEvent<Observable<T>>
  > {
    const config = Machine<any, StateMachineEvent<Observable<T>>>({
      initial: StateMachineStates.IDLE,
      states: {
        // initial IDLE state listens start event
        [StateMachineStates.IDLE]: {
          on: {
            // transition to end state PROCESSING (NB: move events can listen to each state!)
            [StateMachineEvents.LOAD]: StateMachineStates.PROCESSING,
          },
        },
        [StateMachineStates.PROCESSING]: {
          // invoke: actor model with input and output event
          invoke: {
            src: (_, incomingEvent) => {
              const obs$ = incomingEvent.payload;
              const event$ = obs$.pipe(
                map((data) => {
                  const outputEvent: StateMachineEvent<Observable<T>> = {
                    type: 'LOADED',
                    // pass result to next state
                    payload: of(data),
                  };
                  return outputEvent;
                }),
                catchError((error) => {
                  const outputEvent: StateMachineEvent<Observable<T>> = {
                    type: 'ERROR',
                    // pass error to next state
                    payload: of(error),
                  };
                  return of(outputEvent);
                })
              );
              return event$;
            },
          },
          on: {
            // event coming from invoker
            LOADED: StateMachineStates.IDLE,
            ERROR: StateMachineStates.IDLE,
          },
        },
      },
    });
    return config;
  }

}
