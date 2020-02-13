import React from "react";
import { useMachine } from "@xstate/react/lib";
import { FsmListComponent } from "./fsm-list.component";
import {
  MachineAction,
  MachineService,
  MachineState,
  InitialContext
} from "./fsm.config";
import { testFSMComponentMachine } from "./fsm.statechart";
import { fetchTodos } from "./fsm.service";
import { Button } from "grommet";
import { Button as CustomButton } from "../components/button.component";

export interface TestFSMComponentProps {
  label: string;
}

export const FsmContainerComponent: React.FC<TestFSMComponentProps> = props => {
  const { label } = props;

  const [state, send] = useMachine(testFSMComponentMachine, {
    context: { ...InitialContext, label },
    services: {
      [MachineService.PROCESSING]: ctx => fetchTodos(ctx)
    }
  });

  function clickItem(id: number) {
    send({ type: MachineAction.REMOVE, id });
  }

  const {
    context: { label: contextLabel, todos }
  } = state;
  return (
    <div>
      <CustomButton onClick={() => send({ type: MachineAction.TOGGLE })}>
        OK
      </CustomButton>
      <Button
        onClick={() => send({ type: MachineAction.TOGGLE })}
        primary
        label={
          state.matches(MachineState.INACTIVE)
            ? "Click to activate"
            : "Active! Click to deactivate"
        }
      />
      <div>
        {contextLabel} {todos.length}
      </div>
      <FsmListComponent todos={todos} clickItem={clickItem} />
    </div>
  );
};
