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
    STOP = 'STOP',
    REMOVE = 'REMOVE'
}

export interface ToggleEvent {
    type: MachineAction.TOGGLE
}

export interface StopEvent {
    type: MachineAction.STOP
}

export interface RemoveEvent {
    type: MachineAction.REMOVE,
    id: number;
}

export type MachineEvents = ToggleEvent | StopEvent | RemoveEvent;


export interface MachineContext {
    todos: Todo[];
}

export const InitialContext = {
    todos: []
};


export enum MachineService {
    PROCESSING = 'PROCESSING'
}
