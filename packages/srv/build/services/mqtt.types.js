'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.SensorTopics = exports.Topic = void 0
// this should be shared
var Topic
;(function (Topic) {
  Topic['CONNECTED'] = 'CONNECTED'
  // Shelly Terrace
  Topic['OUTDOOR_POWER'] = 'shellies/shelly1pm-8CAAB5056D9C/relay/0/power'
  Topic['OUTDOOR_TEMP'] = 'shellies/shelly1pm-8CAAB5056D9C/temperature'
  Topic['OUTDOOR_ENERGY'] = 'shellies/shelly1pm-8CAAB5056D9C/relay/0/energy'
  Topic['OUTDOOR_PUMPS_STATUS'] = 'shellies/shelly1pm-8CAAB5056D9C/relay/0'
  Topic['OUTDOOR_PUMPS_SWITCH'] =
    'shellies/shelly1pm-8CAAB5056D9C/relay/0/command'
  // Shelly Sterilisation Room
  Topic['INDOOR_POWER'] = 'shellies/shelly1pm-8CAAB505F8A6/relay/0/power'
  Topic['INDOOR_TEMP'] = 'shellies/shelly1pm-8CAAB505F8A6/temperature'
  Topic['INDOOR_ENERGY'] = 'shellies/shelly1pm-8CAAB505F8A6/relay/0/energy'
  Topic['INDOOR_LIGHT_STATUS'] = 'shellies/shelly1pm-8CAAB505F8A6/relay/0'
  Topic['INDOOR_LIGHT_SWITCH'] =
    'shellies/shelly1pm-8CAAB505F8A6/relay/0/command'
  // Sterilisation process actuators and sensors
  Topic['PROCESS_STATUS'] = 'sensors/light'
  Topic['PROCESS_SWITCH'] = 'actuators/light'
  // RPI actuators and sensors
  Topic['TEMP1'] = 'sensors/temp1'
  Topic['PUMPS_STATUS'] = 'sensors/pumps'
  Topic['PUMPS_SWITCH'] = 'actuators/pumps'
  // MyStrom Switch actuators and sensors
  Topic['LIVINGROOM_SWITCH'] = 'actuators/livingroom'
  Topic['LIVINGROOM_STATUS'] = 'sensors/livingroom'
  Topic['TEMP2'] = 'sensors/temp2'
  Topic['POWER'] = 'sensors/power'
  // Cam streams
  Topic['CAM'] = 'sensors/cam'
  // Weather API streams
  Topic['WEATHER'] = 'sensors/weather'
})((Topic = exports.Topic || (exports.Topic = {})))
// Subscribe to sensors
exports.SensorTopics = [Topic.TEMP1, Topic.TEMP2]
