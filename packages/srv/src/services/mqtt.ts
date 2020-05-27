import { Topic } from "./mqtt.types";
import mqtt from 'mqtt'

export const mqttClient = mqtt.connect(
    process.env.MQTT,
    {
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD
    }
)

export function addToMQTT(topic: Topic, value: string,  postfix = '-series'): void {
    mqttClient.publish(`topic${postfix}`, value)
}