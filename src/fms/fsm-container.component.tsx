import React from "react";
import {useMachine} from "@xstate/react/lib";
import {FsmListComponent} from "./fsm-list.component";
import {MachineAction, MachineService, MachineState} from "./fsm.config";
import {testFSMComponentMachine} from "./fsm.statechart";
import {fetchTodos} from "./fsm.service";
import {Button} from "grommet";
import {Button as CustomButton} from "../components/button.component";

export interface TestFSMComponentProps {
    label: string;
}

export const FsmContainerComponent: React.FC<TestFSMComponentProps> = (props) => {
    const [state, send] = useMachine(testFSMComponentMachine, {
        services: {
            [MachineService.PROCESSING]: (ctx) => fetchTodos(ctx)
        }
    });

    function clickItem(id: number) {
        send({type: MachineAction.REMOVE, id});
    }

    return (
        <div>
            <CustomButton onClick={() => send(MachineAction.TOGGLE)}>OK</CustomButton>
            <Button onClick={() => send(MachineAction.TOGGLE)}
                    primary
                    label={state.value === MachineState.INACTIVE
                        ? 'Click to activate'
                        : 'Active! Click to deactivate'}/>
            <FsmListComponent todos={state.context.todos} clickItem={clickItem}/>
        </div>
    );
};
