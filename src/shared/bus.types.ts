export enum Topic {
    TEMP1 = 'sensors/temp1',
    TEMP2 = 'sensors/temp2',
    POWER = 'sensors/power',
    PUMPS_SWITCH = 'buttons/pumps',
    PROCESS_SWITCH = 'buttons/process'
}

export const SensorTopics = [Topic.TEMP1, Topic.TEMP2, Topic.POWER, Topic.PROCESS_SWITCH];
export const AllTopics = Object.values(Topic);

// not used yet
export interface TopicMessage {
    topic: Topic,
    payload: string
}

// export type TopicReturnMessage<T extends Topic> = Extract<Extract<TopicMessage, { topic: T }>, 'payload'>;

// // define domain type
// export type TopicTempMessage = TopicGenericMessage<Topic.TEMP1, number>;
// export type TopicPowerMessage = TopicGenericMessage<Topic.POWER,string>;

// export type TopicMessage = TopicTempMessage | TopicPowerMessage;