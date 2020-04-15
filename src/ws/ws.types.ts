export enum Topic {
    TEMP1 = 'sensors/temp1',
    TEMP2 = 'sensors/temp2',
    POWER = 'sensors/power'
}


// not used yet
export interface TopicGenericMessage<T extends Topic, P> {
    topic: T,
    payload: P
}

export type TopicReturnMessage<T extends Topic> = Extract<Extract<TopicMessage, { topic: T }>, 'payload'>;

// define domain type
export type TopicTempMessage = TopicGenericMessage<Topic.TEMP1, number>;
export type TopicPowerMessage = TopicGenericMessage<Topic.POWER,string>;

export type TopicMessage = TopicTempMessage | TopicPowerMessage;