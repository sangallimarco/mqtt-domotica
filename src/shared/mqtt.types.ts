export enum Topic {
    CONNECTED = 'CONNECTED',

    TEMP1 = 'sensors/temp1',
    TEMP2 = 'sensors/temp2',
    POWER = 'sensors/power',
    OUTDOOR_POWER = 'shellies/shelly1pm-8CAAB5056D9C/relay/0/power',
    OUTDOOR_TEMP = 'shellies/shelly1pm-8CAAB5056D9C/temperature',
    OUTDOOR_ENERGY = 'shellies/shelly1pm-8CAAB5056D9C/relay/0/energy',

    PROCESS_STATUS = 'sensors/light',
    PUMPS_STATUS = 'sensors/pumps',
    OUTDOOR_PUMPS_STATUS = 'shellies/shelly1pm-8CAAB5056D9C/relay/0',

    PUMPS_SWITCH = 'actuators/pumps',
    PROCESS_SWITCH = 'actuators/light',
    OUTDOOR_PUMPS_SWITCH = 'shellies/shelly1pm-8CAAB5056D9C/relay/0/command'
}

// sensors
export const SensorTopics = [Topic.TEMP1, Topic.TEMP2, Topic.POWER, Topic.PROCESS_STATUS, Topic.PUMPS_STATUS, Topic.OUTDOOR_PUMPS_STATUS, Topic.OUTDOOR_POWER, Topic.OUTDOOR_TEMP, Topic.OUTDOOR_ENERGY];
export const AllTopics = Object.values(Topic);

// not used yet
export interface TopicMessage {
    topic: Topic,
    payload: string
}