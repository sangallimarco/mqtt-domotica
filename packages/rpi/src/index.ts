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
    console.log('Processing Message', topic, payload)
    processMQTTMessage(topic, payload)
  })

  // TODO send status to a regular interval
})

mqttClient.on('disconnect', () => {
  console.log('Disconnected')
})
