// this should be shared
export enum Topic {
  CONNECTED = 'CONNECTED',

  // Shelly Terrace
  OUTDOOR_POWER = 'shellies/shelly1pm-8CAAB5056D9C/relay/0/power',
  OUTDOOR_TEMP = 'shellies/shelly1pm-8CAAB5056D9C/temperature',
  OUTDOOR_ENERGY = 'shellies/shelly1pm-8CAAB5056D9C/relay/0/energy',
  OUTDOOR_PUMPS_STATUS = 'shellies/shelly1pm-8CAAB5056D9C/relay/0',
  OUTDOOR_PUMPS_SWITCH = 'shellies/shelly1pm-8CAAB5056D9C/relay/0/command',

  // Shelly Sterilisation Room
  INDOOR_POWER = 'shellies/shelly1pm-8CAAB505F8A6/relay/0/power',
  INDOOR_TEMP = 'shellies/shelly1pm-8CAAB505F8A6/temperature',
  INDOOR_ENERGY = 'shellies/shelly1pm-8CAAB505F8A6/relay/0/energy',
  INDOOR_LIGHT_STATUS = 'shellies/shelly1pm-8CAAB505F8A6/relay/0',
  INDOOR_LIGHT_SWITCH = 'shellies/shelly1pm-8CAAB505F8A6/relay/0/command',

  // Sterilisation process actuators and sensors
  PROCESS_STATUS = 'sensors/light',
  PROCESS_SWITCH = 'actuators/light',

  // RPI actuators and sensors
  TEMP1 = 'sensors/temp1',
  PUMPS_STATUS = 'sensors/pumps',
  PUMPS_SWITCH = 'actuators/pumps',

  // MyStrom Switch actuators and sensors
  LIVINGROOM_SWITCH = 'actuators/livingroom',
  LIVINGROOM_STATUS = 'sensors/livingroom',
  TEMP2 = 'sensors/temp2',
  POWER = 'sensors/power',

  // Cam streams
  CAM = 'sensors/cam',

  // Weather API streams
  WEATHER = 'sensors/weather',
}

// Subscribe to sensors
export const SensorTopics = [
  Topic.TEMP1,
]
