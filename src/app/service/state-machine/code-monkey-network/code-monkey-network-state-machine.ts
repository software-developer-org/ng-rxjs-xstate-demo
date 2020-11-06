import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  interpret,
  Interpreter,
  Machine,

  State,
  StateMachine,
  StateSchema,
  Typestate
} from 'xstate';
import { BackendService, Entity } from '../../backend.service';
import { LogService } from '../../log.service';
import { StateMachineEvent } from '../state-machine.event';
import { StateMachineEvents } from '../state-machine.events';
import { StateMachineStates } from '../state-machine.states';

type Context = {
  clubs: Entity[];
};

type Payload = {
  next?: (clubs: Entity[]) => void
  error?: (error: any) => void
};

@Injectable({
  providedIn: 'root',
})
export class CodeMonkeyNetworkStateMachine {
  private stateMachine: Interpreter<
    Context,
    StateSchema<Context>,
    StateMachineEvent<Payload>,
    Typestate<Context>
  >;

  constructor(
    private backendService: BackendService,
    private logService: LogService
  ) {
    this.initStateMachine();
  }

  private initStateMachine(): void {
    const machine = this.createStateConfig();
    this.stateMachine = interpret(machine).start();
  }

  /**
   * State machine configuration
   */
  private createStateConfig(): StateMachine<
    Context,
    StateSchema<Context>,
    StateMachineEvent<Payload>
  > {
    const config = Machine<Context, StateMachineEvent<Payload>>({
      context: { clubs: null },
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
            src: (context, incomingEvent) => {
              const result = this.backendService.getClubs().pipe(
                map((clubs) => {
                  if (incomingEvent.payload?.next) {
                    incomingEvent.payload?.next(clubs);
                  }
                  context.clubs = clubs;
                  const outputEvent: StateMachineEvent<Payload> = {
                    type: 'LOADED',
                    payload: incomingEvent.payload,
                  };
                  return outputEvent;
                }),
                catchError((error) => {
                  if (incomingEvent.payload?.error) {
                    incomingEvent.payload?.error(error);
                  }
                  const outputEvent: StateMachineEvent<Payload> = {
                    type: 'LOADED',
                    payload: error,
                  };
                  return of(outputEvent);
                })
              );
              return result;
            }
          },
          on: {
            // event coming from invoker
            LOADED: StateMachineStates.IDLE,
          },
        },
      },
    });
    return config;
  }

  /**
   * Event call initial state transition
   */
  public sendEvent(callback: Payload): State<
    Context,
    StateMachineEvent<Payload>,
    StateSchema<Context>,
    Typestate<Context>
  > {
    const state = this.stateMachine.send({type: StateMachineEvents.LOAD, payload: callback});
    return state;
  }
}
