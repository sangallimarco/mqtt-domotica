export enum Topic {
    TEMP = 'sensors/temp1',
    POWER = 'sensors/power'
}


export interface TopicMessage {
    topic: Topic,
    payload: string
}

// export type MessageReturnType<T, P> = Extract<GenericMessage<T>, { eventType: P }>;

// define domain type
// type WsGeneric<P> = GenericMessage<WsType, P>;
// export type WsTemp = WsGeneric<string>; // type factory!!!
// export type WsPayload = WsTemp; // union type here