import React from "react";
import {useMachine} from "@xstate/react/lib";
import {FSMListItem} from "./FSMListItem";
import {MachineAction, MachineContext, MachineService, MachineState} from "./FSM.types";
import {testFSMComponentMachine} from "./FSM.statechart";

export interface TestFSMComponentProps {
    label: string;
}

export const FSMContainer: React.FC<TestFSMComponentProps> = (props) => {
    const [state, send] = useMachine(testFSMComponentMachine, {
        services: {
            [MachineService.PROCESSING]: (ctx): Promise<Partial<MachineContext>> => {
                return fetch('https://jsonplaceholder.typicode.com/todos')
                    .then(response => response.json())
            }
        }
    });

    return (
        <div>
            <button onClick={() => send(MachineAction.TOGGLE)}>
                {state.value === MachineState.INACTIVE
                    ? 'Click to activate'
                    : 'Active! Click to deactivate'}
                {state.context.todos.length}
            </button>
            <FSMListItem todos={state.context.todos}/>
        </div>
    );
};
