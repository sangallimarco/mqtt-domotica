export interface Todo {
    "userId": number;
    "id": number;
    "title": string;
    "completed": boolean;
}

export enum MachineState {
    INACTIVE = 'INACTIVE',
    ACTIVE = 'ACTIVE',
    PROCESSING = 'PROCESSING'
}

export enum MachineAction {
    TOGGLE = 'TOGGLE',
    STOP = 'STOP'
}

export interface ToggleEvent {
    type: MachineAction.TOGGLE
}

export interface StopEvent {
    type: MachineAction.STOP
}

export type MachineEvents = ToggleEvent | StopEvent;



export interface MachineContext {
    todos: Todo[];
}

export const InitialContext = {
    todos: []
};


export enum MachineService {
    PROCESSING = 'PROCESSING'
}
