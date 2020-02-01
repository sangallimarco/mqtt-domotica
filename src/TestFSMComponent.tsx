import React from "react";
import {assign, Machine} from "xstate";
import {useMachine} from "@xstate/react/lib";

interface TestFSMComponentProps {
    label: string;
}

enum MachineState {
    INACTIVE = 'INACTIVE',
    ACTIVE = 'ACTIVE',
    PROCESSING = 'PROCESSING'
}

enum MachineAction {
    TOGGLE = 'TOGGLE',
    STOP = 'STOP'
}

interface ToggleEvent {
    type: MachineAction.TOGGLE
}

interface StopEvent {
    type: MachineAction.STOP
}

type MachineEvents = ToggleEvent | StopEvent;

interface Todo {
    "userId": number;
    "id": number;
    "title": string;
    "completed": boolean;
}

interface MachineContext {
    todos: Todo[];
}

const InitialContext = {
    todos: []
};


enum MachineService {
    PROCESSING = 'PROCESSING'
}

const testFSMComponentMachine = Machine<MachineContext, MachineEvents>({
    initial: MachineState.INACTIVE,
    context: InitialContext,
    states: {
        [MachineState.INACTIVE]: {
            on: {
                [MachineAction.TOGGLE]: MachineState.PROCESSING
            }
        },
        [MachineState.ACTIVE]: {
            on: {
                [MachineAction.TOGGLE]: {
                    target: MachineState.INACTIVE,
                    actions: (ctx) => console.log(ctx)
                }
            }
        },
        [MachineState.PROCESSING]: {
            invoke: {
                src: MachineService.PROCESSING,
                onDone: {
                    target: MachineState.ACTIVE,
                    actions: assign((ctx, e) => ({todos: e.data}))
                }
            }
        }
    }
});

export const TestFSMComponent: React.FC<TestFSMComponentProps> = (props) => {
    const [state, send] = useMachine(testFSMComponentMachine, {
        services: {
            [MachineService.PROCESSING]: (ctx): Promise<Partial<MachineContext>> => {
                return fetch('https://jsonplaceholder.typicode.com/todos')
                    .then(response => response.json())
            }
        }
    });

    return (
        <button onClick={() => send(MachineAction.TOGGLE)}>
            {state.value === MachineState.INACTIVE
                ? 'Click to activate'
                : 'Active! Click to deactivate'}
            {state.context.todos.length}
        </button>
    );
};
