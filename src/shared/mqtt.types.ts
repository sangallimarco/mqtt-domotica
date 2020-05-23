export enum Topic {
  CONNECTED = 'CONNECTED',

  TEMP1 = 'sensors/temp1',
  TEMP2 = 'sensors/temp2',
  POWER = 'sensors/power',
  OUTDOOR_POWER = 'shellies/shelly1pm-8CAAB5056D9C/relay/0/power',
  OUTDOOR_TEMP = 'shellies/shelly1pm-8CAAB5056D9C/temperature',
  OUTDOOR_ENERGY = 'shellies/shelly1pm-8CAAB5056D9C/relay/0/energy',
  OUTDOOR_PUMPS_STATUS = 'shellies/shelly1pm-8CAAB5056D9C/relay/0',
  OUTDOOR_PUMPS_SWITCH = 'shellies/shelly1pm-8CAAB5056D9C/relay/0/command',

  INDOOR_POWER = 'shellies/shelly1pm-8CAAB505F8A6/relay/0/power',
  INDOOR_TEMP = 'shellies/shelly1pm-8CAAB505F8A6/temperature',
  INDOOR_ENERGY = 'shellies/shelly1pm-8CAAB505F8A6/relay/0/energy',
  INDOOR_LIGHT_STATUS = 'shellies/shelly1pm-8CAAB505F8A6/relay/0',
  INDOOR_LIGHT_SWITCH = 'shellies/shelly1pm-8CAAB505F8A6/relay/0/command',

  PROCESS_STATUS = 'sensors/light',
  PUMPS_STATUS = 'sensors/pumps',

  PUMPS_SWITCH = 'actuators/pumps',
  PROCESS_SWITCH = 'actuators/light',

  CAM = 'sensors/cam',

  WEATHER = 'sensors/weather',
}

// sensors
export const SensorTopics = [
  Topic.TEMP1,
  Topic.TEMP2,
  Topic.POWER,
  Topic.PROCESS_STATUS,
  Topic.PUMPS_STATUS,
  Topic.OUTDOOR_PUMPS_STATUS,
  Topic.OUTDOOR_POWER,
  Topic.OUTDOOR_TEMP,
  Topic.OUTDOOR_ENERGY,
  Topic.INDOOR_POWER,
  Topic.INDOOR_ENERGY,
  Topic.CAM,
  Topic.WEATHER,
]
export const AllTopics = Object.values(Topic)

// not used yet
export interface TopicMessage {
  topic: Topic
  payload: string
}
