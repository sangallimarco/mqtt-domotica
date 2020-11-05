import { Topic } from '@myhydroponics/core'
import mqtt from 'mqtt'
import dotenv from 'dotenv'

dotenv.config()

function getMQTTOptions() {
  return process.env.MQTT_USERNAME && process.env.MQTT_PASSWORD
    ? {
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD,
      }
    : {}
}

export const mqttClient = mqtt.connect(process.env.MQTT, getMQTTOptions())

export function addToMQTT(
  topic: Topic,
  value: string,
  postfix = '-time-series'
): void {
  mqttClient.publish(`${topic}${postfix}`, value, {qos: 0, retain: true})
}
