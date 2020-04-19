export enum Topic {
    CONNECTED = 'CONNECTED',

    TEMP1 = 'sensors/temp1',
    TEMP2 = 'sensors/temp2',
    POWER = 'sensors/power',
    
    PROCESS_STATUS = 'sensors/light',
    PUMPS_STATUS = 'sensors/pumps',

    PUMPS_SWITCH = 'actuators/pumps',
    PROCESS_SWITCH = 'actuators/light',
}

export const SensorTopics = [Topic.TEMP1, Topic.TEMP2, Topic.POWER, Topic.PROCESS_STATUS, Topic.PUMPS_STATUS];
export const AllTopics = Object.values(Topic);

// not used yet
export interface TopicMessage {
    topic: Topic,
    payload: string
}