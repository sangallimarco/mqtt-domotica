import { mqttClient, addToMQTT } from './services/mqtt'
import { SensorTopics, Topic } from './services/mqtt.types'
import { addToRedis } from './services/redis'
import dotenv from 'dotenv'

dotenv.config()

console.log('Starting Worker', process.env.MQTT)

mqttClient.on('connect', () => {
  console.log('Connected')

  mqttClient.subscribe('presence', function (err) {
    if (!err) {
      mqttClient.publish('presence', 'Hello mqtt')
    }
  })

  // subscribe to all topics
  mqttClient.subscribe(SensorTopics)

  mqttClient.on('message', async (topic: Topic, message: Buffer) => {
    const payload = message.toString()
    const result = await addToRedis(topic, payload)
    addToMQTT(topic, result)
  })
})

mqttClient.on('disconnect', () => {
  console.log('Disconnected')
})
