import dotenv from 'dotenv'
import { getCommandTopics, mqttClient, processMQTTMessage } from './services/mqtt'

dotenv.config()

console.log('Starting Worker', process.env.MQTT)

mqttClient.on('connect', () => {
  console.log('Connected')

  // subscribe to all topic
  const topics = getCommandTopics()
  mqttClient.subscribe(topics)

  mqttClient.on('message', async (topic: string, message: Buffer) => {
    const payload = message.toString()
    processMQTTMessage(topic, payload)
  })
})

mqttClient.on('disconnect', () => {
  console.log('Disconnected')
})
