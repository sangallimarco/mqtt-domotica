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
  TEMP1_SERIES = 'sensors/temp1-time-series',
  PUMPS_STATUS = 'sensors/pumps',
  PUMPS_SWITCH = 'actuators/pumps',

  // MyStrom Switch actuators and sensors
  LIVINGROOM_SWITCH = 'actuators/livingroom',
  LIVINGROOM_STATUS = 'sensors/livingroom',
  TEMP2 = 'sensors/temp2',
  TEMP2_SERIES = 'sensors/temp2-time-series',
  POWER = 'sensors/power',

  // Cam streams
  CAM = 'sensors/cam',

  // Weather API streams
  WEATHER = 'sensors/weather',

  // SEEED Grove
  SEEED_TEMP_STATUS = 'rpis/seeed/temp/status',
  SEEED_TEMP_TIMESERIES = 'rpis/seeed/temp/timeseries',
  SEEED_HUM_STATUS = 'rpis/seeed/humidity/status',
  SEEED_HUM_TIMESERIES = 'rpis/seeed/humidity/timeseries',
  SEEED_AIR_STATUS = 'rpis/seeed/air/status',
  SEEED_AIR_TIMESERIES = 'rpis/seeed/air/timeseries',
  SEEED_LIGHT_STATUS = 'rpis/seeed/light/status',
  SEEED_CAM = 'rpis/seeed/cam',
  SEEED_UV_STATUS = 'rpis/seeed/uv/status',
  SEEED_PUMP_STATUS = 'rpis/seeed/pump/status',
  SEEED_PUMP_SWITCH = 'rpis/seeed/pump/command',
  SEEED_LAMP_STATUS = 'rpis/seeed/lamp/status',
  SEEED_LAMP_SWITCH = 'rpis/seeed/lamp/command',

  // RPIzero2
  ZERO2_AIR_STATUS = 'rpis/zero2/air/status',
  ZERO2_AIR_TIMESERIES = 'rpis/zero2/air/timeseries',
  ZERO2_CONDUCTIVITY_STATUS = 'rpis/zero2/conductivity/status',
  ZERO2_CONDUCTIVITY_TIMESERIES = 'rpis/zero2/conductivity/timeseries',
  ZERO2_PUMP_STATUS = 'rpis/zero2/pump/status',
  ZERO2_PUMP_SWITCH = 'rpis/zero2/pump/command',
  ZERO2_LAMP_STATUS = 'rpis/zero2/lamp/status',
  ZERO2_LAMP_SWITCH = 'rpis/zero2/lamp/command',
  ZERO2_UV_STATUS = 'rpis/zero2/uv/status',
}

// Subscribe to sensors
export const SensorTopics = [
  Topic.TEMP1,
  Topic.TEMP1_SERIES,
  Topic.TEMP2,
  Topic.TEMP2_SERIES,
  Topic.POWER,
  Topic.PROCESS_STATUS,
  Topic.PUMPS_STATUS,

  Topic.OUTDOOR_PUMPS_STATUS,
  Topic.OUTDOOR_POWER,
  Topic.OUTDOOR_TEMP,
  Topic.OUTDOOR_ENERGY,

  Topic.INDOOR_TEMP,
  Topic.INDOOR_POWER,
  Topic.INDOOR_ENERGY,

  Topic.WEATHER,
  Topic.LIVINGROOM_STATUS,

  Topic.SEEED_AIR_STATUS,
  Topic.SEEED_HUM_STATUS,
  Topic.SEEED_PUMP_STATUS,
  Topic.SEEED_TEMP_STATUS,
  Topic.SEEED_UV_STATUS,
  Topic.SEEED_LAMP_STATUS,
  Topic.SEEED_LIGHT_STATUS,
  Topic.SEEED_AIR_TIMESERIES,
  Topic.SEEED_TEMP_TIMESERIES,
  Topic.SEEED_HUM_TIMESERIES,

  Topic.ZERO2_AIR_STATUS,
  Topic.ZERO2_UV_STATUS,
  Topic.ZERO2_CONDUCTIVITY_STATUS,
  Topic.ZERO2_CONDUCTIVITY_TIMESERIES,
  Topic.ZERO2_PUMP_STATUS,
  Topic.ZERO2_LAMP_STATUS,
  Topic.ZERO2_AIR_TIMESERIES,

  Topic.CAM,
  Topic.SEEED_CAM,
]
export const AllTopics = Object.values(Topic)

// JSON stringified data transported by MQTT
export type TimeSeries = [string, string]

export type TopicPayload = Buffer | string
export interface TopicMessage {
  topic: Topic
  payload: TopicPayload
}

export enum MqttState {
  CONNECT,
  DISCONNECT,
  RECONNECT,
  ERROR,
}
