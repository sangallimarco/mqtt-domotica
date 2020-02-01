import {assign, Machine} from "xstate";
import {InitialContext, MachineAction, MachineContext, MachineEvents, MachineService, MachineState} from "./FSM.types";

export const testFSMComponentMachine = Machine<MachineContext, MachineEvents>({
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
