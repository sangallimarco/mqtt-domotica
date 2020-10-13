import mqtt from 'mqtt'
import { useEffect, useState } from 'react'
import { Observable, Subject } from 'rxjs'
import { filter } from 'rxjs/operators'
import { booleanToString } from './formatters'
import { getConfigOptions } from './mqtt.config'
import { SensorTopics, Topic, TopicMessage } from './mqtt.types'

export const MessageBusRead = new Subject<TopicMessage>()
const options = getConfigOptions() // get config from localStorage

export const mqttClient = mqtt.connect(process.env.REACT_APP_MQTT, options)

// Events
mqttClient.on('connect', function () {
  mqttClient.subscribe('presence', function (err) {
    if (!err) {
      mqttClient.publish('presence', 'Hello mqtt')
    }
  })
  // subscribe to all topics
  mqttClient.subscribe(SensorTopics)
  MessageBusRead.next({
    topic: Topic.CONNECTED,
    payload: booleanToString(true),
  })
  mqttClient.on('message', (topic: Topic, message: Buffer) => {
    // message is Buffer
    const payload = message
    MessageBusRead.next({ topic, payload })
  })

  mqttClient.on('disconnect', () => {
    MessageBusRead.next({
      topic: Topic.CONNECTED,
      payload: booleanToString(false),
    })
  })
})

// Helpers
export function filterByTopic<T extends Topic>(
  topic: T
): Observable<TopicMessage> {
  return MessageBusRead.pipe(filter((message) => message.topic === topic))
}

export function sendMessage(message: TopicMessage): void {
  const { topic, payload } = message
  mqttClient.publish(topic, payload, { qos: 1 })
}

// Custom Hook
export interface UseMQTTReturnType {
  message: Buffer | string
  sendMessage: (message: TopicMessage) => void
}

export function UseMQTT(topic: Topic): UseMQTTReturnType {
  const [message, setMessage] = useState<Buffer | string>('')

  useEffect(() => {
    const sub = filterByTopic(topic).subscribe(({ payload }) => {
      setMessage(payload)
    })

    return () => {
      sub.unsubscribe()
    }
  }, [topic])

  return { message, sendMessage }
}
