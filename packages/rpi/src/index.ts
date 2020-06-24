import dotenv from 'dotenv'
import mqtt from 'mqtt'
import { getCommandTopics, processMQTTMessage, getMQTTOptions } from './services/mqtt'
import { initPins } from './services/gpio'

dotenv.config()

async function main() {
  console.log(`Starting Worker <${process.env.MQTT_ID}>: ${process.env.MQTT}`)

  // init gpio
  await initPins()

  // connect to broker
  const mqttClient = mqtt.connect(process.env.MQTT, getMQTTOptions())
  mqttClient.on('connect', () => {
    console.log('Connected')

    // subscribe to all topic
    const topics = getCommandTopics()
    mqttClient.subscribe(topics)

    // process messages
    mqttClient.on('message', async (topic: string, message: Buffer) => {
      const payload = message.toString()
      console.log('Processing Message', topic, payload)
      processMQTTMessage(topic, payload, mqttClient)
    })

    // TODO send status to a regular interval
  })

  mqttClient.on('disconnect', () => {
    console.log('Disconnected')
  })
}

// run process
main()